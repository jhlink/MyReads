import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListBooks = (props) => {
  const { bookArray, updateBookInServer } = props;

  let currentlyReadingBooks = bookArray.filter(
    book => book.shelf === "currentlyReading"
  );

  let wantToReadBooks = bookArray.filter(book => book.shelf === "wantToRead");

  let readBooks = bookArray.filter(book => book.shelf === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            shelfTitle="Currently Reading"
            books={currentlyReadingBooks}
            updateBookRequest={updateBookInServer}
          />
          <Bookshelf
            shelfTitle="Want to Read"
            books={wantToReadBooks}
            updateBookRequest={updateBookInServer}
          />
          <Bookshelf
            shelfTitle="Read"
            books={readBooks}
            updateBookRequest={updateBookInServer}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="search-link">
          Add a book
        </Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  bookArray: PropTypes.array.isRequired,
  updateBookInServer: PropTypes.func.isRequired
};

export default ListBooks;
