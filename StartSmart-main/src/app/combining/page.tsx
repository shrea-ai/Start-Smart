'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
  const [showBackArrow, setShowBackArrow] = useState(false);
  const router = useRouter();

  // This useEffect handles the automatic redirection after the animation.
  useEffect(() => {
    // The animation for the text is 8 seconds long, so we redirect after that.
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 8000); // Redirect after 8 seconds (matching the typing animation)

    return () => clearTimeout(redirectTimer);
  }, [router]);

  // This useEffect handles the keyboard events for the back arrow.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setShowBackArrow(true);
      } else if (e.key === 'Enter' && showBackArrow) {
        e.preventDefault();
        router.push('/future-skill');
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [showBackArrow, router]);

  return (
    <>
      <div className="container">
        {/* Back Arrow */}
        <div
          className={`backArrow ${showBackArrow ? 'visible' : ''}`}
          onClick={() => router.push('/future-skill')}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="projectSummaryText">
          Combining Your Skills, Interest And Education And Finding Project
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          position: relative;
          background: white;
          overflow: hidden;
        }
        .backArrow {
          position: absolute;
          left: calc((20 / 1280) * 100vw);
          top: calc((20 / 832) * 100vh);
          width: calc((40 / 1280) * 100vw);
          height: calc((40 / 832) * 100vh);
          cursor: pointer;
          color: #333;
          transition: opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .backArrow.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .backArrow:hover {
          color: #555;
        }
        .backArrow svg {
          width: 100%;
          height: 100%;
        }
        .projectSummaryText {
          position: absolute;
          width: 80%;
          max-width: 783px;
          height: auto;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #444343;
          font-size: clamp(36px, 5vw, 64px);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          word-wrap: break-word;
          overflow: hidden;
          border-right: 0.01em solid #444343;
          letter-spacing: 0.05em;
          white-space: nowrap;
          display: inline-block;
          animation:
            typing 8s linear forwards,
            blink-caret 0.75s step-end infinite;
          animation-fill-mode: forwards;
        }
        @keyframes typing {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #444343;
          }
        }
      `}</style>
    </>
  );
}