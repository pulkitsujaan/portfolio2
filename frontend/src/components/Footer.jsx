import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="status-bar">
        <div className="wrap">
          <span className="status-path">~/pulkit-sujaan/portfolio</span>
          <div className="status-right">
            <span className="status-dot">open to internships</span>
            <span className="status-time">— local</span>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link className="logo" to="/">Pulkit<span>.</span>Sujaan</Link>
              <p>CSE student at IIIT Una, building full-stack projects and working through DSA one problem at a time.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Site</h4>
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <a href="https://drive.google.com/file/d/1zHpJMH_JPwWG5JGlupTDkzMJurtOGbUz/view?usp=sharing" target="_blank" rel="noreferrer noopener">Resume</a>
              </div>
              <div className="footer-col">
                <h4>Elsewhere</h4>
                <a href="https://github.com/pulkitsujaan" target="_blank" rel="noreferrer noopener">GitHub</a>
                <a href="https://linkedin.com/in/pulkitsujaan" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                <a href="https://x.com/pulkitsujaan" target="_blank" rel="noreferrer noopener">X / Twitter</a>
                <a href="https://instagram.com/pulkitsujaan" target="_blank" rel="noreferrer noopener">Instagram</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <a href="mailto:pulkitsujaan.work@gmail.com">pulkitsujaan.work@gmail.com</a>
                <Link to="/contact">Send a message</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Pulkit Sujaan. Built with MERN Stack.</span>
            <span>Last updated {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
