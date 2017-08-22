import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    bookData: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {

    const { bookData, updateBook } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookData.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => updateBook(bookData, e.target.value)} value={bookData.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookData.title}</div>
        <div className="book-authors">{bookData.authors}</div>
      </div>
    )
  }
}

export default Book
