import React, { useState, useRef, useEffect } from 'react';
import { useLanyard } from 'react-use-lanyard';
import './App.css';
import zzadImg from '../img/zzad.jpg'; 

function App() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showDiscord, setShowDiscord] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
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
        console.log("Autoplay prevented. Browser requires user interaction first.");
      }
    };
    playAudio();
  }, []);

  const handleMouseMove = (e) => {
    const factor = 25; 
    const rotX = (window.innerHeight / 2 - e.clientY) / factor;
    const rotY = (e.clientX - window.innerWidth / 2) / factor;
    setTilt({ x: Math.max(-10, Math.min(10, rotX)), y: Math.max(-10, Math.min(10, rotY)) });
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
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
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
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>

      <div className="noise-overlay" />

      <div
        className="bio-card-landscape"
        style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="landscape-left">
          <img src={zzadImg} alt="zzad" className="pfp-landscape" />
        </div>

        <div className="landscape-right">
          <h1 className="name-title">zzad</h1>
          <p className="sub-title">Full-Stack Developer</p>

          <div className="links-row">
            <a href="https://github.com/Zzadrst" target="_blank" rel="noreferrer" className="social-icon-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>

            <button onClick={() => setShowDiscord(true)} className="social-icon-link btn-reset">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.666 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01a10.175 10.175 0 0 0 .372.292a.077.077 0 0 1-.006.128a12.133 12.133 0 0 1-1.873.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" /></svg>
            </button>

            <a href="https://www.instagram.com/zzadleplon" target="_blank" rel="noreferrer" className="social-icon-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.646-.069-4.849 0-3.204.012-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
          </div>

          <div className="actions-stack-landscape">
            <button className="primary-btn">LATEST PROJECTS</button>
          </div>
        </div>
      </div>

      {showDiscord && (
        <div className="discord-overlay" onClick={() => setShowDiscord(false)}>
          <div className="discord-card" onClick={e => e.stopPropagation()}>
            <div className="discord-profile-effect" style={{
              background: status?.discord_user?.accent_color ? `radial-gradient(circle at 50% 0%, #${status.discord_user.accent_color.toString(16)}44 0%, transparent 70%)` : ''
            }} />

            <div className="discord-banner" style={{
              backgroundColor: status?.discord_user?.accent_color ? `#${status.discord_user.accent_color.toString(16)}` : '#202225',
              backgroundImage: `url(https://dcdn.dstn.to/banners/${DISCORD_ID})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />

            <div className="discord-pfp-wrapper">
              <div className="avatar-decoration-container">
                <img
                  src={`https://dcdn.dstn.to/avatars/${DISCORD_ID}?size=128`}
                  alt="pfp"
                  className="discord-mini-pfp" />
                <img
                  src={`https://dcdn.dstn.to/avatar-decoration/${DISCORD_ID}`}
                  className="avatar-decoration-overlay"
                  onError={(e) => e.target.style.display = 'none'}
                  alt="" />
              </div>
              <div className="discord-status-dot" style={{ backgroundColor: getStatusColor(status?.discord_status) }} />
            </div>

            <div className="discord-body">
              <div className="discord-badge-container">
                <img src={`https://dcdn.dstn.to/badges/${DISCORD_ID}`} className="real-badges" alt="" />
              </div>
              <div className="discord-info-header">
                <h2 className="discord-name">{status?.discord_user?.global_name || status?.discord_user?.username}</h2>
                <p className="discord-username">{status?.discord_user?.username}</p>
              </div>
              <div className="discord-divider" />
              <div className="discord-scroll-area">
                {status?.activities?.find(a => a.type === 4) && (
                  <div className="custom-status-bubble">
                    <span>{status.activities.find(a => a.type === 4).state}</span>
                  </div>
                )}
                {status?.activities?.filter(a => a.type === 0).map((act, i) => (
                  <div key={i} className="activity-box">
                    <h3>PLAYING A GAME</h3>
                    <div className="activity-content">
                      <div className="act-img-container">
                        <img src={act.assets?.large_image ? `https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.large_image}.png` : `https://dcdn.dstn.to/app-icons/${act.application_id}`} className="act-img" alt="" />
                        {act.assets?.small_image && <img src={`https://cdn.discordapp.com/app-assets/${act.application_id}/${act.assets.small_image}.png`} className="act-img-small" alt="" />}
                      </div>
                      <div className="act-text">
                        <p className="act-name"><strong>{act.name}</strong></p>
                        <p>{act.details}</p>
                        <p>{act.state}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {status?.listening_to_spotify && (
                  <div className="activity-box">
                    <h3>LISTENING TO SPOTIFY</h3>
                    <div className="activity-content">
                      <img src={status.spotify.album_art_url} className="act-img-spotify" alt="" />
                      <div className="act-text">
                        <p className="song-title"><strong>{status.spotify.song}</strong></p>
                        <p>by {status.spotify.artist}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="discord-msg-btn">Send Message</button>
            </div>
          </div>
        </div>
      )}

      <div className="audio-player-bar">
        <div className="audio-left">
          <img src="Cover.png" alt="Cover" className="audio-cover" />
          <div className="audio-info">
            <span className="song-name">LIL SHWTY</span>
            <span className="artist-name">Hev Abi</span>
          </div>
        </div>

        <div className="audio-center">
          <div className="audio-controls">
            <button className="control-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M6 6h2v12H6zm3.5 6L18 18V6z" /></svg>
            </button>

            <button className="play-pause-btn" onClick={togglePlay}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="28"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>

            <button className="control-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </button>
          </div>

          <div className="progress-container">
            <div className="progress-line">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="audio-right-volume">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" color="#b3b3b3">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider" />
        </div>

        <audio ref={audioRef} src="/audio/Hev Abi.mp3" loop />
      </div>
    </div>
  );ss
}

export default App;