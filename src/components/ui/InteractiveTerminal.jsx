import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

const commands = {
  help: "Available commands: about, experience, projects, skills, certifications, badges, achievements, contact, hobbies, clear, exit",
  about:
    "Vatsal Gajera — MCA @ Dharmsinh Desai University (CGPA 8.07) | Python Developer | Full Stack Developer | Data Science Enthusiast | Rajkot, Gujarat.",
  experience:
    "1. Data Science Intern @ Zidio Development (Remote, 2 months) — Python, Pandas, NumPy, ML.\n2. Python Dev Intern @ Infotact Solutions (Remote, 2 months) — Django, MySQL, REST APIs.\n3. Web Dev Intern @ Creative Insight IT Academy (On-site, 1 month) — HTML, CSS, JS, Tailwind, MySQL.",
  projects:
    "1. COVID-19 Analytics Dashboard (Python, Pandas, Seaborn)\n2. Parking Management System (Console-Based Java)\n3. VendorBridge AI — AI-Powered Procurement ERP (MERN, Odoo x KSV Hackathon)\n4. Nexus University — Academic Platform (MERN, live: nexusuniversity.vercel.app)\n5. Shree Vastra — E-Commerce (MERN, Razorpay)",
  skills:
    "Languages: Python, SQL, Java, JavaScript, HTML5, CSS3\nData Science: NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, TensorFlow, OpenCV\nBI: Power BI, Tableau\nBackend: FastAPI, Node.js, Express.js\nFrontend: React, Tailwind CSS, Vite\nDatabases: PostgreSQL, MySQL, MongoDB\nTools: Git, GitHub, Postman, Jupyter Notebook, VS Code\nCloud: Azure, Vercel",
  achievements:
    "1450+ problems solved across all platforms.\nCodeChef: 1783 rating (3★) — 698+ solved.\nLeetCode: 1460 rating — 210+ solved.\nCodeforces: 1186 rating — 115+ solved.\nHackerRank: 5★ — Python, Java, SQL.\nGeeksforGeeks: 151+ problems.\nCode360: 428+ submissions.\nGSSoC 2026 Open Source Contributor.\nOdoo x KSV Hackathon 2026 participant.",
  certifications:
    "IBM (5): ML Essentials, DS Methodology, DS Tools, DS 101, Python 101.\nNASA (2): Open Science Essentials, Open Science 101.\nLinkedIn (2): Microsoft Azure Essentials, GitHub Career Essentials.\nHackerRank (8): SQL Advanced/Intermediate/Basic, Python Basic, Problem Solving Int/Basic, Java Basic, CSS Basic.\nScaler Topics (5): DS Fundamentals, Python & SQL for DS, Python Skill Test, Python Course, SQL Course.\nCode360 (5): ML Fundamentals, AI Fundamentals, OOPs in Python, Python Basics I & II.\nCoursera (4): Python, Excel, Google Ads, WordPress.\nUdemy (6): SQL, Python Dev, Python Full Stack, Django REST, HTML/CSS/JS/React, SQL Programming.\nUniversity Workshops (2): C Programming, Software Testing.\nLetsUpgrade (1): Zero to Python Hero.",
  badges:
    "IBM Skills Network (5): ML Essentials, DS Methodologies, DS Tools, DS 101, Python for DS.\nNASA (2): Open Science Essentials, Open Science 101.\nGSSoC 2026 (7): First Steps, Profile Complete, Discord Verified, Point Scorer, Role Contributor, Bounty Hunter, Bounty Master.\nLeetCode (4): 50 Days Badge, Introduction to Pandas, Quest for Data, Top SQL 50.",
  hobbies:
    "Problem Solving, Competitive Programming, Data Science, Open Source, Hackathons, Music, Travel.",
  contact:
    "Email: vatsalgajera.tech@gmail.com | Phone: +91 9723140922 | LinkedIn: linkedin.com/in/vatsalgajera | GitHub: github.com/vatsalgajera-tech",
  clear: "CLEAR",
};

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState([
    'Welcome to Vatsal\'s Terminal. Type "help" to see available commands.',
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener("open-terminal", handleOpen);
    return () => window.removeEventListener("open-terminal", handleOpen);
  }, []);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.toLowerCase().trim();
      if (cmd === "exit") {
        setIsOpen(false);
        setInput("");
        return;
      }
      if (cmd === "clear") {
        setHistory([]);
      } else if (commands[cmd]) {
        const lines = commands[cmd].split("\n");
        setHistory((prev) => [...prev, `> ${input}`, ...lines]);
      } else if (cmd !== "") {
        setHistory((prev) => [
          ...prev,
          `> ${input}`,
          `Command not found: ${cmd}. Type "help" for list of commands.`,
        ]);
      }
      setInput("");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-36 right-5 z-[55] w-[90vw] max-w-md bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/10 ${isMinimized ? "h-10" : "h-[400px]"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2a2a2a] border-b border-white/5 cursor-move">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-500" />
                <span className="mono text-xs font-medium text-stone-300">
                  vatsal-terminal — zsh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/5 rounded"
                >
                  {isMinimized ? (
                    <Maximize2 size={12} className="text-stone-400" />
                  ) : (
                    <Minimize2 size={12} className="text-stone-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-red-500/20 rounded group"
                >
                  <X
                    size={12}
                    className="text-stone-400 group-hover:text-red-500"
                  />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="flex flex-col h-[calc(400px-40px)] p-4 font-mono text-sm">
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto space-y-2 scrollbar-hide text-stone-300"
                >
                  {history.map((line, i) => (
                    <p
                      key={i}
                      className={line.startsWith(">") ? "text-emerald-400" : ""}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-stone-400">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-purple-400">~</span>
                  <input
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-emerald-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
