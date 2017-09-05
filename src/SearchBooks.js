import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import Debounce from 'lodash/debounce'
import update from 'immutability-helper'

class SearchBooks extends Component {

  static propTypes = {
    bookArray: PropTypes.array.isRequired,
    updateBookInServer: PropTypes.func.isRequired,
    searchQuery: PropTypes.func.isRequired,
    reloadBooks: PropTypes.func.isRequired,
  }

  state = {
    query: "",
    clearResult: true
  }

  componentWillUnmount() {
    // This is necessary to notify the root node to make a request for books
    //  in case new books were added to the shelves.
    this.props.reloadBooks()
  }

  componentWillReceiveProps(nextProps) {
    let oldProps = update(this.props.bookArray, {$unset: nextProps.bookArray})
    if (oldProps.length === 0) {
      this.setState({ clearResult: true })
    } else {
      this.setState({ clearResult: false })
    }
  }

  deb =  Debounce((inputQuery) => {
      if (inputQuery.length > 0) {

        console.log("Searching " + inputQuery)
        this.props.searchQuery(inputQuery)
      } else {
        console.log("Clear Results")
        this.setState({ clearResult: true })
      }
    }, 200)

  updateQuery = (inputQuery) => {
    this.setState({ query: inputQuery })
    this.deb(inputQuery.trim())
  }

  render() {

    const { bookArray, updateBookInServer } = this.props
    const { query, clearResult } = this.state

    let queriedResult = clearResult ? [] : bookArray;

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
