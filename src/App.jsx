import { useEffect, useRef, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Star,
  ExternalLink,
  Code2,
  Brain,
  BarChart2,
  Server,
  Layout,
  Database,
  Wrench,
  Cloud,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLaptopCode,
  FaCode,
  FaTrophy,
} from "react-icons/fa";
import {
  SiPython,
  SiOpenjdk,
  SiJavascript,
  SiHtml5,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiOpencv,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiVite,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiPostman,
  SiJupyter,
  SiVercel,
  SiCodeforces,
} from "react-icons/si";
import {
  personalInfo,
  experiences,
  education,
  projects,
  skills,
  skillCategories,
  hobbies,
  certifications,
  badges,
  achievements,
} from "./data/portfolio";
import Magnetic from "./components/ui/Magnetic";
import CommandPalette from "./components/ui/CommandPalette";
import InteractiveTerminal from "./components/ui/InteractiveTerminal";
import TechMarquee from "./components/ui/TechMarquee";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Section({ children, id, shouldAnimate = true }) {
  return (
    <motion.section
      id={id}
      variants={shouldAnimate ? fade : undefined}
      initial={shouldAnimate ? "hidden" : false}
      whileInView={shouldAnimate ? "show" : undefined}
      viewport={shouldAnimate ? { once: true, margin: "-40px" } : undefined}
      className="section-shell h-full"
    >
      {children}
    </motion.section>
  );
}

function Label({ children }) {
  return <p className="section-label">{children}</p>;
}

function ZidioMark({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 align-middle ${className}`}
    >
      <span className="relative inline-flex h-3.5 w-[24px] items-center justify-center rounded-[3px] bg-[#6C63FF]">
        <span className="text-[9px] font-bold text-white leading-none font-sans tracking-tight">
          ZD
        </span>
      </span>
      <span>Zidio Development</span>
    </span>
  );
}

function InfotactMark({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 align-middle ${className}`}
    >
      <span className="relative inline-flex h-3.5 w-[22px] items-center justify-center rounded-[3px] bg-[#0EA5E9]">
        <span className="text-[9px] font-bold text-white leading-none font-sans tracking-tight">
          IS
        </span>
      </span>
      <span>Infotact Solutions</span>
    </span>
  );
}

function CreativeMark({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 align-middle ${className}`}
    >
      <span className="relative inline-flex h-3.5 w-[22px] items-center justify-center rounded-[3px] bg-[#F59E0B]">
        <span className="text-[9px] font-bold text-white leading-none font-sans tracking-tight">
          CI
        </span>
      </span>
      <span>Creative Insight IT Academy</span>
    </span>
  );
}

export default function App() {
  const { isDark, toggle } = useTheme();
  const shouldAnimate = true;
  const audioContextRef = useRef(null);
  const themeAudioRef = useRef(null);
  const [typedName, setTypedName] = useState("");
  const [catState, setCatState] = useState("idle");
  const [catPawing, setCatPawing] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);
  const pointerRef = useRef(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const pointerFrameRef = useRef(null);

  useEffect(() => {
    const playClickTone = () => {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(520, now);
      oscillator.frequency.exponentialRampToValueAtTime(380, now + 0.06);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.09);
    };

    const onClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[data-theme-toggle="true"]')) return;
      if (target.closest("a, button")) {
        playClickTone();
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const handleThemeToggle = () => {
    if (themeAudioRef.current) {
      themeAudioRef.current.currentTime = 0;
      themeAudioRef.current.play().catch(() => {});
    }
    toggle();
  };

  const playCatTapTone = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      ctx.currentTime + 0.1,
    );
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  };

  const handleCatTap = () => {
    if (catPawing) return;
    setCatPawing(true);
    setCatState("clicked");
    playCatTapTone();

    window.setTimeout(() => {
      setCatPawing(false);
      setCatState("idle");
    }, 400);
  };

  useEffect(() => {
    const fullName = personalInfo.name;
    let index = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      if (deleting) {
        index = Math.max(0, index - 1);
      } else {
        index = Math.min(fullName.length, index + 1);
      }

      setTypedName(fullName.slice(0, index));

      if (!deleting && index === fullName.length) {
        deleting = true;
        timeoutId = window.setTimeout(tick, 1100);
        return;
      }

      if (deleting && index === 0) {
        deleting = false;
        timeoutId = window.setTimeout(tick, 220);
        return;
      }

      timeoutId = window.setTimeout(tick, deleting ? 55 : 90);
    };

    tick();

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    const onMove = (event) => {
      pointerTargetRef.current = { x: event.clientX, y: event.clientY };
      pointer.style.opacity = "1";
    };

    const onLeave = () => {
      pointer.style.opacity = "0";
    };

    const render = () => {
      const current = pointerCurrentRef.current;
      const target = pointerTargetRef.current;

      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      pointer.style.transform = `translate3d(${current.x - 14}px, ${current.y - 14}px, 0)`;
      pointerFrameRef.current = window.requestAnimationFrame(render);
    };

    pointerFrameRef.current = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);

      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);

  const sections = [
    { label: "About", href: "#about" },
    { label: "Connect", href: "#contact" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Achievements", href: "#achievements" },
    { label: "Certifications", href: "#certifications" },
    { label: "Badges", href: "#badges" },
  ];

  const socialItems = [
    {
      label: "LinkedIn",
      href: personalInfo.socials.linkedin,
      icon: FaLinkedin,
    },
    { label: "GitHub", href: personalInfo.socials.github, icon: FaGithub },
    { label: "Mail", href: personalInfo.socials.email, icon: FaEnvelope },
  ];

  const codingItems = [
    {
      label: "LeetCode",
      href: personalInfo.socials.leetcode,
      icon: FaLaptopCode,
    },
    { label: "CodeChef", href: personalInfo.socials.codechef, icon: FaCode },
    {
      label: "Codeforces",
      href: personalInfo.socials.codeforces,
      icon: SiCodeforces,
    },
    {
      label: "HackerRank",
      href: personalInfo.socials.hackerrank,
      icon: FaTrophy,
    },
    { label: "Code360", href: personalInfo.socials.code360, icon: FaCode },
    { label: "GeeksforGeeks", href: personalInfo.socials.geeksforgeeks, icon: FaCode },
  ];

  const skillIconMap = {
    Python: SiPython,
    SQL: SiMysql,
    Java: SiOpenjdk,
    JavaScript: SiJavascript,
    HTML5: SiHtml5,
    CSS3: SiHtml5,
    NumPy: SiNumpy,
    Pandas: SiPandas,
    Matplotlib: SiPython,
    Seaborn: SiPython,
    "Scikit-Learn": SiScikitlearn,
    TensorFlow: SiTensorflow,
    OpenCV: SiOpencv,
    Tableau: ShieldCheck,
    "Power BI": ShieldCheck,
    React: SiReact,
    "Tailwind CSS": SiTailwindcss,
    Vite: SiVite,
    "Node.js": SiNodedotjs,
    "Express.js": SiExpress,
    FastAPI: SiFastapi,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    Git: SiGit,
    GitHub: SiGit,
    Postman: SiPostman,
    "Jupyter Notebook": SiJupyter,
    "VS Code": SiPython,
    Azure: ShieldCheck,
    Vercel: SiVercel,
    "MongoDB Atlas": SiMongodb,
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen relative overflow-x-clip transition-colors duration-200">
        <audio
          ref={themeAudioRef}
          src="/audio/theme-click.wav"
          preload="auto"
        />
        <div
          ref={pointerRef}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden h-7 w-7 rounded-full border border-[color:var(--line)] bg-[color:var(--accent-soft)] opacity-0 transition-opacity duration-300 md:block"
        />
        <div className="pointer-events-none absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-stone-200/40 blur-2xl dark:bg-stone-800/35" />
        <div className="pointer-events-none absolute top-[28%] -right-16 h-[260px] w-[260px] rounded-full bg-emerald-100/30 blur-2xl dark:bg-emerald-400/10" />
        <div
          className={`pointer-events-none absolute inset-0 mesh-overlay ${isDark ? "opacity-25" : "opacity-60"}`}
        />

        <Navbar isDark={isDark} toggle={handleThemeToggle} />
        <CommandPalette />
        <InteractiveTerminal />

        <main
          id="top"
          className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-20 space-y-6"
        >
          {/* Hero */}
          <motion.div
            variants={shouldAnimate ? fade : undefined}
            initial={shouldAnimate ? "hidden" : false}
            animate={shouldAnimate ? "show" : undefined}
            className="glass-card paper-panel p-6 sm:p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-emerald-100/80 dark:bg-emerald-400/12 blur-2xl" />
            <div className="absolute -left-10 -bottom-12 h-40 w-40 rounded-full bg-stone-200/70 dark:bg-stone-700/30 blur-2xl" />

            <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="order-2 lg:order-1">
                <p className="mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)] mb-3">
                  Full Stack Developer · Python Developer · Data Science
                </p>

                <h1 className="display-serif text-4xl md:text-6xl leading-[0.95] max-w-3xl mb-4">
                  {typedName}
                  <span className="inline-block h-[0.9em] w-px translate-y-1 bg-[color:var(--accent)] ml-2 animate-pulse" />
                </h1>

                <p className="text-sm md:text-base max-w-2xl text-[color:var(--muted)] leading-relaxed">
                  Bridging software engineering, data science, and artificial
                  intelligence.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.2}>
                    <a
                      href={personalInfo.socials.email}
                      className="mono text-xs px-4 py-2 rounded-full bg-[color:var(--txt)] text-[color:var(--bg-0)] hover:opacity-90 transition-opacity block"
                    >
                      Contact Me
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={personalInfo.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xs px-4 py-2 rounded-full border border-[color:var(--line)] hover:bg-[color:var(--accent-soft)] transition-colors block"
                    >
                      GitHub
                    </a>
                  </Magnetic>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[240px] sm:max-w-xs">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-white/50 via-stone-200/40 to-emerald-100/50 dark:from-white/5 dark:via-emerald-400/5 dark:to-stone-500/5 blur-2xl" />
                  <div className="relative rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-3 shadow-xl">
                    <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-stone-100 dark:bg-stone-900 aspect-[4/5]">
                      <img
                        src="/images/profile3.jpeg"
                        alt="Profile picture of Vatsal Gajera"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold leading-tight">
                          Vatsal Gajera
                        </p>
                        <p className="mono text-[11px] text-[color:var(--muted)]">
                          MCA · Dharmsinh Desai University,
                        </p>
                        <p className="mono text-[11px] text-[color:var(--muted)]">
                          Data Science & Full Stack Dev,
                        </p>
                        <p className="mono text-[11px] text-[color:var(--muted)]">
                          Rajkot, Gujarat, India
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                          Open
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 1. About & 2. Connect Grid */}
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <Section id="about" shouldAnimate={shouldAnimate}>
              <Label>About</Label>
              <div className="space-y-3">
                {personalInfo.bio.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-[15px] text-[color:var(--muted)] leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              {/* Social links */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[color:var(--line)]">
                {socialItems.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-3 py-2.5 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-soft)] transition-colors"
                  >
                    <s.icon
                      size={13}
                      className="text-[color:var(--accent)] flex-shrink-0"
                    />
                    <span className="mono text-[11px] text-[color:var(--txt)]">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </Section>

            <Section id="contact" shouldAnimate={shouldAnimate}>
              <Label>Connect</Label>
              <div className="flex flex-col gap-2.5">
                {codingItems.map((s) => (
                  <Magnetic key={s.label} strength={0.15}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xs px-3 py-2 rounded-xl border border-[color:var(--line)] hover:bg-[color:var(--accent-soft)] transition-colors inline-flex items-center gap-2 w-full"
                    >
                      <s.icon size={13} className="text-[color:var(--muted)]" />
                      {s.label}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Section>
          </div>

          {/* 3. Experience */}
          <Section id="experience" shouldAnimate={shouldAnimate}>
            <Label>Experience</Label>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="border border-[color:var(--line)] rounded-[24px] p-4 md:p-5 bg-[color:var(--card-strong)]"
                >
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold hover:opacity-70 transition-opacity inline-flex items-center"
                  >
                    {exp.company === "Zidio Development" ? (
                      <ZidioMark />
                    ) : exp.company === "Infotact Solutions" ? (
                      <InfotactMark />
                    ) : exp.company === "Creative Insight IT Academy" ? (
                      <CreativeMark />
                    ) : (
                      exp.company
                    )}
                  </a>
                  <div className="mt-1 mb-2.5 space-y-0.5">
                    <p className="mono text-xs text-[color:var(--muted)]">
                      {exp.role}
                    </p>
                    <p className="mono text-xs text-[color:var(--muted)]">
                      {exp.type} · {exp.location} · {exp.period}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {exp.tech.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-xs md:text-sm text-[color:var(--muted)] leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* 4. Projects */}
          <Section id="projects" shouldAnimate={shouldAnimate}>
            <Label>Projects</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((proj, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-4 flex flex-col"
                >
                  <div className="mb-1">
                    <p className="text-base font-semibold">{proj.title}</p>
                    <p className="mono text-xs text-[color:var(--muted)]">
                      {proj.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-[color:var(--muted)] leading-relaxed mt-2 mb-3">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tech.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {proj.links.frontend && (
                      <a
                        href={proj.links.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-xs text-[color:var(--muted)] hover:text-[color:var(--txt)] underline underline-offset-4"
                      >
                        Frontend
                      </a>
                    )}
                    {proj.links.backend && (
                      <a
                        href={proj.links.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-xs text-[color:var(--muted)] hover:text-[color:var(--txt)] underline underline-offset-4"
                      >
                        Backend
                      </a>
                    )}
                    {proj.links.source && (
                      <a
                        href={proj.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-xs text-[color:var(--muted)] hover:text-[color:var(--txt)] underline underline-offset-4"
                      >
                        Source
                      </a>
                    )}
                    {proj.links.live && (
                      <a
                        href={proj.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-xs text-[color:var(--muted)] hover:text-[color:var(--txt)] underline underline-offset-4"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* 5. Education & 6. Beyond Code Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Section id="education" shouldAnimate={shouldAnimate}>
              <Label>Education</Label>
              <div className="space-y-4">
                {education.map((ed, i) => {
                  const isSchool = ed.stream !== undefined;
                  return (
                    <div
                      key={i}
                      className="relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-4 py-3 overflow-hidden"
                    >
                      {/* Accent stripe */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                        style={{
                          background: isSchool
                            ? "linear-gradient(to bottom, #F59E0B, #FBBF24)"
                            : "linear-gradient(to bottom, var(--accent), #34d399)",
                        }}
                      />
                      <div className="pl-3">
                        {/* Degree badge */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-tight">
                              {ed.institution}
                            </p>
                            <p className="mono text-xs text-[color:var(--muted)] mt-0.5">
                              {ed.degree}
                            </p>
                            {isSchool && (
                              <p className="mono text-[10px] text-[color:var(--muted)] opacity-70">
                                {ed.stream}
                              </p>
                            )}
                          </div>
                          <span className="flex-shrink-0 mono text-[10px] px-2 py-0.5 rounded-full border border-[color:var(--line)] text-[color:var(--muted)] whitespace-nowrap">
                            {ed.period}
                          </span>
                        </div>
                        {/* Score row */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="mono text-[11px] font-semibold text-[color:var(--txt)]">
                            {ed.score}
                          </span>
                          {ed.pr && (
                            <span className="mono text-[10px] text-[color:var(--muted)]">
                              · {ed.pr}
                            </span>
                          )}
                          {ed.highlight && (
                            <span
                              className="inline-flex items-center gap-1 mono text-[9px] px-2 py-0.5 rounded-full font-medium"
                              style={{
                                background: "rgba(245,158,11,0.12)",
                                color: "#F59E0B",
                                border: "1px solid rgba(245,158,11,0.3)",
                              }}
                            >
                              ★ {ed.highlight}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="hobbies" shouldAnimate={shouldAnimate}>
              <Label>Interests</Label>
              <div className="grid grid-cols-2 gap-3">
                {hobbies.map((hobby) => (
                  <div
                    key={hobby}
                    className="mono text-xs px-3 py-2 rounded-xl border border-[color:var(--line)] bg-[color:var(--card-strong)]/50 text-[color:var(--muted)] flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    {hobby}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* 7. Skills */}
          <Section id="skills" shouldAnimate={shouldAnimate}>
            <Label>Skills</Label>
            {(() => {
              const catIconMap = {
                code: Code2,
                brain: Brain,
                chart: BarChart2,
                server: Server,
                layout: Layout,
                database: Database,
                wrench: Wrench,
                cloud: Cloud,
              };
              return (
                <div className="space-y-6">
                  {skillCategories.map(
                    ({ category, icon, skills: catSkills }) => {
                      const CatIcon = catIconMap[icon] || Code2;
                      return (
                        <div key={category}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-md bg-[color:var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                              <CatIcon
                                size={11}
                                className="text-[color:var(--accent)]"
                              />
                            </span>
                            <p className="mono text-[11px] font-semibold text-[color:var(--muted)]">
                              {category}
                            </p>
                            <span className="mono text-[10px] text-[color:var(--muted)] opacity-50">
                              · {catSkills.length}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                            {catSkills.map((s) => (
                              <motion.div
                                key={s}
                                whileHover={{ y: -2 }}
                                className="flex items-center gap-2.5 rounded-xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-3 py-2.5 hover:border-[color:var(--accent)] transition-colors"
                              >
                                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                  {(() => {
                                    const Icon = skillIconMap[s];
                                    return Icon ? (
                                      <Icon
                                        size={14}
                                        className="text-[color:var(--accent)]"
                                      />
                                    ) : (
                                      <CatIcon
                                        size={12}
                                        className="text-[color:var(--accent)] opacity-60"
                                      />
                                    );
                                  })()}
                                </span>
                                <span className="mono text-[11px] text-[color:var(--txt)] leading-tight">
                                  {s}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              );
            })()}
          </Section>

          {/* 8. Achievements */}
          <Section id="achievements" shouldAnimate={shouldAnimate}>
            <Label>Achievements</Label>

            {/* Stat counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {achievements.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] p-4 overflow-hidden text-center"
                >
                  <div
                    className="absolute inset-0 opacity-[0.06] rounded-2xl"
                    style={{ background: `radial-gradient(circle at top left, ${stat.color}, transparent 70%)` }}
                  />
                  <div
                    className="text-2xl md:text-3xl font-bold leading-none mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <p className="mono text-[11px] font-semibold text-[color:var(--txt)] leading-tight">
                    {stat.label}
                  </p>
                  <p className="mono text-[10px] text-[color:var(--muted)] mt-0.5">
                    {stat.sub}
                  </p>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-60"
                    style={{ background: `linear-gradient(to right, transparent, ${stat.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Platform cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {achievements.platforms.map((pl, i) => (
                <motion.a
                  key={i}
                  href={pl.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="group relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] p-3 flex flex-col items-center text-center gap-2 overflow-hidden"
                  style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 28px ${pl.color}28`;
                    e.currentTarget.style.borderColor = `${pl.color}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(circle at center, ${pl.color}0e, transparent 70%)` }}
                  />
                  {/* Initials badge */}
                  <div
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-[11px] tracking-tight flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${pl.color}ee, ${pl.color}88)` }}
                  >
                    {pl.initials}
                  </div>
                  <p className="mono text-[11px] font-semibold text-[color:var(--txt)] leading-none">
                    {pl.name}
                  </p>
                  {pl.rating && (
                    <p className="text-base font-bold leading-none" style={{ color: pl.color }}>
                      {pl.rating}
                    </p>
                  )}
                  <span
                    className="mono text-[9px] px-1.5 py-0.5 rounded-full border font-medium leading-none"
                    style={{ borderColor: `${pl.color}55`, color: pl.color, background: `${pl.color}11` }}
                  >
                    {pl.badge}
                  </span>
                  <p className="mono text-[10px] text-[color:var(--muted)]">
                    {pl.solved}
                    {!pl.rating && ""}
                    {pl.rating ? " solved" : ""}
                  </p>
                  <ExternalLink
                    size={10}
                    className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-40 transition-opacity"
                    style={{ color: pl.color }}
                  />
                </motion.a>
              ))}
            </div>

            {/* GSSoC 2026 Open Source highlight */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="relative rounded-2xl border overflow-hidden mb-4"
              style={{
                borderColor: `${achievements.openSource.color}44`,
                background: `linear-gradient(135deg, ${achievements.openSource.color}08 0%, transparent 50%)`,
              }}
            >
              {/* Glow orb */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ background: achievements.openSource.color }}
              />
              <div className="relative p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Icon badge */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[13px] shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${achievements.openSource.color}, ${achievements.openSource.color}99)` }}
                >
                  GS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-[color:var(--txt)]">
                      {achievements.openSource.program}
                    </p>
                    <span
                      className="mono text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wide"
                      style={{
                        background: `${achievements.openSource.color}22`,
                        color: achievements.openSource.color,
                        border: `1px solid ${achievements.openSource.color}55`,
                      }}
                    >
                      {achievements.openSource.edition}
                    </span>
                    <span className="mono text-[9px] px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                      Open Source
                    </span>
                  </div>
                  <p className="mono text-xs text-[color:var(--muted)] leading-relaxed mb-3">
                    {achievements.openSource.description}
                  </p>
                  {/* Badge pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {achievements.openSource.badges.map((b) => (
                      <span
                        key={b}
                        className="mono text-[9px] px-2 py-0.5 rounded-full border font-medium"
                        style={{
                          borderColor: `${achievements.openSource.color}44`,
                          color: achievements.openSource.color,
                          background: `${achievements.openSource.color}0d`,
                        }}
                      >
                        ★ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contest participation */}
            <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-4 py-3">
              <p className="mono text-[11px] font-semibold text-[color:var(--muted)] mb-2.5 uppercase tracking-widest">
                Contest Participation
              </p>
              <div className="flex flex-wrap gap-2">
                {achievements.contests.map((c) => (
                  <span
                    key={c}
                    className="mono text-[10px] px-3 py-1 rounded-full border border-[color:var(--line)] bg-[color:var(--accent-soft)] text-[color:var(--muted)] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] flex-shrink-0" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Section>

          {/* 9. Certifications */}
          <Section id="certifications" shouldAnimate={shouldAnimate}>
            <Label>Certifications</Label>
            {(() => {
              const grouped = certifications.reduce((acc, cert) => {
                if (!acc[cert.authority]) acc[cert.authority] = [];
                acc[cert.authority].push(cert);
                return acc;
              }, {});
              const authorityColors = {
                IBM: "#0062FF",
                NASA: "#0B3D91",
                LinkedIn: "#0A66C2",
                HackerRank: "#00EA64",
                "Scaler Topics": "#3D5AF1",
                "Code360 (Coding Ninjas)": "#F5761A",
                Coursera: "#0056D2",
                Udemy: "#A435F0",
                "University Workshops": "#10B981",
                LetsUpgrade: "#F59E0B",
              };
              return (
                <div className="space-y-6">
                  {Object.entries(grouped).map(([authority, certs]) => (
                    <div key={authority}>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-md text-white text-[9px] font-bold flex-shrink-0"
                          style={{
                            background: authorityColors[authority] || "#6B7280",
                          }}
                        >
                          {authority.charAt(0)}
                        </span>
                        <div>
                          <p className="mono text-xs font-semibold text-[color:var(--txt)]">
                            {authority}
                          </p>
                          {authority === "LetsUpgrade" && (
                            <p className="mono text-[10px] text-[color:var(--muted)]">
                              LetsUpgrade × NSDC × GDG MAD
                            </p>
                          )}
                        </div>
                        <span className="mono text-[10px] text-[color:var(--muted)] ml-1">
                          · {certs.length} cert{certs.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {certs.map((cert, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -2 }}
                            onClick={() => setPreviewCert(cert)}
                            className="cursor-pointer flex items-start gap-2.5 rounded-xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-3 py-2.5 hover:border-[color:var(--accent)] transition-colors"
                          >
                            <Award
                              size={13}
                              className="mt-0.5 flex-shrink-0"
                              style={{
                                color: authorityColors[authority] || "#6B7280",
                              }}
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-medium leading-snug text-[color:var(--txt)] line-clamp-2">
                                {cert.name}
                              </p>
                              <p className="mono text-[10px] text-[color:var(--muted)] mt-0.5">
                                {cert.year} · Click to view
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Section>

          {/* 9. Badges */}
          <Section id="badges" shouldAnimate={shouldAnimate}>
            <div className="flex items-center justify-between mb-4">
              <Label>Badges</Label>
              <a
                href={personalInfo.socials.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 mono text-[11px] text-[color:var(--muted)] hover:text-[color:var(--accent)] transition-colors group"
              >
                View all on Credly
                <ExternalLink
                  size={11}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Grouped by issuer */}
            {(() => {
              const grouped = badges.reduce((acc, b) => {
                if (!acc[b.issuer]) acc[b.issuer] = [];
                acc[b.issuer].push(b);
                return acc;
              }, {});
              return (
                <div className="space-y-8">
                  {Object.entries(grouped).map(([issuer, issuerBadges]) => (
                    <div key={issuer}>
                      {/* Issuer header */}
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-md text-white text-[9px] font-bold flex-shrink-0"
                          style={{ background: issuerBadges[0].color }}
                        >
                          {issuer.charAt(0)}
                        </span>
                        <p className="mono text-xs font-semibold text-[color:var(--txt)]">
                          {issuer}
                        </p>
                        <span className="mono text-[10px] text-[color:var(--muted)]">
                          · {issuerBadges.length} badge{issuerBadges.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Badge cards grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {issuerBadges.map((badge, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="group relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] overflow-hidden cursor-default"
                            style={{
                              boxShadow: `0 0 0 0 ${badge.color}00`,
                              transition: "box-shadow 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = `0 8px 32px ${badge.color}28, 0 0 0 1px ${badge.color}44`;
                              e.currentTarget.style.borderColor = `${badge.color}66`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = "";
                            }}
                          >
                            {/* Badge image area */}
                            <div
                              className="relative flex items-center justify-center p-5 pb-3"
                              style={{
                                background: `radial-gradient(circle at center, ${badge.color}14, ${badge.color}04 70%)`,
                              }}
                            >
                              <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background: `radial-gradient(circle at center, ${badge.color}1a, transparent 70%)`,
                                }}
                              />
                              <img
                                src={badge.image}
                                alt={badge.name}
                                className="relative w-20 h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>

                            {/* Badge info */}
                            <div className="px-3 pb-3 pt-1 border-t border-[color:var(--line)]">
                              <p className="text-[11px] font-semibold text-[color:var(--txt)] leading-snug line-clamp-2">
                                {badge.name}
                              </p>
                              <div className="flex items-center justify-between mt-1.5">
                                <p className="mono text-[10px] text-[color:var(--muted)]">
                                  {badge.issuer}
                                </p>
                                <span
                                  className="mono text-[9px] px-1.5 py-0.5 rounded-full border font-medium"
                                  style={{
                                    borderColor: `${badge.color}66`,
                                    color: badge.color,
                                    background: `${badge.color}11`,
                                  }}
                                >
                                  {badge.year}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Section>

          {/* Certificate Preview Modal */}
          {previewCert && (
            <div
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setPreviewCert(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-[color:var(--card-strong)] rounded-2xl border border-[color:var(--line)] shadow-2xl max-w-3xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--line)]">
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--txt)]">
                      {previewCert.name}
                    </p>
                    <p className="mono text-[10px] text-[color:var(--muted)]">
                      {previewCert.authority} · {previewCert.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setPreviewCert(null)}
                    className="w-8 h-8 rounded-full border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--txt)] hover:bg-[color:var(--accent-soft)] transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <img
                    src={previewCert.image}
                    alt={previewCert.name}
                    className="w-full rounded-xl object-contain max-h-[65vh]"
                  />
                </div>
              </motion.div>
            </div>
          )}

          <TechMarquee />

          {/* Footer */}
          <footer className="pt-4 pb-4">
            <p className="mono text-xs text-[color:var(--muted)]">
              © {new Date().getFullYear()} Vatsal Gajera
            </p>
          </footer>
        </main>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 right-5 z-50 select-none"
        >
          <button
            type="button"
            className="pixel-cat-root"
            onClick={handleCatTap}
            onMouseEnter={() => {
              if (catState === "clicked") return;
              setCatState("hover-1"); // image_3
              setTimeout(() => {
                setCatState((prev) => (prev === "hover-1" ? "hover-2" : prev)); // image_2
              }, 150);
            }}
            onMouseLeave={() => {
              if (catState !== "clicked") {
                setCatState("idle");
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCatTap();
              }
            }}
            aria-label="Interactive cat"
          >
            {catState === "idle" && (
              <div className="pixel-cat-zz">
                <span className="pixel-cat-z1">z</span>
                <span className="pixel-cat-z2">z</span>
                <span className="pixel-cat-z3">z</span>
              </div>
            )}
            <div className="pixel-cat-img-wrap">
              <img
                src="/images/image_1.png"
                alt=""
                style={{ opacity: catState === "idle" ? 1 : 0 }}
              />
              <img
                src="/images/image_3.png"
                alt=""
                style={{ opacity: catState === "hover-1" ? 1 : 0 }}
              />
              <img
                src="/images/image_2.png"
                alt=""
                style={{ opacity: catState === "hover-2" ? 1 : 0 }}
              />
              <img
                src="/images/image_4.png"
                alt=""
                style={{ opacity: catState === "clicked" ? 1 : 0 }}
              />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
