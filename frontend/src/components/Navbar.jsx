import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Menu, FileText } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="logo" to="/">Pulkit<span>.</span>Sujaan</Link>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="main-nav">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
          <NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <a href="https://drive.google.com/file/d/1zHpJMH_JPwWG5JGlupTDkzMJurtOGbUz/view?usp=sharing" target="_blank" rel="noreferrer noopener" className="nav-resume" onClick={() => setMenuOpen(false)}><FileText size={14} /> Resume</a>
        </nav>
        <div className="nav-right">
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={toggleMenu}>
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
