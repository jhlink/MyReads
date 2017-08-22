import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {

  static propTypes = {
    bookArray: PropTypes.array.isRequired,
    updateBookInServer: PropTypes.func.isRequired
  }

  state = {
    query: ""
  }

  updateQuery = (inputQuery) => {
    this.setState({ query: inputQuery.trim() })
  }

  render() {

    const { bookArray, updateBookInServer } = this.props
    const { query } = this.state

    let queriedResult = bookArray
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      queriedResult = bookArray.filter((book) => match.test(book.title))
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" onChange={(e) => this.updateQuery(e.target.value)} value={query} placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {queriedResult.map((b) => (
                <li key={b.id}><Book bookData={b} updateBook={updateBookInServer} /></li>
              ))}
            </ol>
          </div>
        </div>
      )
    }
  }

  export default SearchBooks
