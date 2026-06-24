import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiOpenjdk,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiGit,
  SiPostman,
} from "react-icons/si";

const skills = [
  { name: "Python", icon: SiPython },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Java", icon: SiOpenjdk },
  { name: "React.js", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "NumPy", icon: SiNumpy },
  { name: "Pandas", icon: SiPandas },
  { name: "Scikit-learn", icon: SiScikitlearn },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Git", icon: SiGit },
  { name: "Postman", icon: SiPostman },
];

export default function TechMarquee() {
  // Duplicate skills to ensure seamless looping
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-[color:var(--bg-0)]/50 border-y border-[color:var(--line)] tech-marquee-container">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--bg-0)] to-transparent z-10 fade-left" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[color:var(--bg-0)] to-transparent z-10 fade-right" />

      <motion.div
        className="flex items-center gap-12 w-fit whitespace-nowrap marquee-track"
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className="flex items-center gap-3 group px-4">
            <div className="w-10 h-10 rounded-xl bg-[color:var(--card-strong)] border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)] transition-all duration-300">
              {skill.icon && <skill.icon size={20} />}
            </div>
            <span className="mono text-xs font-medium text-[color:var(--muted)] group-hover:text-[color:var(--txt)] transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
