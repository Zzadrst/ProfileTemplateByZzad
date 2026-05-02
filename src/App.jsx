import React, { useState, useRef, useEffect } from 'react';
import { useLanyard } from 'react-use-lanyard';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import zzadImg from '../img/zzad.jpg'; 

const RocketShip = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5C4.5 16.5 1 18 1 20C1 21 2 22 3 22C5 22 6.5 18.5 6.5 18.5" fill="#f0f0f0" />
    <path d="M19.5 16.5C19.5 16.5 23 18 23 20C23 21 22 22 21 22C19 22 17.5 18.5 17.5 18.5" fill="#f0f0f0" />
    <path
      d="M12 2C12 2 9 6.5 9 11C9 14 10 16.5 10 16.5H14C14 16.5 15 14 15 11C15 6.5 12 2 12 2Z"
      fill="#ffffff" 
      stroke="#111" 
      strokeWidth="0.75"
    />
    <rect x="10" y="16" width="4" height="2" fill="#333" rx="0.5" />
    <circle cx="12" cy="11" r="1.5" fill="#111" />
  </svg>
);

function App() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showDiscord, setShowDiscord] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [progress, setProgress] = useState(0); 
  
  const audioRef = useRef(null);
  const DISCORD_ID = '974564292491886624'; 

  const { status } = useLanyard({
    userId: DISCORD_ID,
    socket: true,
  });

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay prevented.");
      }
    };
    playAudio();
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  const handleMouseMove = (e) => {
    const factor = 25; 
    const rotX = (window.innerHeight / 2 - e.clientY) / factor;
    const rotY = (e.clientX - window.innerWidth / 2) / factor;
    setTilt({ 
      x: Math.max(-10, Math.min(10, rotX)), 
      y: Math.max(-10, Math.min(10, rotY)) 
    });
  };

  const handleLaunchSequence = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setShowProjects(true);
    }, 5000);
  };

  const getStatusColor = (s) => {
    switch (s) {
      case 'online': return '#23a55a';
      case 'idle': return '#f0b232';
      case 'dnd': return '#f23f43';
      default: return '#80848e';
    }
  };

  const togglePlay = () => {
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const val = e.target.value;
    setVolume(val);
    audioRef.current.volume = val;
  };

  return (
    <div className="main-container" onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="stars-container">
        {[...Array(6)].map((_, i) => <div key={i} className="star"></div>)}
      </div>

      <div className="noise-overlay" />

      <AnimatePresence mode="wait">
        {!isLaunching && !showProjects && (
          <motion.div
            key="bio-card"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              scale: 0, 
              rotate: 720, 
              opacity: 0, 
              transition: { duration: 1.2, ease: "backIn" } 
            }}
            className="bio-card-landscape"
            style={{ 
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
            }}
          >
            <div className="landscape-left">
              <img src={zzadImg} alt="zzad" className="pfp-landscape" />
            </div>

            <div className="landscape-right">
              <h1 className="name-title">zzad</h1>
              <p className="sub-title">Full-Stack Developer</p>
              <div className="links-row">
                <a href="https://github.com/Zzadrst" target="_blank" rel="noreferrer" className="social-icon-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <button onClick={() => setShowDiscord(true)} className="social-icon-link btn-reset">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01a10.175 10.175 0 0 0 .372.292a.077.077 0 0 1-.006.128a12.133 12.133 0 0 1-1.873.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" /></svg>
                </button>
                <a href="https://www.instagram.com/zzadleplon" target="_blank" rel="noreferrer" className="social-icon-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058 1.265-.069-1.646-.069-4.849 0-3.204.012-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
              <div className="actions-stack-landscape">
                <button className="primary-btn" onClick={handleLaunchSequence}>LATEST PROJECTS</button>
              </div>
            </div>
          </motion.div>
        )}

        {isLaunching && (
          <motion.div
            key="rocket-stage"
            initial={{ y: 800, opacity: 0 }}
            animate={{ y: [200, -20, 0], opacity: 1, transition: { duration: 1 } }}
            exit={{ y: -1200, opacity: 0, transition: { duration: 1.5, ease: "easeIn" } }}
            className="rocket-wrap"
          >
            <RocketShip className="rocket-body-anim" />
            <div className="rocket-thruster" />
          </motion.div>
        )}

        {showProjects && (
          <motion.div
            key="projects-popup"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="latest-works-modal"
          >
            <div className="modal-header">
              <div className="header-text">
                <h2>Latest Works</h2>
                <p>A collection of my recent digital experiences.</p>
              </div>
              <button className="close-btn" onClick={() => setShowProjects(false)}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="projects-grid">
              {[
                { title: "Project One", cat: "Web Development", desc: "High-performance React application." },
                { title: "Project Two", cat: "UI/UX Design", desc: "Modern interface for SaaS platforms." },
                { title: "Project Three", cat: "System Automation", desc: "Smart billing and customer management." }
              ].map((proj, idx) => (
                <div key={idx} className="project-card">
                  <div className="project-preview-box" />
                  <div className="project-info">
                    <span className="project-category">{proj.cat}</span>
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showDiscord && (
        <div className="discord-overlay" onClick={() => setShowDiscord(false)}>
          <div className="discord-card" onClick={e => e.stopPropagation()}>
            <div className="discord-banner" style={{
              backgroundColor: status?.discord_user?.accent_color ? `#${status.discord_user.accent_color.toString(16)}` : '#202225',
              backgroundImage: `url(https://dcdn.dstn.to/banners/${DISCORD_ID})`
            }} />
            <div className="discord-pfp-wrapper">
              <img src={`https://dcdn.dstn.to/avatars/${DISCORD_ID}?size=128`} alt="pfp" className="discord-mini-pfp" />
              <div className="discord-status-dot" style={{ backgroundColor: getStatusColor(status?.discord_status) }} />
            </div>
            <div className="discord-body">
              <h2 className="discord-name">{status?.discord_user?.global_name || status?.discord_user?.username}</h2>
              <p className="discord-username">{status?.discord_user?.username}</p>
              <div className="discord-divider" />
              <div className="discord-scroll-area">
                {status?.activities?.filter(a => a.type === 0).map((act, i) => (
                  <div key={i} className="activity-box">
                    <h3>PLAYING A GAME</h3>
                    <div className="activity-content">
                      <img src={act.assets?.large_image ? `https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.large_image}.png` : `https://dcdn.dstn.to/app-icons/${act.application_id}`} className="act-img" alt="" />
                      <div className="act-text">
                        <p className="act-name"><strong>{act.name}</strong></p>
                        <p>{act.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="discord-msg-btn">Send Message</button>
            </div>
          </div>
        </div>
      )}

      <div className="audio-player-bar">
        <div className="audio-left">
          <img src="../img/cover.png" alt="Cover" className="audio-cover" />
          <div className="audio-info">
            <span className="song-name">LIL SHWTY</span>
            <span className="artist-name">Hev Abi</span>
          </div>
        </div>
        <div className="audio-center">
          <div className="audio-controls">
            <button className="control-btn"><svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M6 6h2v12H6zm3.5 6L18 18V6z" /></svg></button>
            <button className="play-pause-btn" onClick={togglePlay}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" style={{marginLeft: '3px'}}><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button className="control-btn"><svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg></button>
          </div>
          <div className="progress-container" onClick={handleSeek}>
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="audio-right-volume">
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-slider" />
        </div>
        <audio 
          ref={audioRef} 
          src="../audio/Hev Abi.mp3" 
          loop 
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
}

export default App;