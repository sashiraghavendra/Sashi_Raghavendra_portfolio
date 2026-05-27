import { Code2, Laptop, Sparkles } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code2 size={16} className="text-brand-cyan" />,
      glowColor: "cyan",
      skills: resumeData.skills.programmingLanguages,
      description: "Primary languages used for writing object-oriented backends, queries, and responsive structures."
    },
    {
      title: "Tools & Platforms",
      icon: <Laptop size={16} className="text-brand-pink" />,
      glowColor: "pink",
      skills: [...resumeData.skills.toolsAndPlatforms, "Postman"], // Combined standard and Postman from internship
      description: "Development environments, API clients, and code version control environments."
    },
    {
      title: "Soft Skills & Methods",
      icon: <Sparkles size={16} className="text-brand-cyan" />,
      glowColor: "cyan",
      skills: resumeData.skills.softSkills,
      description: "Professional workplace soft skills that ensure smooth, reliable project collaborations."
    }
  ];

  return (
    <section id="skills" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-[200px] h-[200px] bg-brand-pink/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Technical <span className="font-bold text-brand-cyan">Skills</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs max-w-md mx-auto mt-2">
            Verified skills compiled from academic records and project milestones
          </p>
          <div className="w-12 h-0.5 bg-brand-cyan/40 rounded-full mt-2" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const glowBorder = 
              cat.glowColor === "cyan" 
                ? "hover:border-brand-cyan/30" 
                : cat.glowColor === "purple"
                ? "hover:border-brand-purple/30"
                : "hover:border-brand-pink/30";

            return (
              <div
                key={idx}
                className={`glass-pane border border-white/5 bg-slate-950/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-305 ${glowBorder}`}
              >
                <div className="space-y-4">
                  {/* Category Title Card */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                      {cat.icon}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-gray-450 font-light text-xs leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skills Grid inside Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-950/30 border border-white/5 hover:border-white/10 hover:bg-slate-900/40 transition-colors text-left"
                      >
                        <span className="text-xs font-mono text-gray-200 font-medium">{skill}</span>
                        <span className="text-[9px] font-mono tracking-wider font-semibold text-brand-cyan/50 uppercase">Verified</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/5 text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                  <span>Stack Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
