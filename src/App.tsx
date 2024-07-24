import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import BookDetail from './components/BookDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add custom styles here

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Library System</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<BookSearch />} />
            <Route path="/book" element={<BookDetail />} />
          </Routes>
        </main>
        {/* <footer className="app-footer">
          <p>&copy; 2024 Library System</p>
        </footer> */}
      </div>
    </Router>
  );
};

export default App;