import React, { Component } from 'react'
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
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState((state) => ({
          /* FLAG: Is this truly the best way to update a state?
          *  There is a mix of solutions from using map to immutability-helper.
          *  What is a good rule of thumb here?
          */
          books: state.books.map((c) => c.id === book.id ? update(c, {shelf: {$set: shelf}}) : c)
      }))
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ?
          <SearchBooks />
          :
          <ListBooks bookArray={books} updateBookInServer={this.onUpdate} />
        }
      </div>
    )
  }
}

export default BooksApp
