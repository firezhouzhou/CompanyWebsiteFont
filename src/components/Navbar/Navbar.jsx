import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { isAuthenticated, getUser, clearAuth } from '../../utils/auth';
import './Navbar.css';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/products', label: '产品与服务' },
  { to: '/solutions', label: '解决方案' },
  { to: '/about', label: '关于我们' },
  { to: '/contact', label: '联系我们' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setUser(getUser());
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    setLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      role="banner"
    >
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="返回首页">
          <div className="navbar__logo-icon">E</div>
          <span className="navbar__logo-text">企业集团</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" role="navigation" aria-label="主导航">
          <ul className="navbar__nav-list">
            {navLinks.map((link) => (
              <li key={link.to} className="navbar__nav-item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__nav-link ${isActive ? 'navbar__nav-link--active' : ''}`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          {/* Search */}
          <button
            className="navbar__action-btn"
            onClick={toggleSearch}
            aria-label="搜索"
          >
            <FiSearch />
          </button>

          {/* Auth */}
          {loggedIn ? (
            <div className="navbar__user">
              <span className="navbar__user-name">
                <FiUser /> {user?.nickname || '用户'}
              </span>
              <button
                className="navbar__action-btn navbar__logout-btn"
                onClick={handleLogout}
                aria-label="退出登录"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="navbar__auth-link">
                登录
              </Link>
              <Link to="/register" className="btn btn--primary navbar__auth-btn">
                注册
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="navbar__search-overlay">
          <form className="navbar__search-form container" onSubmit={handleSearch}>
            <FiSearch className="navbar__search-icon" />
            <input
              type="text"
              className="navbar__search-input"
              placeholder="搜索产品、解决方案、新闻..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              aria-label="搜索"
            />
            <button
              type="button"
              className="navbar__search-close"
              onClick={() => setIsSearchOpen(false)}
              aria-label="关闭搜索"
            >
              <FiX />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
      >
        <nav aria-label="移动端导航">
          <ul className="navbar__mobile-list">
            {navLinks.map((link) => (
              <li key={link.to} className="navbar__mobile-item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                  }
                  end={link.to === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {!loggedIn && (
            <div className="navbar__mobile-auth">
              <Link
                to="/login"
                className="btn btn--outline navbar__mobile-auth-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                登录
              </Link>
              <Link
                to="/register"
                className="btn btn--primary navbar__mobile-auth-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                注册
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
