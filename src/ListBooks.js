import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {

  static propTypes = {
    bookArray: PropTypes.array.isRequired
  }

  render() {

    const { bookArray } = this.props

    let currentlyReadingBooks =  bookArray.filter((book) => book.shelf === "currentlyReading")
    let wantToReadBooks =  bookArray.filter((book) => book.shelf === "wantToRead")
    let readBooks =  bookArray.filter((book) => book.shelf === "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf shelfTitle="Currently Reading" books={currentlyReadingBooks} />
            <Bookshelf shelfTitle="Want to Read" books={wantToReadBooks} />
            <Bookshelf shelfTitle="Read" books={readBooks} />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
