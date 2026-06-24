import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Terminal, Menu, X } from "lucide-react";

export default function Navbar({ isDark, toggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

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

  const openTerminal = () =>
    window.dispatchEvent(new CustomEvent("open-terminal"));

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-5">
      {/* Navbar pill */}
      <div className="max-w-6xl mx-auto">
        {/* Top bar — always visible */}
        <div className="glass-card px-3 sm:px-5 py-2.5 backdrop-blur-md bg-[color:var(--card)]/90">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Logo + Desktop Nav */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <a
                href="#top"
                className="flex-shrink-0 w-8 h-8 rounded-xl bg-[color:var(--txt)] text-[color:var(--bg-0)] flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform"
              >
                VG
              </a>

              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {sections.map((section) => (
                  <a
                    key={section.label}
                    href={section.href}
                    className="mono text-[11px] px-2.5 py-1.5 rounded-full border border-transparent text-[color:var(--muted)] hover:text-[color:var(--txt)] hover:border-[color:var(--line)] hover:bg-[color:var(--accent-soft)] transition whitespace-nowrap"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

              {/* CLI button — desktop only */}
              <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[color:var(--line)]">
                <button
                  onClick={openTerminal}
                  className="mono text-[10px] px-2 py-1 rounded bg-[color:var(--accent-soft)] text-[color:var(--muted)] hover:text-[color:var(--txt)] transition-colors flex items-center gap-1.5"
                >
                  <Terminal size={12} />
                  CLI
                </button>
              </div>
            </div>

            {/* Right: Theme toggle + Hamburger */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--txt)] hover:bg-[color:var(--accent-soft)] transition"
                aria-label="Toggle theme"
                data-theme-toggle="true"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </motion.button>

              {/* Hamburger — mobile/tablet only */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] hover:text-[color:var(--txt)] hover:bg-[color:var(--accent-soft)] transition"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={14} /> : <Menu size={14} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown — separate card below top bar */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="lg:hidden mt-2 glass-card px-3 py-3 backdrop-blur-md bg-[color:var(--card)]/95"
            >
              {/* Nav grid — 3 cols so 9 items = 3×3 perfect */}
              <div className="grid grid-cols-3 gap-1.5">
                {sections.map((section) => (
                  <a
                    key={section.label}
                    href={section.href}
                    onClick={handleNavClick}
                    className="mono text-[11px] px-2 py-2.5 rounded-xl border border-[color:var(--line)] text-[color:var(--muted)] hover:text-[color:var(--txt)] hover:bg-[color:var(--accent-soft)] hover:border-[color:var(--accent)] transition text-center leading-tight"
                  >
                    {section.label}
                  </a>
                ))}
              </div>

              {/* Terminal button */}
              <div className="mt-2 pt-2 border-t border-[color:var(--line)]">
                <button
                  onClick={() => {
                    openTerminal();
                    setMenuOpen(false);
                  }}
                  className="w-full mono text-[10px] px-3 py-2 rounded-xl bg-[color:var(--accent-soft)] text-[color:var(--muted)] hover:text-[color:var(--txt)] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Terminal size={12} />
                  Open Terminal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
