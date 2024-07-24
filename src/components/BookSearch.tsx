import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import apiConfig from '../config/apiConfig';
import BookCard from './BookCard';

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

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiConfig.baseUrl}${apiConfig.searchBooks}`, { query });
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSearch} className="search-form">
        <Form.Group controlId="search">
          <Form.Label>Search for Books</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search for books..."
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
        </Button>
      </Form>
      <Row>
        {books.map((book, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="book-card-col">
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookSearch;