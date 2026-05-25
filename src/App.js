import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, ChevronDown, Gamepad2, Star, MapPin, Menu, X } from 'lucide-react';
import './index.css';
import './App.css';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

const SKILLS = [
  { label: 'Unity 3D', icon: '🎮', cat: 'engine' },
  { label: 'C#', icon: '⚙️', cat: 'lang' },
  { label: 'Timeline', icon: '🎬', cat: 'engine' },
  { label: 'Cinemachine', icon: '📷', cat: 'engine' },
  { label: 'Animator', icon: '🏃', cat: 'engine' },
  { label: 'Particle System', icon: '✨', cat: 'engine' },
  { label: 'NavMesh', icon: '🗺️', cat: 'engine' },
  { label: 'Emerald AI', icon: '🤖', cat: 'system' },
  { label: 'AdMob', icon: '💰', cat: 'monetize' },
  { label: 'Android Opt.', icon: '📱', cat: 'mobile' },
  { label: 'HUDs & UI', icon: '🖥️', cat: 'ui' },
  { label: 'RCC Physics', icon: '🚗', cat: 'system' },
  { label: 'Invector', icon: '⚔️', cat: 'system' },
  { label: 'NavMesh AI', icon: '🧠', cat: 'ai' },
];

const EXPERIENCE = [
  {
    company: 'Game Rezort',
    role: 'Unity Game Developer',
    period: 'Aug 2025 – Present',
    desc: 'Developing Android games using Unity and C# with focus on gameplay, AI, and UI. Integrating AdMob ads and optimizing performance for mobile devices.',
    tags: ['Unity', 'C#', 'AdMob', 'Android'],
    link: null,
    current: true,
  },
  {
    company: 'Meta Melon Official',
    role: 'Unity Game Developer',
    period: 'Jul 2024 – Jun 2025',
    desc: 'Developed multiple 3D mobile games from concept to release. Implemented cutscenes, mission systems, and performance optimization.',
    tags: ['Unity 3D', 'Mobile', 'Cutscenes', 'Optimization'],
    link: null,
    current: false,
  },
  {
    company: 'Gaminator',
    role: 'Unity Game Developer',
    period: 'Past Experience',
    desc: 'Built engaging mobile games with rich gameplay mechanics and published to Google Play Store. Focused on immersive game experience and player engagement.',
    tags: ['Unity', 'Google Play', 'Mobile Games', 'C#'],
    link: 'https://play.google.com/store/apps/details?id=com.kz.hunt.toilettime.toiletgame.toiletmonster&pcampaignid=web_share',
    current: false,
  },
];

const PROJECTS = [
  {
    name: 'Escape Parkour: Obby Runner 3D',
    store: 'Google Play',
    storeIcon: '▶',
    color: '#00d4ff',
    desc: 'A dynamic 3D endless runner featuring thrilling parkour-style gameplay. 10 progressive levels, coin system for character unlocks, and AdMob integration.',
    tags: ['3D Runner', 'AdMob', 'Swipe Controls', '10 Levels'],
    emoji: '🏃',
  },
  {
    name: 'FPS Gun Shooting War Games 3D',
    store: 'Google Play',
    storeIcon: '▶',
    color: '#ff6b35',
    desc: 'High-octane FPS with multiple modes: Solo (20 battles) + Bomb Diffuse (20 levels). AI-driven enemies, level progression, and AdMob integration.',
    tags: ['FPS', 'AI Enemies', 'Bomb Mode', 'Mobile'],
    emoji: '🔫',
  },
  {
    name: 'Mother Simulator',
    store: 'Amazon Appstore',
    storeIcon: '📦',
    color: '#00ff9d',
    desc: 'Third-person parenting sim where players complete tasks like feeding, changing, and comforting a baby. Joystick controls, cutscenes via Unity Timeline.',
    tags: ['Simulation', 'Timeline', 'Joystick', '5 Levels'],
    emoji: '👶',
  },
  {
    name: 'Noughty Baby',
    store: 'Amazon Appstore',
    storeIcon: '📦',
    color: '#a78bfa',
    desc: 'Stealth puzzle game — a baby secretly cleans the house while avoiding detection. Animated cutscenes, item collection, strategy + humor gameplay.',
    tags: ['Stealth', 'Puzzle', 'Cutscenes', 'Strategy'],
    emoji: '🕵️',
  },
  {
    name: 'Car Wash',
    store: 'Amazon Appstore',
    storeIcon: '📦',
    color: '#fbbf24',
    desc: 'Cleaning and repainting game with realistic car textures, dust removal, and paint-matching mechanics using Unity\'s particle system for water spray effects.',
    tags: ['Particle System', 'Simulation', 'Interactive', 'Multi-level'],
    emoji: '🚗',
  },
  {
    name: 'Robot Fight',
    store: 'Amazon Appstore',
    storeIcon: '📦',
    color: '#f472b6',
    desc: 'Third-person action game with Invector controller. Custom health system, dynamic HUD, mission-based level progression defeating enemies and reaching bomb sites.',
    tags: ['Invector', 'Action', 'Custom HUD', 'Missions'],
    emoji: '🤖',
  },
  {
    name: 'Jail Prisoner Bus',
    store: 'Prototype',
    storeIcon: '🎮',
    color: '#34d399',
    desc: 'Driving simulation for prisoner transport. RCC vehicle physics, 5 levels with traffic/obstacle challenges, cutscenes for mission briefings.',
    tags: ['RCC Physics', 'Driving Sim', 'Cutscenes', '5 Levels'],
    emoji: '🚌',
  },
  {
    name: 'Dinosaur Hunter',
    store: 'Amazon Appstore',
    storeIcon: '📦',
    color: '#fb923c',
    desc: 'FPS stealth hunting game — hunt dinosaurs without harming other animals. Intelligent dino AI with detection & pursuit, immersive jungle levels.',
    tags: ['FPS', 'Stealth', 'AI Behavior', 'Jungle'],
    emoji: '🦕',
  },
  {
    name: 'Wolf Simulator',
    store: 'Prototype',
    storeIcon: '🎮',
    color: '#60a5fa',
    desc: '3D jungle survival from a wolf\'s perspective. Emerald AI for realistic animal behavior: hunting, wandering, pack dynamics. Stamina, tracking, and health systems.',
    tags: ['Emerald AI', 'Survival', 'Stamina System', 'Open World'],
    emoji: '🐺',
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function GlitchText({ text, className = '' }) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => scroll('hero')}>
          <span className="logo-bracket">[</span>
          <span className="logo-text">KI</span>
          <span className="logo-dot">.</span>
          <span className="logo-sub">dev</span>
          <span className="logo-bracket">]</span>
        </div>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {NAV.map(n => (
            <li key={n}>
              <button onClick={() => scroll(n.toLowerCase())}>
                <span className="nav-num">{'0' + (NAV.indexOf(n) + 1)}_</span>{n}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-hire" onClick={() => scroll('contact')}>
          Hire Me
        </button>
        <button className="nav-menu-btn" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState('');
  const full = 'Unity Game Developer & C# Programmer';

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-bg" />
      <div className="hero-scanlines" />
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${4 + Math.random() * 8}s`,
          }} />
        ))}
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="badge-dot" />
          Available for Work
        </motion.div>

        <motion.div
          className="hero-title-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="hero-greeting">Hello, I'm</div>
          <h1 className="hero-name">
            <GlitchText text="KASHIF" />
            <br />
            <span className="hero-name-last">IRSHAD</span>
          </h1>
          <div className="hero-typewriter">
            <span className="tw-prompt">$ </span>
            <span className="tw-text">{typed}</span>
            <span className="tw-cursor">▋</span>
          </div>
        </motion.div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Crafting immersive Android games with Unity & C# — from AI systems and cutscenes
          to AdMob monetization and mobile performance optimization.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <Gamepad2 size={18} /> View Projects
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <Mail size={18} /> Get In Touch
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {[['9+', 'Games Built'], ['3+', 'Years Exp'], ['2', 'Stores'], ['100%', 'Mobile Focus']].map(([n, l]) => (
            <div key={l} className="stat-item">
              <span className="stat-num">{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="hero-location"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <MapPin size={14} />
          <span>Lahore, Pakistan</span>
        </motion.div>
      </div>

      <div className="hero-scroll-hint">
        <span>SCROLL</span>
        <ChevronDown size={16} className="bounce" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">01_ABOUT</div>
          <h2 className="section-title">The Developer</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-avatar">
              <div className="avatar-ring" />
              <div className="avatar-inner">
                <Gamepad2 size={48} color="var(--accent)" />
              </div>
              <div className="avatar-label">GAME DEV</div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="about-bio">
              I'm <strong>Kashif Irshad</strong> — a Unity Game Developer with hands-on
              experience building 2D and 3D Android games. I specialize in gameplay systems,
              AI behavior, cinematic cutscenes, and mobile performance optimization.
            </p>
            <p className="about-bio">
              From delivering complete games on <strong>Google Play</strong> and <strong>Amazon Appstore</strong>,
              to integrating AdMob monetization and polishing player UX — I bring ideas from
              concept to shipped product.
            </p>

            <div className="about-details">
              <div className="detail-row"><Phone size={14} /><span>+92 309 4532185</span></div>
              <div className="detail-row"><Mail size={14} /><span>kashifirshad473@gmail.com</span></div>
              <div className="detail-row"><MapPin size={14} /><span>Lahore, Pakistan</span></div>
              <div className="detail-row"><Star size={14} /><span>BS Computer Science — COMSATS University (2020–2024)</span></div>
            </div>

            <div className="about-social">
              <a href="https://linkedin.com/in/kashif-irshad" target="_blank" rel="noreferrer" className="social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn
              </a>
              <a href="mailto:kashifirshad473@gmail.com" className="social-btn">
                <Mail size={18} /> Email
              </a>
              <a href="tel:+923094532185" className="social-btn">
                <Phone size={18} /> Call
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">02_SKILLS</div>
          <h2 className="section-title">Tech Stack</h2>
        </motion.div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.label}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
            >
              <span className="skill-icon">{s.icon}</span>
              <span className="skill-label">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills-bars"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { name: 'Unity 3D', pct: 92 },
            { name: 'C# Programming', pct: 88 },
            { name: 'Mobile Optimization', pct: 85 },
            { name: 'AI Systems', pct: 80 },
            { name: 'UI / HUD Design', pct: 82 },
          ].map((b, i) => (
            <div key={b.name} className="bar-row">
              <div className="bar-header">
                <span>{b.name}</span>
                <span className="bar-pct">{b.pct}%</span>
              </div>
              <div className="bar-track">
                <motion.div
                  className="bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section exp-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">03_EXPERIENCE</div>
          <h2 className="section-title">Work History</h2>
        </motion.div>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="timeline-dot">
                {exp.current && <div className="dot-pulse" />}
              </div>
              <div className="timeline-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-role">{exp.role}</div>
                  </div>
                  <div className="exp-period">
                    {exp.current && <span className="live-badge">● LIVE</span>}
                    {exp.period}
                  </div>
                </div>
                <p className="exp-desc">{exp.desc}</p>
                <div className="exp-tags">
                  {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {exp.link && (
                  <a href={exp.link} target="_blank" rel="noreferrer" className="exp-link">
                    <ExternalLink size={14} /> View on Google Play
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">04_PROJECTS</div>
          <h2 className="section-title">Games Shipped</h2>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              className="project-card"
              style={{ '--card-color': p.color }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="project-top">
                <span className="project-emoji">{p.emoji}</span>
                <span className="project-store">
                  {p.storeIcon} {p.store}
                </span>
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">05_CONTACT</div>
          <h2 className="section-title">Let's Build</h2>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="contact-intro">
              Open for freelance projects, full-time roles, and exciting game dev collaborations.
              Let's create something amazing together.
            </p>
            <div className="contact-items">
              <a href="mailto:kashifirshad473@gmail.com" className="contact-item">
                <Mail size={20} />
                <div>
                  <div className="ci-label">Email</div>
                  <div className="ci-val">kashifirshad473@gmail.com</div>
                </div>
              </a>
              <a href="tel:+923094532185" className="contact-item">
                <Phone size={20} />
                <div>
                  <div className="ci-label">Phone</div>
                  <div className="ci-val">+92 309 4532185</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/kashif-irshad" target="_blank" rel="noreferrer" className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                <div>
                  <div className="ci-label">LinkedIn</div>
                  <div className="ci-val">linkedin.com/in/kashif-irshad</div>
                </div>
              </a>
              <div className="contact-item no-link">
                <MapPin size={20} />
                <div>
                  <div className="ci-label">Location</div>
                  <div className="ci-val">Lahore, Pakistan</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-terminal"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-header">
              <div className="t-dot r" /><div className="t-dot y" /><div className="t-dot g" />
              <span>kashif@portfolio:~$</span>
            </div>
            <div className="terminal-body">
              <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">whoami</span></div>
              <div className="t-out">kashif-irshad — unity-game-developer</div>
              <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">cat skills.txt</span></div>
              <div className="t-out">Unity3D | C# | AdMob | NavMesh | AI</div>
              <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">echo $STATUS</span></div>
              <div className="t-out t-green">AVAILABLE_FOR_HIRE=true</div>
              <div className="t-line"><span className="t-prompt">$</span> <span className="t-cursor">▋</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">[KI.dev]</div>
        <div className="footer-copy">
          © 2025 Kashif Irshad — Unity Game Developer — Lahore, Pakistan
        </div>
        <div className="footer-links">
          <a href="https://linkedin.com/in/kashif-irshad" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="mailto:kashifirshad473@gmail.com"><Mail size={18}/></a>
          <a href="tel:+923094532185"><Phone size={18}/></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
