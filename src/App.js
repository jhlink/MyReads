import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import update from 'immutability-helper'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
    * TODO: Instead of using this state variable to keep track of which page
    * we're on, use the URL in the browser's address bar. This will ensure that
    * users can use the browser's back and forward buttons to navigate between
    * pages, as well as provide a good URL they can bookmark and share.
    */
    books: []
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.setState((state) => ({
        /* FLAG: Is this truly the best way to update a state?
        *  There is a mix of solutions from using map to immutability-helper.
        *  What is best practice?
        */
        books: state.books.map((c) => c.id === book.id ? update(c, {shelf: {$set: shelf}}) : c)
      }))
    })
  }

  onSearch = (searchQuery) => {
    BooksAPI.search(searchQuery, 30)
    .then((books) => {
      let sanitizedBooks = books.error ? [] : books
      this.setState({ books: sanitizedBooks })
    })
  }

  onRefresh = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      });
  }

  onClear = () => {
    this.setState({ books: []})
  }

  componentDidMount() {
    this.onRefresh()
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks
              bookArray={books}
              updateBookInServer={this.onUpdate}
            />
          )}/>
          <Route path="/search" render={() => (
            <SearchBooks
              bookArray={books}
              updateBookInServer={this.onUpdate}
              searchQuery={this.onSearch}
              reloadBooks={this.onRefresh}
              clearResults={this.onClear}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
