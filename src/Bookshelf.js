import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const Bookshelf = (props) => {
  const { books, shelfTitle, updateBookRequest } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {shelfTitle}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(b =>
            <li key={b.id}>
              <Book bookData={b} updateBook={updateBookRequest} />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  updateBookRequest: PropTypes.func.isRequired
};

export default Bookshelf;
