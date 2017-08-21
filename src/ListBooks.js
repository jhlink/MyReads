import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf shelfTitle="Currently Reading" />
            <Bookshelf shelfTitle="Want to Read" />
            <Bookshelf shelfTitle="Read" />
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
