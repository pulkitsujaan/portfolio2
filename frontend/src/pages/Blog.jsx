import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <section className="section" style={{ minHeight: '80vh' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Writing</span>
              <h2>Blog</h2>
              <p>Thoughts, tutorials, and insights from my journey learning software development.</p>
            </div>
          </Reveal>

          {loading ? (
            <Reveal>
              <p>Loading blogs...</p>
            </Reveal>
          ) : blogs.length === 0 ? (
            <Reveal delay={0.15}>
              <div className="empty-state">
                <span className="term">ls -a ~/blog</span>
                <h2>No posts yet</h2>
                <p>I'm still writing my first technical article. I plan to document my learnings in full-stack development, DSA, and system architecture.</p>
              </div>
            </Reveal>
          ) : (
            <StaggerContainer className="project-grid">
              {blogs.map((blog) => (
                <StaggerItem key={blog._id}>
                  <motion.div
                    className="project-card"
                    whileHover={{
                      y: -4,
                      borderColor: 'var(--accent)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="project-top">
                      <h3>{blog.title}</h3>
                      <span className="project-status muted">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{blog.content.substring(0, 150)}...</p>
                    <div className="project-tags">
                      {blog.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Blog;
