import React from "react";
import PropTypes from "prop-types";

const Book = (props) => {
  const { bookData, updateBook } = props;
  let bookImageURL = bookData.imageLinks ? bookData.imageLinks.thumbnail : "";
  let bookShelfStatus = bookData.shelf ? bookData.shelf : "none";

  return (
    <div className="book">
      <div className="book-top">
        <img className="book-cover" src={bookImageURL} alt={bookData.title} />
        <div className="book-shelf-changer">
          <select
            onChange={e => updateBook(bookData, e.target.value)}
            value={bookShelfStatus}
          >
            <option value="toMove" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        {bookData.title}
      </div>
      <div className="book-authors">
        {bookData.authors}
      </div>
    </div>
  );
};

Book.propTypes = {
  bookData: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired
};
export default Book;
