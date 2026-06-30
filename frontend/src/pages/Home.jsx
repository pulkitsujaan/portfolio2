import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../components/Icons';
import AnimatedPage from '../components/AnimatedPage';
import Reveal, { StaggerContainer, StaggerItem } from '../components/Reveal';

const Home = () => {
  return (
    <AnimatedPage>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-content">
            <Reveal delay={0.1}>
              <span className="eyebrow">Full-stack developer &middot; CSE student, IIIT Una</span>
            </Reveal>
            <Reveal delay={0.2}>
              <h1>Hi, I'm Pulkit Sujaan.</h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="lede">
                I'm a Computer Science student at IIIT Una, currently deep in data structures
                and algorithms in C++ and building full-stack web applications end to end — from database
                schema to the last pixel of the UI. I've built many <Link to="/projects">projects</Link>
                {' '}with real backends, authentication, and databases behind them, not just static front-ends.
                I haven't published any <Link to="/blog">blogs</Link> yet, but I'm planning to start
                writing soon about what I learn along the way — check back on that page in the coming weeks.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <StaggerContainer className="socials">
                <StaggerItem as="a" className="social-btn" href="https://github.com/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
                  <GithubIcon size={15} /><span>GitHub</span>
                </StaggerItem>
                <StaggerItem as="a" className="social-btn" href="https://linkedin.com/in/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                  <LinkedinIcon size={15} /><span>LinkedIn</span>
                </StaggerItem>
                <StaggerItem as="a" className="social-btn" href="https://x.com/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="X / Twitter">
                  <TwitterIcon size={15} /><span>X / Twitter</span>
                </StaggerItem>
                <StaggerItem as="a" className="social-btn" href="https://instagram.com/pulkitsujaan" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                  <InstagramIcon size={15} /><span>Instagram</span>
                </StaggerItem>
                <StaggerItem as="a" className="social-btn resume-btn" href="https://drive.google.com/file/d/1zHpJMH_JPwWG5JGlupTDkzMJurtOGbUz/view?usp=sharing" target="_blank" rel="noreferrer noopener" aria-label="Resume">
                  <FileText size={15} /><span>Resume</span>
                </StaggerItem>
              </StaggerContainer>
            </Reveal>
          </div>
          <Reveal delay={0.3} direction="right" className="hero-photo-wrap">
            <motion.div
              className="hero-photo"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <img src="/photo.jpeg" alt="Pulkit Sujaan" />
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Toolkit</span>
              <h2>What I build with</h2>
              <p>The stack I reach for most often, across both hobby projects and coursework.</p>
            </div>
          </Reveal>
          <StaggerContainer className="stack-grid">
            {['C++', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Tailwind CSS', 'Python', 'Git & GitHub'].map((tech) => (
              <StaggerItem as="span" className="chip" key={tech}>
                {tech}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Right now</span>
              <h2>Currently</h2>
              <p>A short, honest snapshot of what I'm focused on at the moment.</p>
            </div>
          </Reveal>
          <StaggerContainer as="ul" className="now-list">
            <StaggerItem as="li">
              <span className="now-tag">DSA</span>
              <p><strong>Grinding C++ DSA</strong> — working through medium-to-hard LeetCode problems to get interview-ready.</p>
            </StaggerItem>
            <StaggerItem as="li">
              <span className="now-tag">Building</span>
              <p><strong>Full-stack projects</strong> — strengthening my resume with end-to-end applications, backend architecture included.</p>
            </StaggerItem>
            <StaggerItem as="li">
              <span className="now-tag">Targeting</span>
              <p><strong>Google STEP internship</strong> — that's the goal I'm building everything else around right now.</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <Reveal>
        <section className="cta-band">
          <div className="wrap">
            <span className="eyebrow">Get in touch</span>
            <h2>Let's build something.</h2>
            <p>Open to internships, freelance web development, and interesting collaborations.</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block' }}
              >
                <Link className="btn" to="/contact">
                  Contact me <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block' }}
              >
                <a className="btn ghost" href="https://drive.google.com/file/d/1zHpJMH_JPwWG5JGlupTDkzMJurtOGbUz/view?usp=sharing" target="_blank" rel="noreferrer noopener">
                  <FileText size={18} /> Resume
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>
    </AnimatedPage>
  );
};

export default Home;
