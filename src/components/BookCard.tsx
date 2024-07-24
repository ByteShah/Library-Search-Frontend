import React from 'react';

interface Book {
  author: string;
  clean_title: string;
  cover_image_url: string | null;
  download_page_url: string;
  language: string;
  pages: string;
  publisher: string;
  size: string;
  title: string;
  year: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'default_cover_image_url.jpg'; // Fallback image URL
  };

  return (
    <div className="book-card">
      {/* {book.cover_image_url ? (
        <img 
          className="book-card-img" 
          src={book.cover_image_url} 
          alt={book.title} 
          onError={handleImageError} 
        />
      ) : (
        <div className="book-card-img-placeholder">Image not available</div>
      )} */}
      <div className="book-card-body">
        <h5 className="book-card-title">{book.clean_title}</h5>
        <p className="book-card-text">Author: {book.author}</p>
        <p className="book-card-text">Publisher: {book.publisher}</p>
        <p className="book-card-text">Year: {book.year}</p>
        <a href={book.download_page_url} className="btn btn-primary">Download</a>
      </div>
    </div>
  );
};

export default BookCard;