import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Desha Sashi Raghavendra Kumar",
    phone: "6302155895",
    email: "sashiraghavendra789@gmail.com",
    github: "https://github.com/sashiraghavendra",
    linkedin: "https://linkedin.com/in/sashiraghavendra",
    location: "Nandyal, Andhra Pradesh",
    summary: "Computer Science and Engineering graduate with strong knowledge of Java, SQL, HTML, and CSS. Passionate about problem solving and developing efficient software applications. Seeking opportunities to apply technical skills, contribute to real-world projects, and grow as a software developer."
  },
  education: [
    {
      institution: "Kalasalingam Academy of Research and Education",
      location: "Tamilnadu",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      startDate: "2022",
      endDate: "2026",
      metric: "CGPA: 8.19"
    }
  ],
  skills: {
    programmingLanguages: ["Java", "SQL", "HTML", "CSS"],
    toolsAndPlatforms: ["Git", "Eclipse", "VS Code"],
    softSkills: ["Teamwork", "Communication", "Problem Solving"]
  },
  internships: [
    {
      role: "Intern",
      company: "Infosys Springboard Internship 6.0",
      startDate: "Nov 2025",
      endDate: "Jan 2026",
      projectTitle: "Cryptocurrency Portfolio Management System with Real-Time Risk and Scam Detection",
      achievements: [
        "Developed a backend-focused cryptocurrency portfolio management system using Spring Boot and MySQL.",
        "Implemented REST APIs for user authentication, portfolio tracking, holdings management, and trade history.",
        "Integrated CoinGecko, Binance, and CryptoScamDB APIs for live market tracking and scam detection.",
        "Added profit/loss analysis, risk alerts, notifications, and CSV export for tax-friendly reporting."
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "REST APIs", "Postman"],
      certificateUrl: "#certificate"
    }
  ],
  projects: [
    {
      title: "University ERP Portal",
      description: "A university ERP web application to streamline college operations such as admissions, fee management, hostel room allotments, student portals, and notice boards.",
      achievements: [
        "Built a university ERP web app for admissions, fee payments, hostel booking, and notices.",
        "Developed student and admin modules for login, approval, profiles, and records.",
        "Created MySQL tables to manage students, courses, fees, payments, and hostel rooms.",
        "Designed responsive dashboard pages for students and admins using HTML and CSS."
      ],
      technologies: ["Java", "MySQL", "HTML", "CSS"],
      githubUrl: "https://github.com/sashiraghavendra",
      liveUrl: "https://kl-university-portal.onrender.com/"
    }
  ],
  certifications: [
    {
      title: "Introduction to Java",
      issuer: "Coursera (offered by LearnQuest)",
      issueDate: "Jun 2025",
      verificationUrl: "https://coursera.org"
    },
    {
      title: "SQL Fundamentals",
      issuer: "IBM SkillsBuild",
      issueDate: "Jul 2025",
      verificationUrl: "https://skillsbuild.org"
    },
    {
      title: "Introduction to Git and GitHub",
      issuer: "Coursera (offered by Google)",
      issueDate: "Jul 2025",
      verificationUrl: "https://coursera.org"
    }
  ]
};
