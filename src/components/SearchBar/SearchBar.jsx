import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ expanded = false, onClose }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [suggestions] = useState([
    '云计算平台',
    '大数据分析',
    '人工智能解决方案',
    '数字化转型',
    '智能制造',
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  /* Keyboard shortcut: Ctrl/Cmd + K */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsExpanded(true);
      }
      if (e.key === 'Escape') {
        setIsExpanded(false);
        setShowSuggestions(false);
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsExpanded(false);
      setShowSuggestions(false);
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?keyword=${encodeURIComponent(suggestion)}`);
    setQuery('');
    setIsExpanded(false);
    setShowSuggestions(false);
    if (onClose) onClose();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`search-bar ${isExpanded ? 'search-bar--expanded' : ''}`}>
      {!isExpanded ? (
        <button
          className="search-bar__trigger"
          onClick={toggleExpand}
          aria-label="打开搜索"
        >
          <FiSearch />
          <span className="search-bar__shortcut">⌘K</span>
        </button>
      ) : (
        <form className="search-bar__form" onSubmit={handleSubmit}>
          <FiSearch className="search-bar__icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-bar__input"
            placeholder="搜索产品、解决方案..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            aria-label="搜索"
          />
          <button
            type="button"
            className="search-bar__close"
            onClick={() => {
              setIsExpanded(false);
              setShowSuggestions(false);
              if (onClose) onClose();
            }}
            aria-label="关闭搜索"
          >
            <FiX />
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="search-bar__suggestions" role="listbox">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="search-bar__suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                  role="option"
                  aria-selected={false}
                >
                  <FiSearch className="search-bar__suggestion-icon" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchBar;
