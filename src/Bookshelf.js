import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    updateBookRequest: PropTypes.func.isRequired
  };

  render() {
    const { books, shelfTitle, updateBookRequest } = this.props;

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
  }
}

export default Bookshelf;
