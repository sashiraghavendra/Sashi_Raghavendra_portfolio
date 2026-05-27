import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowDown, Mail, Github, Linkedin, ArrowRight, Download, 
  Camera, Upload, Link, Trash2, X 
} from "lucide-react";
import { resumeData } from "../../data/resume";
import { exportResumePDF } from "../../utils/pdfExport";

export default function Hero() {
  const [skillIndex, setSkillIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Load custom image from localStorage, or fall back to default github image URL
  const [profileImg, setProfileImg] = useState<string | null>(() => {
    return localStorage.getItem("sashi_portfolio_profile_img") || "https://github.com/sashiraghavendra.png";
  });

  // Modal interaction states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Sashi's skills extracted from data
  const skillList = resumeData.skills.programmingLanguages.concat(
    resumeData.skills.toolsAndPlatforms
  ).slice(0, 5);

  if (skillList.length === 0) {
    skillList.push("Java Developer", "SQL Professional", "Full-Stack Trainee", "Software Engineer");
  }

  const typingSpeed = 100;
  const deletingSpeed = 60;
  const wordDelay = 1800;

  // Typing animation core loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = skillList[skillIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), wordDelay);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setSkillIndex((prev) => (prev + 1) % skillList.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, skillIndex, skillList]);

  // Profile picture fallback detector - only runs if NO custom image is saved in localStorage
  useEffect(() => {
    if (localStorage.getItem("sashi_portfolio_profile_img")) return;

    const possiblePaths = [
      "/profile.png",
      "/profile.jpg",
      "/profile.jpeg",
      "/sashi_avatar.png",
      "/sashi_avatar.jpg",
      "/avatar.jpg"
    ];

    const checkPaths = async () => {
      for (const path of possiblePaths) {
        try {
          const res = await fetch(path, { method: "HEAD" });
          if (res.ok) {
            setProfileImg(path);
            break;
          }
        } catch (err) {
          // skip
        }
      }
    };
    checkPaths();
  }, []);

  const handleDownloadPDF = () => {
    exportResumePDF(resumeData);
  };

  // Image Upload and Customizers
  const handleSaveUrl = () => {
    if (!imageUrlInput.trim()) return;
    if (!imageUrlInput.startsWith("http://") && !imageUrlInput.startsWith("https://") && !imageUrlInput.startsWith("data:")) {
      setUploadError("Please enter a valid URL starting with http/https or Data URI.");
      return;
    }
    setProfileImg(imageUrlInput);
    localStorage.setItem("sashi_portfolio_profile_img", imageUrlInput);
    setImageUrlInput("");
    setIsModalOpen(false);
    setUploadError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("File must be an image (PNG, JPG, JPEG, GIF, etc.)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
      setUploadError("Max file size allowed is 2MB to ensure clean lightning-fast local storage.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setProfileImg(event.target.result);
        localStorage.setItem("sashi_portfolio_profile_img", event.target.result);
        setIsModalOpen(false);
        setUploadError("");
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleResetImage = () => {
    localStorage.removeItem("sashi_portfolio_profile_img");
    setProfileImg("https://github.com/sashiraghavendra.png");
    setImageUrlInput("");
    setIsModalOpen(false);
    setUploadError("");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side Column: Copy & Presentation */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-medium text-4.5xl sm:text-5.5xl md:text-6xl tracking-tight text-white leading-[1.05]"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-purple drop-shadow-sm font-extrabold block mt-2">
              {resumeData.personalInfo.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-8 flex items-center"
          >
            <p className="font-mono text-base sm:text-lg text-gray-300">
              Proficient in <span className="text-brand-cyan font-semibold text-glow">{typedText}</span>
              <span className="inline-block w-1.5 h-4.5 ml-1 bg-brand-cyan animate-pulse" />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-400 text-sm sm:text-base max-w-xl font-sans font-light leading-relaxed"
          >
            {resumeData.personalInfo.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full pt-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-black bg-brand-cyan border border-brand-cyan hover:bg-transparent hover:text-brand-cyan transition-all duration-300 shadow-md cursor-pointer clickable"
            >
              <span>View Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-gray-300 border border-white/10 hover:border-brand-purple hover:text-white hover:bg-brand-purple/10 transition-all duration-300 cursor-pointer clickable"
            >
              <span>Contact</span>
              <Mail size={14} />
            </a>
            
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-brand-purple border border-brand-purple/20 hover:border-brand-purple hover:bg-brand-purple/10 transition-all duration-300 cursor-pointer clickable"
            >
              <span>Download PDF</span>
              <Download size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 pt-4 text-gray-450"
          >
            <p className="text-xs font-mono tracking-widest text-gray-600 uppercase">Connect</p>
            <div className="w-8 h-[1px] bg-white/15" />
            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
              title="GitHub Profile"
            >
              <Github size={17} />
            </a>
            <a
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
              title="Send Mail"
            >
              <Mail size={17} />
            </a>
          </motion.div>
        </div>

        {/* Right Side Column: Clean visual avatar profile */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center p-1 bg-slate-950/20 backdrop-blur-md rounded-full border-2 border-brand-cyan/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] overflow-hidden group hover:border-brand-cyan/80 hover:shadow-[0_0_50px_rgba(6,182,212,0.45)] transition-all duration-500"
          >
            {/* Hover overlay for changing profile picture */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="absolute inset-x-0 bottom-0 top-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-20 cursor-pointer select-none clickable"
            >
              <div className="p-3 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan animate-pulse">
                <Camera size={20} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white font-medium text-center px-4">Change Profile Picture</span>
            </div>

            {/* Profile image with safe checks, or premium fallback avatar initials */}
            {profileImg ? (
              <img
                src={profileImg}
                alt={resumeData.personalInfo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover border border-brand-cyan/20 select-none shadow-[0_0_20px_rgba(6,182,212,0.15)] z-10 p-0.5 bg-slate-900 group-hover:scale-105 group-hover:border-brand-cyan/50 transition-transform duration-500"
              />
            ) : (
              <div className="relative z-10 w-full h-full glass-pane border border-white/5 rounded-full flex flex-col items-center justify-center p-6 select-none bg-gradient-to-br from-brand-cyan/5 via-brand-purple/5 to-transparent">
                <span className="font-display font-medium text-5xl sm:text-6xl text-white tracking-tight">
                  DS
                </span>
                <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase mt-3 text-center">
                  Java & SQL Tech
                </span>
                <span className="text-[9px] font-mono tracking-widest text-gray-500 mt-1">
                  CGPA: 8.19
                </span>
              </div>
            )}
          </motion.div>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200">
        <span className="text-[9px] font-mono tracking-widest uppercase text-gray-600">Scroll Down</span>
        <a href="#about" className="animate-bounce p-1 bg-white/5 border border-white/10 rounded-full hover:border-brand-cyan transition-colors clickable">
          <ArrowDown size={13} className="text-brand-cyan" />
        </a>
      </div>

      {/* Customize Profile Photo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Glassmorphic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden z-20"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <h3 className="font-display font-semibold text-lg text-white tracking-tight flex items-center gap-2">
                  <Camera size={18} className="text-brand-cyan" />
                  Customize Profile Photo
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors clickable"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Error Message */}
              {uploadError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/20 text-red-400 border border-red-500/10 text-xs font-mono">
                  {uploadError}
                </div>
              )}

              <div className="space-y-5">
                {/* Drag-and-Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl h-36 flex flex-col justify-center items-center p-4 text-center transition-all duration-300 relative group cursor-pointer ${
                    dragActive 
                      ? "border-brand-cyan bg-brand-cyan/5 scale-[0.99]" 
                      : "border-white/10 bg-slate-950/40 hover:border-brand-cyan/50 hover:bg-slate-950/60"
                  }`}
                >
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="p-2.5 rounded-full bg-white/5 text-gray-400 group-hover:text-brand-cyan group-hover:bg-brand-cyan/5 transition-colors mb-2">
                    <Upload size={18} />
                  </div>
                  <p className="text-xs font-medium text-white">
                    Drag and drop your image, or <span className="text-brand-cyan underline decoration-brand-cyan/30 group-hover:decoration-brand-cyan">browse</span>
                  </p>
                  <p className="text-[10px] text-gray-550 font-mono mt-1">Supports PNG, JPG (Max 2MB)</p>
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-gray-600">
                  <div className="h-[1px] bg-white/5 flex-grow" />
                  <span>Or Paste Link</span>
                  <div className="h-[1px] bg-white/5 flex-grow" />
                </div>

                {/* Image URL container */}
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                      <Link size={14} />
                    </div>
                    <input
                      type="url"
                      placeholder="Paste https://... web image link"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 pl-9 pr-20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/60 transition-colors"
                    />
                    <button
                      onClick={handleSaveUrl}
                      disabled={!imageUrlInput.trim()}
                      className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-brand-cyan hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 text-[10px] font-mono font-medium tracking-wider uppercase text-black transition-all"
                    >
                      Attach
                    </button>
                  </div>
                </div>

                {/* Reset Option */}
                <div className="pt-2 border-t border-white/5 flex gap-2">
                  <button
                    onClick={handleResetImage}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-slate-950 hover:bg-red-950/20 text-red-400 hover:text-red-300 border border-white/5 hover:border-red-500/15 transition-all font-mono text-[10px] uppercase tracking-wider clickable"
                  >
                    <Trash2 size={13} />
                    Reset to Default
                  </button>
                  
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all font-mono text-[10px] uppercase tracking-wider clickable"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
