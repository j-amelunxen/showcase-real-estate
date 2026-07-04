"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// Palette: deep teal-slate stage, mint accent, warm stone light sections
const MINT = "#00ffbb";
const INK = "#14323a";
const STONE = "#f6f5f3";
const TEAL_DEEP = "#0f766e"; // accent on light surfaces (mint fails contrast there)
const MUTED_DARK = "#9db8b4"; // muted text on ink
const MUTED_LIGHT = "#5f7370"; // muted text on stone
const HAIRLINE_LIGHT = "#e0ddd6";
const HAIRLINE_DARK = "rgba(246, 245, 243, 0.16)";

type MenuItem = { name: string; href: string; delay: string };
type Property = { name: string; location: string; priceM: number; image: string };
type Step = { num: string; title: string; copy: string; tint: string };
type Stat = { value: number; decimals: number; prefix: string; suffix: string; label: string };

const MENU_ITEMS: MenuItem[] = [
  { name: "About", href: "#hero" },
  { name: "Properties", href: "#portfolio" },
  { name: "Work", href: "#process" },
  { name: "Partnership", href: "#contact" },
  { name: "Contact", href: "#contact" },
].map((item, i) => ({ ...item, delay: `${i * 60 + 100}ms` }));

const PROPERTIES: Property[] = [
  {
    name: "Villa Serrana",
    location: "Mallorca, Spain",
    priceM: 8.4,
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_211418_dbb8d807-3cfb-4c26-b1df-02fb0c23cc7d.png&w=1280&q=85",
  },
  {
    name: "The Meridian Penthouse",
    location: "London, United Kingdom",
    priceM: 12.9,
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_211445_ba965dcd-97d6-4644-b390-d4744078ec6c.png&w=1280&q=85",
  },
  {
    name: "Casa Lumen",
    location: "Lake Como, Italy",
    priceM: 6.2,
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_212326_f5e78786-d7bb-40c5-abac-cd3c0be37d90.png&w=1280&q=85",
  },
];

const STEPS: Step[] = [
  {
    num: "01",
    title: "Private consultation",
    copy: "A confidential conversation about your investment goals, preferred markets and time horizon. No obligations, no listings pushed.",
    tint: "#d1fae5",
  },
  {
    num: "02",
    title: "Curated selection",
    copy: "We source on- and off-market opportunities matched to your profile and present only what truly qualifies.",
    tint: "#99f6e4",
  },
  {
    num: "03",
    title: "Seamless acquisition",
    copy: "Due diligence, negotiation and closing, handled end to end by our team and vetted local partners.",
    tint: "#5eead4",
  },
];

const STATS: Stat[] = [
  { value: 240, decimals: 0, prefix: "€", suffix: "M+", label: "Assets placed" },
  { value: 38, decimals: 0, prefix: "", suffix: "", label: "Acquisitions completed" },
  { value: 92, decimals: 0, prefix: "", suffix: "%", label: "Sourced off-market" },
  { value: 14, decimals: 0, prefix: "", suffix: "", label: "Years of discretion" },
];

const MARQUEE_LOCATIONS = ["Mallorca", "London", "Lake Como", "Zürich", "Cap Ferrat", "St. Moritz"];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function phase(p: number, a: number, b: number) {
  return clamp01((p - a) / (b - a));
}

function CountUp({
  value,
  decimals,
  prefix,
  suffix,
  duration = 1800,
}: {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (v: number) => prefix + v.toFixed(decimals) + suffix;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(value);
      return;
    }
    el.textContent = format(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = format(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals, prefix, suffix, duration]);

  return <span ref={ref}>{prefix + value.toFixed(decimals) + suffix}</span>;
}

function ArrowIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M8.32 3.42L13.22 8.32L8.32 13.23" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.42 8.32H13.22" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PillButton({
  label,
  onClick,
  fullWidth = false,
}: {
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      className="pill-cta"
      onClick={onClick}
      style={{
        background: MINT,
        color: INK,
        border: "none",
        borderRadius: 999,
        padding: "5px 5px 5px 22px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: fullWidth ? "space-between" : "center",
        width: fullWidth ? "100%" : undefined,
        gap: 12,
        fontFamily: "var(--font-geist), sans-serif",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.02em",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <span
        className="pill-arrow"
        style={{
          background: INK,
          width: 34,
          height: 34,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ArrowIcon stroke={MINT} />
      </span>
    </button>
  );
}

function BadgeChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1.5px solid ${MINT}`,
        borderRadius: 8,
        background: "rgba(20, 50, 58, 0.6)",
        color: MINT,
        fontFamily: "var(--font-geist), sans-serif",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "10px 18px",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [vw, setVw] = useState(1280);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const gVid1Ref = useRef<HTMLVideoElement>(null);
  const gVid2Ref = useRef<HTMLVideoElement>(null);
  const gVid3Ref = useRef<HTMLVideoElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const blackTextRef = useRef<HTMLParagraphElement>(null);
  const whiteTextRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const wrapper = wrapperRef.current;
    const max = (wrapper ? wrapper.offsetHeight : document.documentElement.scrollHeight) - window.innerHeight;
    const p = max > 0 ? clamp01(window.scrollY / max) : 0;
    const viewportWidth = window.innerWidth;

    // Phase 1 + 2: line grows 0 -> 50px, then expands to full viewport width
    let width: number;
    if (p < 0.06) {
      width = (p / 0.06) * 50;
    } else if (p < 0.16) {
      const e = (p - 0.06) / 0.1;
      const eased = e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
      width = 50 + eased * (viewportWidth - 50);
    } else {
      width = viewportWidth;
    }
    if (lineRef.current) lineRef.current.style.width = width + "px";

    // Phases 3-5: images scale in
    const layers: [React.RefObject<HTMLDivElement | null>, number, number][] = [
      [img1Ref, 0.16, 0.34],
      [img2Ref, 0.34, 0.5],
      [img3Ref, 0.5, 0.64],
    ];
    for (const [ref, a, b] of layers) {
      if (!ref.current) continue;
      const t = phase(p, a, b);
      ref.current.style.transform = "scale(" + (0.2 + t * 0.8) + ")";
      ref.current.style.opacity = String(Math.min(1, t * 4));
    }

    // Phase 6: ink text screen scales in
    const tc = phase(p, 0.64, 0.78);
    if (coverRef.current) {
      coverRef.current.style.transform = "scale(" + (0.2 + tc * 0.8) + ")";
      coverRef.current.style.opacity = String(Math.min(1, tc * 4));
    }

    // Phase 7: morph ink -> stone, fade dark-stage text out
    const m = phase(p, 0.78, 0.9);
    const lerp = (a: number, b: number) => Math.round(a + (b - a) * m);
    const bg = `rgb(${lerp(20, 246)}, ${lerp(50, 245)}, ${lerp(58, 243)})`;
    if (coverRef.current) coverRef.current.style.backgroundColor = bg;
    if (lineRef.current) lineRef.current.style.backgroundColor = bg;
    if (blackTextRef.current) blackTextRef.current.style.opacity = String(1 - m);

    // Phase 8: light-stage text fades in
    const tw = phase(p, 0.9, 1.0);
    if (whiteTextRef.current) whiteTextRef.current.style.opacity = String(tw);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      onScroll();
    };

    const kickVideos = () => {
      const start = (ref: React.RefObject<HTMLVideoElement | null>) => {
        const v = ref.current;
        if (!v) return;
        v.muted = true;
        v.defaultMuted = true;
        const attempt = () => v.play().catch(() => {});
        if (v.readyState >= 2) attempt();
        else v.addEventListener("canplay", attempt, { once: true });
      };
      start(heroVideoRef);
      start(gVid1Ref);
      start(gVid2Ref);
      start(gVid3Ref);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    kickVideos();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(menuTimeoutRef.current);
    };
  }, [onScroll]);

  // Scroll reveals: sections fade/slide in once, hairlines grow via .rule-grow
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax depth on portfolio images (transform-only, rAF-throttled)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (els.length === 0) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const t = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${(-t * 26).toFixed(1)}px) scale(1.12)`;
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const openMenu = useCallback(() => {
    clearTimeout(menuTimeoutRef.current);
    setMenuOpen(true);
    setMenuMounted(true);
    setMenuClosing(false);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMenuClosing(true);
    menuTimeoutRef.current = setTimeout(() => {
      setMenuMounted(false);
      setMenuClosing(false);
    }, 300);
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToPortfolio = useCallback(() => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openContactEmail = useCallback(() => {
    window.location.href = "mailto:hello@immo-showcase.com";
  }, []);

  const isMobile = vw < 640;

  const imageStyle: React.CSSProperties = isMobile
    ? { width: "85vw", maxWidth: 900, aspectRatio: "16 / 10", height: "auto", objectFit: "cover", borderRadius: 8 }
    : { width: "100%", height: "100%", objectFit: "cover", borderRadius: 0 };

  const barWidth = menuOpen ? "56px" : "280px";
  const barPadding = menuOpen ? "0" : "0 16px";
  const barJustify = menuOpen ? "center" : "space-between";
  const overlayAnim = menuClosing ? "fadeOut 0.3s ease forwards" : "fadeIn 0.3s ease forwards";
  const panelAnim = menuClosing
    ? "menuSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
    : "menuSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";

  return (
    <div style={{ background: INK, position: "relative" }}>
      {/* ============ ANNOUNCEMENT BAR ============ */}
      {bannerVisible && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: MINT, color: INK }}>
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "7px clamp(16px, 4vw, 48px)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <a
              href="#portfolio"
              style={{
                flexGrow: 1,
                textAlign: "center",
                fontFamily: "var(--font-geist), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 4,
                color: INK,
              }}
            >
              Three new estates join the private collection: view the portfolio
            </a>
            <button
              className="banner-close"
              onClick={() => setBannerVisible(false)}
              aria-label="Dismiss announcement"
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "none",
                background: "transparent",
                color: INK,
                fontSize: 18,
                lineHeight: 1,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div id="hero" ref={wrapperRef} style={{ position: "relative", height: "900vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          {/* ============ HERO SECTION (z-0) ============ */}
          <section
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              width: "100%",
              overflow: "hidden",
              zIndex: 0,
              display: "flex",
              flexDirection: "column",
              background: INK,
            }}
          >
            {/* GoCanopy trick: media at reduced opacity over the ink stage, so text wins everywhere */}
            <video
              ref={heroVideoRef}
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="hero-video"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 65% 58% at 50% 52%, rgba(10, 30, 36, 0.5) 0%, rgba(10, 30, 36, 0) 100%), linear-gradient(to bottom, rgba(10, 30, 36, 0.4) 0%, rgba(10, 30, 36, 0.15) 40%, rgba(20, 50, 58, 0.55) 100%)",
                pointerEvents: "none",
              }}
            />
            <div className="grain-overlay" aria-hidden="true" />

            {/* Top navbar */}
            <div
              className="hero-fade"
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(16px, 3vw, 32px) clamp(16px, 4vw, 48px) 0",
                marginTop: bannerVisible ? 38 : 0,
              }}
            >
              <div style={{ width: "clamp(32px, 12vw, 176px)" }} />
              <div
                style={{
                  fontFamily: "'Haboro Norm Regular', serif",
                  color: STONE,
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                IMMO-SHOWCASE
              </div>
              <div style={{ width: "clamp(32px, 12vw, 176px)", display: "flex", justifyContent: "flex-end" }}>
                {!isMobile && <PillButton label="Get in touch" onClick={scrollToContact} />}
              </div>
            </div>

            {/* Hero heading */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(16px, 2.5vh, 24px)",
                padding: "0 clamp(16px, 4vw, 24px)",
                textAlign: "center",
              }}
            >
              <div className="hero-fade">
                <BadgeChip>Purpose-built for investors beyond ownership</BadgeChip>
              </div>
              <h1
                style={{
                  fontFamily: "'Haboro Norm Regular', serif",
                  color: STONE,
                  textAlign: "center",
                  fontSize: "clamp(24px, 4.5vw, 68px)",
                  lineHeight: 1.1,
                  letterSpacing: "0.025em",
                  textTransform: "uppercase",
                  maxWidth: 1024,
                  fontWeight: 400,
                  textShadow: "0 2px 12px rgba(6, 20, 24, 0.6), 0 6px 40px rgba(6, 20, 24, 0.5)",
                }}
              >
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span className="hero-line" style={{ animationDelay: "0.15s" }}>
                    PREMIUM REAL ESTATE FOR
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span className="hero-line" style={{ animationDelay: "0.32s" }}>
                    INVESTORS BEYOND OWNERSHIP
                  </span>
                </span>
              </h1>
              <div
                className="hero-fade"
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  color: MINT,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 10px rgba(6, 20, 24, 0.8)",
                }}
              >
                Off-market · Discreet · Worldwide
              </div>
              <p
                className="hero-fade"
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  color: "#f0efeb",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: 560,
                  textWrap: "pretty",
                  textShadow: "0 1px 14px rgba(6, 20, 24, 0.7)",
                }}
              >
                Exceptional properties sourced privately and acquired seamlessly, with intelligence and discretion at
                every step of the deal.
              </p>
              <div className="hero-fade" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  className="ghost-link"
                  onClick={scrollToPortfolio}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: STONE,
                    fontFamily: "var(--font-geist), sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    cursor: "pointer",
                    padding: "10px 4px",
                  }}
                >
                  View the portfolio
                </button>
                <PillButton label="Get in touch" onClick={scrollToContact} />
              </div>
            </div>

            {/* Bottom morphing navbar */}
            <div
              className="hero-fade"
              style={{
                position: "relative",
                zIndex: 15,
                display: "flex",
                justifyContent: "center",
                paddingBottom: "clamp(16px, 4vh, 40px)",
              }}
            >
              <div
                style={{
                  height: 56,
                  width: barWidth,
                  maxWidth: "85vw",
                  background: INK,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: barJustify,
                  padding: barPadding,
                  overflow: "hidden",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  borderRadius: 999,
                }}
              >
                {!menuOpen ? (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={MINT}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-geist), sans-serif",
                        color: STONE,
                        fontSize: 14,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                      }}
                    >
                      HOME
                    </span>
                    <button
                      onClick={openMenu}
                      aria-label="Open menu"
                      style={{
                        position: "relative",
                        width: 24,
                        height: 24,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          width: 24,
                          height: 1.5,
                          background: STONE,
                          display: "block",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 15,
                          width: 24,
                          height: 1.5,
                          background: STONE,
                          display: "block",
                        }}
                      />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={closeMenu}
                    aria-label="Close menu"
                    style={{
                      position: "relative",
                      width: 56,
                      height: 56,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 1.5,
                        background: STONE,
                        display: "block",
                        transform: "rotate(45deg)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 1.5,
                        background: STONE,
                        display: "block",
                        transform: "rotate(-45deg)",
                      }}
                    />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ============ MENU POPUP ============ */}
          {menuMounted && (
            <>
              <div
                onClick={closeMenu}
                style={{ position: "fixed", inset: 0, zIndex: 20, background: "rgba(10, 30, 36, 0.5)", animation: overlayAnim }}
              />
              <div
                style={{
                  position: "fixed",
                  zIndex: 30,
                  left: "50%",
                  bottom: "clamp(80px, 12vh, 120px)",
                  width: "92vw",
                  maxWidth: 480,
                  background: INK,
                  border: `1px solid ${HAIRLINE_DARK}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 5vw, 40px)",
                  transform: "translateX(-50%)",
                  animation: panelAnim,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist), sans-serif",
                    color: MUTED_DARK,
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: 24,
                  }}
                >
                  MENU
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {MENU_ITEMS.map((item) => (
                    <li
                      key={item.name}
                      style={{
                        opacity: 0,
                        animation: `menuItemSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                        animationDelay: item.delay,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="menu-item-link"
                        style={{
                          fontFamily: "'Haboro Norm Regular', serif",
                          color: STONE,
                          fontSize: "clamp(24px, 4vw, 36px)",
                          transition: "color 0.2s",
                          display: "block",
                          padding: "4px 0",
                          textDecoration: "none",
                        }}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: `1px solid ${HAIRLINE_DARK}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: 14 }}>
                      Private line
                    </span>
                    <span style={{ fontFamily: "var(--font-geist), sans-serif", color: STONE, fontSize: 14 }}>
                      +44 020 8156 7290
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: 14 }}>
                      Email
                    </span>
                    <span style={{ fontFamily: "var(--font-geist), sans-serif", color: STONE, fontSize: 14 }}>
                      hello@immo-showcase.com
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: 24 }}>
                  <PillButton
                    label="Get in touch"
                    fullWidth
                    onClick={() => {
                      closeMenu();
                      scrollToContact();
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* ============ SCROLL-DRIVEN GALLERY (fixed, z-10) ============ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div ref={lineRef} style={{ height: "100%", width: 0, background: INK, overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <div
                  ref={img1Ref}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transform: "scale(0.2)",
                  }}
                >
                  <video
                    ref={gVid1Ref}
                    src="/videos/gallery-1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    style={imageStyle}
                  />
                </div>

                <div
                  ref={img2Ref}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transform: "scale(0.2)",
                  }}
                >
                  <video
                    ref={gVid2Ref}
                    src="/videos/gallery-2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    style={imageStyle}
                  />
                </div>

                <div
                  ref={img3Ref}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transform: "scale(0.2)",
                  }}
                >
                  <video
                    ref={gVid3Ref}
                    src="/videos/gallery-3.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    style={imageStyle}
                  />
                </div>

                <div
                  ref={coverRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transform: "scale(0.2)",
                    background: INK,
                  }}
                >
                  <p
                    ref={blackTextRef}
                    style={{
                      fontFamily: "var(--font-geist), sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(24px, 3.5vw, 48px)",
                      textAlign: "center",
                      lineHeight: 1.3,
                      maxWidth: 768,
                      padding: "0 24px",
                      color: STONE,
                    }}
                  >
                    Access exceptional real estate opportunities <span style={{ color: MINT }}>worldwide.</span>
                  </p>
                </div>

                <div ref={whiteTextRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-geist), sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(24px, 3.5vw, 48px)",
                      textAlign: "center",
                      lineHeight: 1.3,
                      maxWidth: 768,
                      padding: "0 24px",
                      color: INK,
                    }}
                  >
                    Built on trust and <span style={{ color: TEAL_DEEP }}>expertise.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ LOCATION MARQUEE ============ */}
      <div aria-hidden="true" style={{ background: STONE, padding: "clamp(56px, 9vh, 104px) 0 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
              {MARQUEE_LOCATIONS.map((location) => (
                <span key={location} style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Haboro Norm Regular', serif",
                      textTransform: "uppercase",
                      fontSize: "clamp(56px, 9vw, 140px)",
                      lineHeight: 1.1,
                      letterSpacing: "0.04em",
                      color: "transparent",
                      WebkitTextStroke: "1px #cfccc3",
                    }}
                  >
                    {location}
                  </span>
                  <span
                    style={{
                      color: TEAL_DEEP,
                      fontSize: "clamp(10px, 1vw, 14px)",
                      padding: "0 clamp(24px, 3vw, 56px)",
                    }}
                  >
                    ◆
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ PORTFOLIO ============ */}
      <section id="portfolio" style={{ position: "relative", background: STONE, padding: "clamp(56px, 9vh, 112px) clamp(24px, 6vw, 96px) clamp(80px, 12vh, 160px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(40px, 6vh, 72px)" }}>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="rule-grow" style={{ width: 48, height: 1.5, background: TEAL_DEEP }} />
            <span style={{ fontFamily: "var(--font-geist), sans-serif", color: TEAL_DEEP, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
              Portfolio
            </span>
            <h2
              style={{
                fontFamily: "'Haboro Norm Regular', serif",
                color: INK,
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                fontWeight: 400,
                maxWidth: 640,
              }}
            >
              Curated properties, privately sourced
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 3vw, 48px)" }}>
            {PROPERTIES.map((property, i) => (
              <article
                key={property.name}
                data-reveal
                className="portfolio-card"
                style={{ display: "flex", flexDirection: "column", gap: 16, cursor: "pointer", "--reveal-delay": `${i * 140}ms` } as React.CSSProperties}
              >
                <div style={{ overflow: "hidden", aspectRatio: "4 / 3", borderRadius: 16 }}>
                  <div className="portfolio-zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.image}
                      alt={property.name}
                      className="portfolio-img"
                      data-parallax
                      style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.12)" }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h3 style={{ fontFamily: "'Haboro Norm Regular', serif", color: INK, fontSize: 22, fontWeight: 400 }}>
                    {property.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_LIGHT, fontSize: 14, fontWeight: 300 }}>
                      {property.location}
                    </span>
                    <span style={{ fontFamily: "var(--font-geist), sans-serif", color: INK, fontSize: 14, fontWeight: 500 }}>
                      <CountUp value={property.priceM} decimals={1} prefix="€" suffix="M" duration={1400} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section
        id="process"
        style={{
          position: "relative",
          background: STONE,
          borderTop: `1px solid ${HAIRLINE_LIGHT}`,
          padding: "clamp(80px, 12vh, 160px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(40px, 6vh, 72px)" }}>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="rule-grow" style={{ width: 48, height: 1.5, background: TEAL_DEEP }} />
            <span style={{ fontFamily: "var(--font-geist), sans-serif", color: TEAL_DEEP, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
              The Process
            </span>
            <h2
              style={{
                fontFamily: "'Haboro Norm Regular', serif",
                color: INK,
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                fontWeight: 400,
                maxWidth: 640,
              }}
            >
              From interest to investment
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(20px, 2.5vw, 32px)" }}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                data-reveal
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 20,
                  background: step.tint,
                  borderRadius: 16,
                  padding: "clamp(32px, 3.5vw, 44px) clamp(28px, 3vw, 40px)",
                  "--reveal-delay": `${i * 140}ms`,
                } as React.CSSProperties}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: `2px solid ${INK}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Haboro Norm Regular', serif",
                    color: INK,
                    fontSize: 20,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "'Haboro Norm Regular', serif", color: INK, fontSize: 24, fontWeight: 400 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "var(--font-geist), sans-serif", color: "#2f4a45", fontSize: 15, fontWeight: 400, lineHeight: 1.6, textWrap: "pretty" }}>
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRACK RECORD ============ */}
      <section
        aria-label="Track record"
        style={{
          background: INK,
          borderBottom: `1px solid ${HAIRLINE_DARK}`,
          padding: "clamp(72px, 10vh, 128px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div
          data-reveal
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(40px, 5vw, 64px)",
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "'Haboro Norm Regular', serif", color: MINT, fontSize: "clamp(40px, 4.5vw, 64px)", lineHeight: 1, fontWeight: 400 }}>
                <CountUp value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA + FOOTER ============ */}
      <section id="contact" style={{ position: "relative", background: INK, padding: "clamp(72px, 10vh, 128px) clamp(24px, 6vw, 96px) 0" }}>
        <div
          data-reveal
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            textAlign: "center",
            border: "1.5px solid rgba(0, 255, 187, 0.45)",
            borderRadius: 20,
            background: "rgba(0, 255, 187, 0.04)",
            padding: "clamp(48px, 8vh, 96px) clamp(24px, 5vw, 64px)",
          }}
        >
          <BadgeChip>Private consultation</BadgeChip>
          <h2
            style={{
              fontFamily: "'Haboro Norm Regular', serif",
              color: STONE,
              fontSize: "clamp(32px, 5vw, 72px)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontWeight: 400,
              maxWidth: 900,
            }}
          >
            Invest beyond ownership
          </h2>
          <p style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 300, lineHeight: 1.6, maxWidth: 520, textWrap: "pretty" }}>
            Every engagement begins with a private conversation. Tell us what you are looking for, and we handle the
            rest.
          </p>
          <div
            style={{
              fontFamily: "var(--font-geist), sans-serif",
              color: MINT,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Discretion from day one
          </div>
          <PillButton label="Get in touch" onClick={openContactEmail} />
        </div>

        {/* Oversized wordmark */}
        <div data-reveal aria-hidden="true" style={{ overflow: "hidden", marginTop: "clamp(64px, 10vh, 128px)" }}>
          <div
            style={{
              fontFamily: "'Haboro Norm Regular', serif",
              color: MINT,
              fontSize: "clamp(36px, 8.8vw, 148px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 1,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            IMMO-SHOWCASE
          </div>
        </div>

        <footer
          style={{
            maxWidth: 1280,
            margin: "clamp(48px, 7vh, 96px) auto 0",
            borderTop: `1px solid ${HAIRLINE_DARK}`,
            padding: "32px 0 40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span style={{ fontFamily: "'Haboro Norm Regular', serif", color: STONE, fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            IMMO-SHOWCASE
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            <span style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: 13, fontWeight: 300 }}>
              +44 020 8156 7290
            </span>
            <span style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: 13, fontWeight: 300 }}>
              hello@immo-showcase.com
            </span>
            <Link
              href="/impressum"
              style={{ fontFamily: "var(--font-geist), sans-serif", color: MUTED_DARK, fontSize: 13, fontWeight: 300 }}
            >
              Impressum
            </Link>
          </div>
          <span style={{ fontFamily: "var(--font-geist), sans-serif", color: "#557a72", fontSize: 13, fontWeight: 300 }}>
            © 2026 Immo-Showcase. All rights reserved.
          </span>
        </footer>
      </section>
    </div>
  );
}
