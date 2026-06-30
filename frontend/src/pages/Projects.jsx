import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon } from '../components/Icons';
import AnimatedPage from '../components/AnimatedPage';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
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
              <span className="eyebrow">Work</span>
              <h2>Selected Projects</h2>
              <p>A collection of applications I've built, focusing on full-stack web development and user experience.</p>
            </div>
          </Reveal>

          {loading ? (
            <Reveal>
              <p>Loading projects...</p>
            </Reveal>
          ) : projects.length === 0 ? (
            <Reveal>
              <div className="empty-state">
                <span className="term">projects.length === 0</span>
                <h2>No projects found</h2>
                <p>I haven't added any projects to the database yet. Check back soon!</p>
              </div>
            </Reveal>
          ) : (
            <StaggerContainer className="project-grid">
              {projects.map((project) => (
                <StaggerItem key={project._id}>
                  <motion.div
                    className="project-card"
                    whileHover={{
                      y: -4,
                      borderColor: 'var(--accent)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="project-top">
                      <h3>{project.title}</h3>
                      <span className={`project-status ${project.status !== 'Completed' ? 'muted' : ''}`}>
                        {project.status}
                      </span>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="btn ghost" style={{ padding: '8px 14px', fontSize: '0.75rem' }}>
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="btn ghost" style={{ padding: '8px 14px', fontSize: '0.75rem' }}>
                          <GithubIcon size={14} /> Code
                        </a>
                      )}
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

export default Projects;
