import React, { useState, useEffect } from 'react';
import { Trash2, Mail, MailOpen, RefreshCw } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'blogs' | 'messages'
  
  // Data
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs]       = useState([]);
  const [messages, setMessages] = useState([]);
  
  // Forms
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tags: '', status: 'Completed', link: '', repo: '' });
  const [blogForm, setBlogForm]       = useState({ title: '', content: '', tags: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res  = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError('Invalid password');
      }
    } catch (err) {
      setLoginError('Error connecting to server');
    }
  };

  const fetchData = async () => {
    const [projRes, blogRes, msgRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/blogs'),
      fetch('/api/contact'),
    ]);
    setProjects(await projRes.json());
    setBlogs(await blogRes.json());
    setMessages(await msgRes.json());
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await fetch(`/api/contact/${id}/read`, { method: 'PATCH' });
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = projectForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...projectForm, tags: tagsArray })
      });
      setProjectForm({ title: '', description: '', tags: '', status: 'Completed', link: '', repo: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = blogForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blogForm, tags: tagsArray })
      });
      setBlogForm({ title: '', content: '', tags: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (!isAuthenticated) {
    return (
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="wrap" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="section-head" style={{ textAlign: 'center' }}>
            <span className="eyebrow">Restricted</span>
            <h2>Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} style={{ background: 'var(--bg-alt)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              {loginError && <div className="err">{loginError}</div>}
            </div>
            <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ minHeight: '80vh' }}>
      <div className="wrap">
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span className="eyebrow">Dashboard</span>
            <h2>Admin Panel</h2>
          </div>
          <button onClick={fetchData} className="btn ghost" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab !== 'projects' ? 'ghost' : ''}`} 
            onClick={() => setActiveTab('projects')}
          >
            Manage Projects
          </button>
          <button 
            className={`btn ${activeTab !== 'blogs' ? 'ghost' : ''}`} 
            onClick={() => setActiveTab('blogs')}
          >
            Manage Blogs
          </button>
          <button 
            className={`btn ${activeTab !== 'messages' ? 'ghost' : ''}`} 
            onClick={() => setActiveTab('messages')}
            style={{ position: 'relative' }}
          >
            Messages
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                background: 'var(--accent)', color: '#fff',
                borderRadius: '50%', width: '20px', height: '20px',
                fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* ---------- PROJECTS TAB ---------- */}
        {activeTab === 'projects' && (
          <div className="contact-grid">
            <div className="formside">
              <h3>Add New Project</h3>
              <form onSubmit={handleProjectSubmit}>
                <div className="field">
                  <label>Title</label>
                  <input type="text" required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                </div>
                <div className="field">
                  <label>Description</label>
                  <textarea required value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} style={{minHeight: '80px'}}></textarea>
                </div>
                <div className="field">
                  <label>Status</label>
                  <input type="text" value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})} placeholder="Completed, WIP, etc." />
                </div>
                <div className="field">
                  <label>Tags (comma separated)</label>
                  <input type="text" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} placeholder="React, Node, etc." />
                </div>
                <div className="field">
                  <label>Live Link</label>
                  <input type="text" value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} />
                </div>
                <div className="field">
                  <label>Repo Link</label>
                  <input type="text" value={projectForm.repo} onChange={e => setProjectForm({...projectForm, repo: e.target.value})} />
                </div>
                <button type="submit" className="btn">Add Project</button>
              </form>
            </div>
            <div>
              <h3>Existing Projects</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                {projects.map(p => (
                  <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                    <div>
                      <strong>{p.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{p.status}</div>
                    </div>
                    <button onClick={() => handleDelete('projects', p._id)} style={{ background: 'transparent', border: 'none', color: '#B5573F', cursor: 'pointer', padding: '5px' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {projects.length === 0 && <p>No projects found.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ---------- BLOGS TAB ---------- */}
        {activeTab === 'blogs' && (
          <div className="contact-grid">
            <div className="formside">
              <h3>Add New Blog</h3>
              <form onSubmit={handleBlogSubmit}>
                <div className="field">
                  <label>Title</label>
                  <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                </div>
                <div className="field">
                  <label>Content (Markdown/Text)</label>
                  <textarea required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} style={{minHeight: '200px'}}></textarea>
                </div>
                <div className="field">
                  <label>Tags (comma separated)</label>
                  <input type="text" value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags: e.target.value})} placeholder="Tech, Life, etc." />
                </div>
                <button type="submit" className="btn">Add Blog</button>
              </form>
            </div>
            <div>
              <h3>Existing Blogs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                {blogs.map(b => (
                  <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                    <div>
                      <strong>{b.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{new Date(b.createdAt).toLocaleDateString()}</div>
                    </div>
                    <button onClick={() => handleDelete('blogs', b._id)} style={{ background: 'transparent', border: 'none', color: '#B5573F', cursor: 'pointer', padding: '5px' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {blogs.length === 0 && <p>No blogs found.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ---------- MESSAGES TAB ---------- */}
        {activeTab === 'messages' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>
              Inbox
              {unreadCount > 0 && (
                <span style={{ marginLeft: '10px', fontSize: '0.8rem', background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: '20px' }}>
                  {unreadCount} unread
                </span>
              )}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map(m => (
                <div 
                  key={m._id}
                  style={{
                    padding: '20px',
                    background: 'var(--bg-alt)',
                    border: `1px solid ${m.read ? 'var(--border)' : 'var(--accent)'}`,
                    borderRadius: 'var(--radius)',
                    opacity: m.read ? 0.75 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {m.read
                          ? <MailOpen size={15} style={{ color: 'var(--ink-soft)' }} />
                          : <Mail size={15} style={{ color: 'var(--accent)' }} />
                        }
                        <strong style={{ fontSize: '1rem' }}>{m.name}</strong>
                        <a href={`mailto:${m.email}`} style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{m.email}</a>
                      </div>
                      <p style={{ margin: '10px 0 8px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{m.message}</p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                        {new Date(m.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                      {!m.read && (
                        <button
                          onClick={() => handleMarkRead(m._id)}
                          className="btn ghost"
                          style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                          title="Mark as read"
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete('contact', m._id)}
                        style={{ background: 'transparent', border: 'none', color: '#B5573F', cursor: 'pointer', padding: '5px', display: 'flex', justifyContent: 'center' }}
                        title="Delete message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--ink-soft)' }}>
                  <Mail size={32} style={{ marginBottom: '12px', opacity: 0.4 }} />
                  <p>No messages yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Admin;
