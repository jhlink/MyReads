import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class SearchBooks extends Component {
  static propTypes = {
    bookArray: PropTypes.array.isRequired,
    updateBookInServer: PropTypes.func.isRequired,
    searchQuery: PropTypes.func.isRequired,
    reloadBooks: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  componentWillUnmount() {
    // This is necessary to notify the root node to make a request for books
    //  in case new books were added to the shelves.
    this.props.reloadBooks();
  }

  updateQuery = inputQuery => {
    this.setState({ query: inputQuery.trim() });
    if (inputQuery.trim().length > 0) {
      this.props.searchQuery(inputQuery.trim());
    } else {
      this.props.clearResults();
    }
  };

  render() {
    const { bookArray, updateBookInServer } = this.props;
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input
              type="text"
              onChange={e => this.updateQuery(e.target.value)}
              value={query}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {bookArray.map(b =>
              <li key={b.id}>
                <Book bookData={b} updateBook={updateBookInServer} />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
