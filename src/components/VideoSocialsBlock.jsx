import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLatestYoutubeVideoId } from '../lib/latestYoutubeVideo';
import './VideoSocialsBlock.css';

export default function VideoSocialsBlock({ videoId, instagramLinks = [], className = '' }) {
  const { t } = useLanguage();
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // undefined opts into the build-time latest video; an explicit null or empty
  // string keeps the placeholder, and any explicit non-empty id still wins.
  const resolvedVideoId =
    videoId === undefined ? getLatestYoutubeVideoId() : videoId;

  const showVideo = resolvedVideoId && resolvedVideoId.trim() !== '';

  const gridItems = (instagramLinks || []).filter(Boolean);

  return (
    <div
      ref={ref}
      className={`vsb-root ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}
    >
      <style>{`
        .vsb-root {
          background: var(--black);
        }
        .vsb-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem);
        }
        .vsb-section-youtube {
          border-bottom: 1px solid rgba(233,30,99,0.12);
        }
        .vsb-ig-grid {
          display: flex;
          flex-direction: row;
          gap: clamp(0.5rem, 1.5vw, 1rem);
        }
        .vsb-ig-grid > * {
          flex: 1;
          min-width: 0;
        }
        .vsb-placeholder-play {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(233,30,99,0.15);
          border: 2px solid var(--magenta);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
      `}</style>

      {/* ── YouTube Section ── */}
      <div className="vsb-section vsb-section-youtube">
        <h2 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--white)',
          lineHeight: 1.15,
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          {t('socials.youtube_title').split('\n').map((line, li) => (
            <span key={li} style={{ display: 'block', color: li === 1 ? 'var(--magenta)' : undefined }}>{line}</span>
          ))}
        </h2>

        {showVideo ? (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(233,30,99,0.25)',
            boxShadow: '0 0 30px rgba(233,30,99,0.1)',
          }}>
            <iframe
              src={`https://www.youtube.com/embed/${resolvedVideoId}?rel=0`}
              title={t('socials.youtube_title')}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px dashed rgba(233,30,99,0.4)',
            background: 'var(--black-soft)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            <div className="vsb-placeholder-play">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--magenta)">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '1rem',
              color: 'var(--white-dim)',
            }}>
              {t('socials.video_placeholder')}
            </span>
          </div>
        )}

        {showVideo && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: 'clamp(0.8rem, 1.5vw, 1.2rem)',
            maxWidth: '800px',
          }}>
            <a
              href="https://www.youtube.com/@alanamp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Anton, sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: 'var(--magenta-bright)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
            >
              {t('socials.ver_youtube')}
            </a>
          </div>
        )}
      </div>

      {/* ── Instagram Section ── */}
      <div className="vsb-section vsb-section-instagram">
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              color: 'var(--magenta-bright)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              {t('socials.instagram_title')}
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--white)',
              lineHeight: 1.15,
              margin: 0,
            }}>
              <span style={{ color: 'var(--magenta)' }}>@ALAN_AMP</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/alan_amp/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.7rem 1.5rem',
              background: 'var(--magenta)',
              color: 'var(--white)',
              fontFamily: 'Anton, sans-serif',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transform: 'skewX(-8deg)',
              transition: 'background 0.2s',
              WebkitFontSmoothing: 'antialiased',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>{t('socials.seguir_ig')}</span>
          </a>
        </div>

        <div className="vsb-ig-grid">
          {gridItems.map((item, i) => (
            <div key={i}>
              {item ? (
                <a
                  href={item.url || item.post}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    position: 'relative',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, transform 0.2s',
                    cursor: 'pointer',
                    background: 'var(--black-card)',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--magenta)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img
                      src={item.img}
                      alt={item.label}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0.6rem',
                      right: '0.6rem',
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{
                    padding: '0.7rem 0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                  }}>
                    <div style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: '0.8rem',
                      color: 'var(--white)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.2,
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: 'var(--white-dim)',
                      letterSpacing: '0.1em',
                    }}>
                      @alan_amp
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  data-placeholder="true"
                  style={{
                    display: 'block',
                    aspectRatio: '4/5',
                    borderRadius: '6px',
                    border: '1px dashed rgba(233,30,99,0.3)',
                    background: 'var(--black-soft)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
