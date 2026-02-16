import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Solutions from './pages/Solutions/Solutions';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SearchResults from './pages/Search/SearchResults';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:id" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
