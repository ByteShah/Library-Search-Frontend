import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Spinner } from 'react-bootstrap';

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

const BookDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (url) {
          const response = await axios.get(`http://localhost:5000/books?download_page_url=${encodeURIComponent(url)}`);
          setBook(response.data);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [url]);

  if (loading) return <div className="loading"><Spinner animation="border" /></div>;
  if (!book) return <div>Book not found</div>;

  return (
    <Container className="book-detail-container">
      <Card>
        <Card.Img variant="top" src={book.cover_image_url || 'default_cover_image_url.jpg'} />
        <Card.Body>
          <Card.Title>{book.clean_title}</Card.Title>
          <Card.Text>Author: {book.author}</Card.Text>
          <Card.Text>Language: {book.language}</Card.Text>
          <Card.Text>Year: {book.year}</Card.Text>
          <Card.Text>Pages: {book.pages}</Card.Text>
          <Card.Text>Size: {book.size}</Card.Text>
          <Card.Text>Publisher: {book.publisher}</Card.Text>
          <Card.Text>
            <a href={book.download_page_url} target="_blank" rel="noopener noreferrer">Download Page</a>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetail;