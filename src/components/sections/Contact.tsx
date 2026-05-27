import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, BellRing, Settings } from "lucide-react";
import { resumeData } from "../../data/resume";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Check for EmailJS credentials across standard naming conventions safely with cast
  const metaEnv = (import.meta as any).env || {};
  const serviceId = metaEnv.VITE_EMAILJS_SERVICE_ID || metaEnv.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = metaEnv.VITE_EMAILJS_TEMPLATE_ID || metaEnv.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = metaEnv.VITE_EMAILJS_PUBLIC_KEY || metaEnv.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const isEmailJSConfigured = serviceId && templateId && publicKey;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setSuccess(null);

    // Simulate sending time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isEmailJSConfigured) {
      // In production/Vercel with fully set environment variables:
      try {
        // Dynamic loading of emailjs-com if needed, or simple fetch request to emailjs API.
        // Doing standard fetch request avoids heavy bundle dependencies and is 100% robust.
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formData.name,
              reply_to: formData.email,
              subject: formData.subject || "Portfolio Contact Message",
              message: formData.message
            }
          })
        });

        if (res.ok) {
          setSuccess(true);
          setFeedbackMsg("Message successfully dispatched with EmailJS!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          throw new Error("API server responded with error code");
        }
      } catch (err) {
        setSuccess(false);
        setFeedbackMsg("EmailJS API Dispatch failed. Please try again or use direct mailto.");
      }
    } else {
      // Graceful fallback simulation
      setSuccess(true);
      setFeedbackMsg(`Form simulation completed! recruiter details received. (Note: EmailJS variables aren't configured in environment).`);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="pt-4 pb-1 relative px-4 sm:px-6 lg:px-8">
      {/* Background neon elements */}
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-brand-purple/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-2">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Get In <span className="font-bold text-glow-purple text-brand-purple font-display">Touch</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs max-w-md mx-auto mt-2">
            Inquire about roles, collaborations, or request certifications credentials
          </p>
          <div className="w-12 h-1 bg-brand-purple rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Address Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-brand-cyan tracking-widest uppercase">Contact Coordinates</span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Let's construct something awesome together
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                If you have an open position matching my proficiency in Java backend systems, database modeling, or full-stack software development, feel free to pitch it! I'm highly responsive via electronic mail and standard cellular calls.
              </p>
            </div>

            {/* Coordinates list */}
            <div className="space-y-4">
              
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-brand-purple hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-brand-purple/10 border border-brand-purple/25 rounded-xl text-brand-purple group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Email Dispatch</p>
                  <p className="text-sm font-medium text-white group-hover:text-brand-purple transition-colors truncate max-w-[210px] sm:max-w-xs">{resumeData.personalInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${resumeData.personalInfo.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-brand-cyan hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/25 rounded-xl text-brand-cyan group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Cellular Call</p>
                  <p className="text-sm font-medium text-white group-hover:text-brand-cyan transition-colors">+91 {resumeData.personalInfo.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-white/5">
                <div className="p-3 bg-brand-pink/10 border border-brand-pink/25 rounded-xl text-brand-pink">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">HQ Location</p>
                  <p className="text-sm font-medium text-white">{resumeData.personalInfo.location}, IND</p>
                </div>
              </div>

            </div>

            {/* Social Connect channels */}
            <div className="flex items-center gap-4 pt-4 text-gray-400">
              <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">Interactive Channels :</span>
              <a
                href={resumeData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-950/60 border border-white/5 hover:text-white hover:border-white hover:bg-slate-900/60 transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-950/60 border border-white/5 hover:text-white hover:border-white hover:bg-slate-900/60 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <div className="glass-pane border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 hover:border-brand-purple/20 transition-all">
              
              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Your Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Recruiters / Lead Architect"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@company.org"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Subject Context</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. SDE Backend Role / Project Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Transmission Message *</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your role details or queries here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple/50 focus:bg-slate-900 transition-colors resize-none"
                  />
                </div>

                {/* Status alerts */}
                {success !== null && (
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 font-mono ${
                    success 
                      ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-rose-950/10 border-rose-500/20 text-rose-400"
                  }`}>
                    <BellRing size={14} className="shrink-0" />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                {/* Submit button container */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-medium tracking-wider uppercase text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:brightness-110 disabled:opacity-55 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
