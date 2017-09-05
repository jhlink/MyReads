import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import update from "immutability-helper";
import "./App.css";

class BooksApp extends Component {
  state = {
    bookSearchResult: [],
    booksInShelf: []
  };

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        booksInShelf: state.booksInShelf.map(
          c => (c.id === book.id ? update(c, { shelf: { $set: shelf } }) : c)
        )
      }));
    });
  };

  onSearch = searchQuery => {
    BooksAPI.search(searchQuery, 30).then(books => {
      let sanitizedBooks = books.error ? [] : books;

      this.setState({
        bookSearchResult: sanitizedBooks.map(book => {
          let targetBook = this.state.booksInShelf.find(
            (bookParam) => book.id === bookParam.id
          );
          return targetBook ? update(book, { $merge: targetBook }) : book;
        })
      });
    });
  };

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ booksInShelf: books });
    });
  }

  onRefresh = () => {
    this.getAllBooks();
  };

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    const { bookSearchResult, booksInShelf } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              bookArray={booksInShelf}
              updateBookInServer={this.onUpdate}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              bookArray={bookSearchResult}
              updateBookInServer={this.onUpdate}
              searchQuery={this.onSearch}
              reloadBooks={this.onRefresh}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
