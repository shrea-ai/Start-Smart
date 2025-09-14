"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  tag?: string;
  onLetterAnimationComplete?: () => void;
};

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, scale: 0.8 },
  to = { opacity: 1, scale: 1 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current as HTMLElement;

      if ((el as any)._rbsplitInstance) {
        try {
          (el as any)._rbsplitInstance.revert();
        } catch (_) {}
        (el as any)._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: any;
      const assignTargets = (self: any) => {
        if (splitType.includes("chars") && self.chars.length)
          targets = self.chars;
        if (!targets && splitType.includes("words") && self.words.length)
          targets = self.words;
        if (!targets && splitType.includes("lines") && self.lines.length)
          targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self: any) => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            }
          );
          return tween;
        },
      });

      (el as any)._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {}
        (el as any)._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete,
      ],
      scope: ref,
    }
  );

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      overflow: "hidden",
      whiteSpace: "normal",
      wordWrap: "break-word",
      willChange: "transform, opacity",
      margin: 0,
      display: "block",
    };
    const classes = `split-parent ${className}`;
    switch (tag) {
      case "h1":
        return (
          <h1 ref={ref as any} style={style} className={classes}>
            {text}
          </h1>
        );
      case "h2":
        return (
          <h2 ref={ref as any} style={style} className={classes}>
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 ref={ref as any} style={style} className={classes}>
            {text}
          </h3>
        );
      case "h4":
        return (
          <h4 ref={ref as any} style={style} className={classes}>
            {text}
          </h4>
        );
      case "h5":
        return (
          <h5 ref={ref as any} style={style} className={classes}>
            {text}
          </h5>
        );
      case "h6":
        return (
          <h6 ref={ref as any} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref as any} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <SplitText
        text="Combining data for further analysis"
        className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide uppercase"
        delay={80}
        duration={0.7}
        ease="power2.out"
        splitType="words"
        from={{ opacity: 0, scale: 0.5, y: 20 }}
        to={{ opacity: 1, scale: 1, y: 0 }}
        threshold={0.2}
        rootMargin="-100px"
        textAlign="center"
        tag="h1"
      />
      <div className="relative w-full max-w-md h-1 rounded-full bg-gray-700 mt-10 overflow-hidden">
        {/* Animated progress bar */}
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-loading-bar"></div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
