import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Terminal, Search, Menu, X } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 pt-4 sm:pt-7">
      <div className="max-w-6xl mx-auto glass-card px-3 sm:px-5 py-2.5 sm:py-3 backdrop-blur-md bg-[color:var(--card)]/90">
        {/* Main Bar */}
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

            {/* CLI/CMD buttons — desktop only */}
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

            {/* Hamburger — mobile only */}
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

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-3 pb-1 border-t border-[color:var(--line)] mt-2.5">
                <div className="grid grid-cols-2 gap-1.5">
                  {sections.map((section) => (
                    <a
                      key={section.label}
                      href={section.href}
                      onClick={handleNavClick}
                      className="mono text-[11px] px-3 py-2 rounded-xl border border-[color:var(--line)] text-[color:var(--muted)] hover:text-[color:var(--txt)] hover:bg-[color:var(--accent-soft)] hover:border-[color:var(--accent)] transition text-center"
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
                {/* CLI/CMD in mobile menu */}
                <div className="flex gap-2 mt-2.5 pt-2.5 border-t border-[color:var(--line)]">
                  <button
                    onClick={() => {
                      openTerminal();
                      setMenuOpen(false);
                    }}
                    className="flex-1 mono text-[10px] px-3 py-2 rounded-xl bg-[color:var(--accent-soft)] text-[color:var(--muted)] hover:text-[color:var(--txt)] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Terminal size={12} />
                    Terminal
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="flex-1 mono text-[10px] px-3 py-2 rounded-xl border border-[color:var(--line)] text-[color:var(--muted)] hover:text-[color:var(--txt)] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Search size={12} />
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
