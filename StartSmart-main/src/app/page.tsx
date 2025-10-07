"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./style.css";

// Scroll effect for header
function useHeaderScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 50) {
        ref.current?.classList.add("scrolled");
      } else {
        ref.current?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [ref]);
}

// Smooth anchor scrolling
function useSmoothScroll() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (el.tagName === "A" && el.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(el.getAttribute("href")!);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

const FEATURES = [
  {
    icon: "🤖",
    title: "Smart AI Matching",
    description:
      "Our advanced AI analyzes your skills, interests, and goals to recommend projects that perfectly match your profile.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    description:
      "Get personalized project recommendations in seconds, not hours of manual searching through databases.",
  },
  {
    icon: "🎯",
    title: "Skill-Based Filtering",
    description:
      "Filter projects by programming languages, frameworks, difficulty level, and time commitment to find your perfect fit.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ProjectFinder helped me find a machine learning project that perfectly matched my Python skills. I learned so much and even got a job offer!",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Computer Science, Stanford",
  },
  {
    quote:
      "I was struggling to find web development projects that weren't too easy or too hard. The AI matching is incredible - found my perfect project in minutes!",
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face",
    name: "Marcus Johnson",
    role: "Software Engineering, MIT",
  },
  {
    quote:
      "The team collaboration feature is amazing. I found teammates with complementary skills and we built something incredible together.",
    img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "Data Science, Berkeley",
  },
];

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
];

// CTA interaction, with text and gradient swap
const CTAButton: React.FC<{
  children: React.ReactNode;
  variant?: string;
  large?: boolean;
}> = ({ children, variant = "", large = false }) => {
  const [buttonText, setButtonText] = useState(children);
  const [bg, setBg] = useState<string>();
  function handleClick(
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) {
    if (
      buttonText === "Start Finding Projects" ||
      buttonText === "Start Your Journey Today"
    ) {
      e.preventDefault();
      window.location.href = "/about-form";
    } else {
      setButtonText("Coming Soon!");
      setBg("linear-gradient(135deg, #6b7280, #4b5563)");
      setTimeout(() => {
        setButtonText("Get Started Free");
        setBg("linear-gradient(135deg, #374151, #1f2937)");
      }, 2000);
    }
  }
  return (
    <button
      className={`cta-button${variant ? " " + variant : ""}${
        large ? " large" : ""
      }`}
      style={bg ? { background: bg } : undefined}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

// Feature card with hover effect preserved
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="feature-card"
      style={{ transform: hovered ? "translateY(-8px)" : "translateY(0)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Page = () => {
  const headerRef = useRef<HTMLHeadElement | null>(null);
  useHeaderScroll(headerRef);
  useSmoothScroll();

  return (
    <div id="app">
      {/* Header */}
      <header ref={headerRef}>
        <nav className="nav-container">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#gradient)" />
              <path
                d="M8 12h16M8 16h16M8 20h12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
              </defs>
            </svg>
            <span>ProjectFinder</span>
          </div>
          <ul className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <CTAButton>Get Started Free</CTAButton>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Find Your Perfect Project with{" "}
                <span className="gradient-text">AI Power</span>
              </h1>
              <p>
                Stop scrolling through endless project lists. Our AI matches you
                with projects that fit your skills, interests, and career goals
                perfectly.
              </p>
              <div className="hero-buttons">
                <Link href="/about-form" className="cta-button primary">
                  Start Finding Projects
                </Link>
                <CTAButton variant="secondary">Watch Demo</CTAButton>
              </div>
              <div className="social-proof">
                <div className="avatars">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face"
                    alt="Student 1"
                  />
                  <img
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face"
                    alt="Student 2"
                  />
                  <img
                    src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face"
                    alt="Student 3"
                  />
                  <img
                    src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face"
                    alt="Student 4"
                  />
                </div>
                <p>Join 2,500+ students who found their dream projects</p>
              </div>
            </div>
            <div className="hero-visual">
              <div className="mockup-container">
                <div className="mockup-screen">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mockup-content">
                    <div className="search-bar">
                      <span className="search-icon">🔍</span>
                      <span className="search-text">
                        AI is finding projects for you...
                      </span>
                    </div>
                    <div className="project-cards">
                      <div className="project-card">
                        <div className="project-tag">Web Development</div>
                        <h4>E-commerce Platform</h4>
                        <p>React • Node.js • MongoDB</p>
                      </div>
                      <div className="project-card">
                        <div className="project-tag">Machine Learning</div>
                        <h4>Sentiment Analysis Tool</h4>
                        <p>Python • TensorFlow • NLP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2>Why Students Love ProjectFinder</h2>
              <p>
                Our AI-powered platform makes project discovery effortless and
                personalized
              </p>
            </div>
            <div className="features-grid">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>Get matched with your ideal projects in two simple steps</p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us About Yourself</h3>
                  <p>
                    Share your skills, interests, and what you want to learn.
                    Our AI creates your unique student profile.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>AI Finds Perfect Matches</h3>
                  <p>
                    Our intelligent algorithm searches thousands of projects and
                    finds the ones that match your goals and skill level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Find Your Perfect Project?</h2>
              <p>
                Join thousands of students who are building amazing projects
                with AI-powered matching
              </p>
              <CTAButton variant="primary" large>
                Start Your Journey Today
              </CTAButton>
              <p className="cta-subtext">
                Completely free for all students • No credit card required
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient2)" />
                  <path
                    d="M8 12h16M8 16h16M8 20h12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>ProjectFinder</span>
              </div>
              <p>
                Empowering students to discover and build amazing projects with
                the power of AI.
              </p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#">API</a>
                </li>
                <li>
                  <a href="#">Integrations</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ProjectFinder. All rights reserved.</p>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
