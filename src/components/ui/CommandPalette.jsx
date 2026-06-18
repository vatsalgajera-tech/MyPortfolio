import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, Briefcase, Code, Mail, ArrowRight, Github, Linkedin, Monitor, Terminal } from 'lucide-react'

const commands = [
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience' },
  { id: 'projects', label: 'Projects', icon: Code, href: '#projects' },
  { id: 'skills', label: 'Skills', icon: Monitor, href: '#skills' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  { id: 'github', label: 'GitHub Profile', icon: Github, href: 'https://github.com/vatsalgajera-tech', external: true },
  { id: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, href: 'https://www.linkedin.com/in/vatsalgajera/', external: true },
]

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    const handleOpenEvent = () => setIsOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleOpenEvent)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleOpenEvent)
    }
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const onSelect = (cmd) => {
    if (cmd.external) {
      window.open(cmd.href, '_blank')
    } else {
      window.location.hash = cmd.href
    }
    close()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault()
      onSelect(filteredCommands[selectedIndex])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-lg overflow-hidden glass-card rounded-2xl shadow-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)]"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[color:var(--line)]">
                <Search size={18} className="text-[color:var(--muted)]" />
                <input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none outline-none text-sm font-medium text-[color:var(--txt)] placeholder-[color:var(--muted)]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <kbd className="mono text-[10px] px-1.5 py-0.5 rounded border border-[color:var(--line)] text-[color:var(--muted)] bg-[color:var(--bg-0)]">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => (
                    <button
                      key={cmd.id}
                      onClick={() => onSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                        selectedIndex === idx 
                        ? 'bg-[color:var(--accent-soft)] text-[color:var(--txt)]' 
                        : 'text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--txt)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <cmd.icon size={16} />
                        <span className="text-sm font-medium">{cmd.label}</span>
                      </div>
                      {selectedIndex === idx && (
                        <ArrowRight size={14} className="text-[color:var(--accent)]" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-[color:var(--muted)]">No results found.</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-[color:var(--bg-0)] border-t border-[color:var(--line)]">
                <p className="mono text-[10px] text-[color:var(--muted)]">
                  Navigate with arrows, Enter to select
                </p>
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-[color:var(--muted)]" />
                  <span className="mono text-[10px] text-[color:var(--muted)]">Command Palette</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
