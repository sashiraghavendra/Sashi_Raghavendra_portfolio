import { Github, ExternalLink, Server } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Projects() {
  const proj = {
    title: resumeData.projects[0].title,
    role: "Academic Full-Stack Architect",
    description: resumeData.projects[0].description,
    achievements: resumeData.projects[0].achievements,
    technologies: resumeData.projects[0].technologies,
    githubUrl: resumeData.projects[0].githubUrl,
    liveUrl: resumeData.projects[0].liveUrl
  };

  return (
    <section id="projects" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      {/* Glow highlight background */}
      <div className="absolute top-1/4 right-5 w-[250px] h-[250px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Engineering <span className="font-bold text-brand-cyan">Projects</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full mt-2" />
        </div>

        {/* Project Centered Showcase */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-pane border border-white/5 hover:border-brand-cyan/30 bg-slate-950/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 group transition-all duration-300">
            <div className="space-y-4">
              
              {/* Title */}
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">
                {proj.title}
              </h3>

              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {proj.description}
              </p>

              {/* Bullet Achievements from resume */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest font-medium">Core Achievements:</p>
                <ul className="space-y-2">
                  {proj.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-gray-400 leading-normal">
                      <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-brand-cyan" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies tags */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {proj.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-950/60 border border-white/5 text-[10px] font-mono text-gray-300 hover:border-gray-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Git actions / footer container */}
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium tracking-widest text-gray-500 uppercase flex items-center gap-1">
                <Server size={10} />
                {proj.role}
              </span>

              <div className="flex items-center gap-3">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-brand-cyan transition-all duration-200 clickable"
                    title="View GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-brand-purple transition-all duration-200 clickable"
                    title="Open Live Deployment"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
