import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/Icons';
import AnimatedPage from '../components/AnimatedPage';
import Reveal from '../components/Reveal';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <AnimatedPage>
      <section className="section" style={{ minHeight: '70vh' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Contact</span>
              <h2>Get in touch</h2>
              <p>Have a question or want to work together? Leave a message.</p>
            </div>
          </Reveal>

          <div className="contact-grid">
            <Reveal delay={0.1} direction="up" className="formside">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="btn"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      className="form-success"
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      style={{ overflow: 'hidden', marginTop: '18px' }}
                    >
                      Thanks for reaching out! I'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      className="err"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ marginTop: '10px' }}
                    >
                      Something went wrong. Please try again or email directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>

            <Reveal delay={0.25} direction="up" className="contact-side">
              <h3>Direct Contact</h3>
              <p>You can also reach me directly at <a href="mailto:hello@pulkitsujaan.dev" style={{ color: 'var(--accent)' }}>hello@pulkitsujaan.dev</a></p>
              <h3>Connect</h3>
              <div className="socials">
                <motion.a className="social-btn" href="https://github.com/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="GitHub" whileHover={{ y: -2 }}>
                  <GithubIcon size={15} /><span>GitHub</span>
                </motion.a>
                <motion.a className="social-btn" href="https://linkedin.com/in/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" whileHover={{ y: -2 }}>
                  <LinkedinIcon size={15} /><span>LinkedIn</span>
                </motion.a>
                <motion.a className="social-btn" href="https://x.com/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="X / Twitter" whileHover={{ y: -2 }}>
                  <TwitterIcon size={15} /><span>Twitter</span>
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Contact;
