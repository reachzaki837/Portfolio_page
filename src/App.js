import { useState, useRef, useEffect } from "react";

const ME = {
  name: "Mohammed Zaki S",
  title: "B.E. Mechatronics | Cloud • DevOps • AI Engineer",
  tagline: "Building intelligent, scalable systems at the intersection of Cloud, DevOps & Artificial Intelligence.",
  bio: "Pre-final year B.E. Mechatronics student at Bannari Amman Institute of Technology with a strong interest in Cloud, DevOps, and Artificial Intelligence. Skilled in Python, AWS, Docker, CI/CD, and ML/DL frameworks, with hands-on projects in cloud deployments, automation, and computer vision models.",
  email: "mohammedzaki.be27@gmail.com",
  phone: "+91-8248191664",
  location: "Chennai, TN",
  github: "https://github.com/reachzaki837",
  linkedin: "https://www.linkedin.com/in/reachzaki",
  skills: [
    { name: "AWS (EC2, S3, VPC, RDS)", level: 80 },
    { name: "Python", level: 85 },
    { name: "Machine Learning / DL", level: 78 },
    { name: "TensorFlow / PyTorch", level: 75 },
    { name: "OpenCV", level: 72 },
    { name: "Flask / FastAPI", level: 74 },
    { name: "Git / GitHub / Linux", level: 82 },
    { name: "C / C++ / Java", level: 70 },
  ],
  certifications: [
    "Microsoft: Azure AI Fundamentals",
    "Deloitte Data Analytics Simulation",
    "AWS Cloud Quest: Practitioner",
    "AWS Cloud Fundamentals",
  ],
  projects: [
    {
      title: "Vision-Based Road Crack Detection",
      stack: ["Raspberry Pi", "Flask", "OpenCV", "Python"],
      period: "Sep – Nov 2025",
      desc: "Automated road inspection robot using Raspberry Pi detecting cracks in real time. Flask dashboard with Road Health Index (RHI) and predictive deterioration analysis. 85–90% detection accuracy.",
    },
    {
      title: "Real-Time Object Detection",
      stack: ["TensorFlow", "SSD MobileNet", "Faster R-CNN", "Flask"],
      period: "Jul – Aug 2025",
      desc: "Trained SSD MobileNet and Faster R-CNN on a custom dataset using TF Object Detection API. Integrated live webcam stream and deployed as a Flask API.",
    },
    {
      title: "Image Classification via ViT",
      stack: ["PyTorch", "TensorFlow", "FastAPI", "CIFAR-10"],
      period: "Jun – Jul 2025",
      desc: "Vision Transformer achieving 91% accuracy on CIFAR-10, outperforming ResNet and VGG. Deployed as a FastAPI inference application.",
    },
    {
      title: "Student Learning Style Tool",
      stack: ["Python", "Bootstrap", "VARK Model", "Database"],
      period: "Feb 2026",
      desc: "Web system assessing learning styles via weighted VARK and Honey-Mumford model. Confidence-based classification with personalized strategy recommendations.",
    },
  ],
};

const SYSTEM_PROMPT = `You are an AI assistant embedded in Mohammed Zaki S's portfolio website. Answer all questions about him based strictly on the information below. Be concise, confident, and professional. Never use markdown formatting — no bold, no bullet symbols, no headers, no asterisks. Respond in clean plain sentences only.

Name: Mohammed Zaki S
Education: Pre-final year B.E. Mechatronics at Bannari Amman Institute of Technology, Chennai, Tamil Nadu. CGPA 7.46 till Sem 5.
Bio: Zaki blends a solid mechatronics foundation with hands-on experience in cloud, DevOps, and AI, delivering end-to-end solutions from model development to production deployment.
Skills: AWS (EC2, S3, VPC, RDS), Python, C/C++, Java, Linux, Git/GitHub, Machine Learning, Deep Learning, TensorFlow, PyTorch, OpenCV, Flask, FastAPI, CI/CD, Docker.
Projects:
1. Vision-Based Road Crack Detection: Raspberry Pi robot with real-time crack detection (85-90% accuracy) and a Flask dashboard showing Road Health Index.
2. Real-Time Object Detection: Trained SSD MobileNet and Faster R-CNN, served via Flask API for live webcam streams.
3. Image Classification via Vision Transformer (ViT): 91% accuracy on CIFAR-10, deployed as a FastAPI inference service.
4. Student Learning-Style Tool: Web system using weighted VARK and Honey-Mumford models to recommend personalized study strategies.
Certifications: Microsoft Azure AI Fundamentals, Deloitte Data Analytics Simulation, AWS Cloud Quest Practitioner, AWS Cloud Fundamentals.
Location: Chennai, TN
Email: mohammedzaki.be27@gmail.com
GitHub: https://github.com/reachzaki837
LinkedIn: https://www.linkedin.com/in/reachzaki
If asked something not covered here, say you don't have that information and suggest contacting Zaki directly at mohammedzaki.be27@gmail.com.`;

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/g, "")           // headers
    .replace(/\*\*(.+?)\*\*/g, "$1")     // bold
    .replace(/\*(.+?)\*/g, "$1")         // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, "")  // code
    .replace(/^\s*[-*+]\s+/gm, "• ")    // bullets
    .replace(/^\s*\d+\.\s+/gm, "")      // numbered lists
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
    .replace(/>{1,}\s+/g, "")           // blockquotes
    .replace(/\n{3,}/g, "\n\n")         // excess newlines
    .trim();
}

async function callClaude(messages, system) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "groq/compound-mini",
        max_tokens: 1000,
        messages: system
          ? [{ role: "system", content: system }, ...messages]
          : messages,
      }),
    });
    const data = await res.json();
    return stripMarkdown(data.choices?.[0]?.message?.content || "Something went wrong.");
  } catch { return "Network error. Please try again."; }
}

// Design tokens — dark charcoal + sharp white + electric orange accent
const C = {
  bg: "#0c0c0c",
  surface: "#111111",
  card: "#161616",
  border: "#222222",
  accent: "#FF4D00",       // bold electric orange
  accentHover: "#ff6a2a",
  white: "#FFFFFF",
  grey: "#888888",
  lightGrey: "#AAAAAA",
  dim: "#333333",
};

async function explainProject(project) {
  return callClaude([{ role: "user", content: `Explain this project in 3 punchy sentences for a portfolio visitor. What problem it solves, how it works, and why it's impressive.\n\nTitle: ${project.title}\nDesc: ${project.desc}\nStack: ${project.stack.join(", ")}` }],
    "You explain engineering projects in sharp, confident language. No fluff.");
}

function Nav() {
  const links = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "AI Tools", id: "ai-tools" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(12,12,12,0.97)", borderBottom: `1px solid ${C.border}`, padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
      <span style={{ color: C.white, fontWeight: 900, fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>ZAKI<span style={{ color: C.accent }}>.</span></span>
      <div style={{ display: "flex", gap: 36 }}>
        {links.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)}
            style={{ background: "none", border: "none", color: C.grey, cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.2s", fontFamily: "inherit" }}
            onMouseEnter={e => e.target.style.color = C.white}
            onMouseLeave={e => e.target.style.color = C.grey}
          >{l.label}</button>
        ))}
      </div>
    </nav>
  );
}

function useTypingAnimation(lines, speed = 40) {
  const [displayed, setDisplayed] = useState(lines.map(() => ""));
  const [cursor, setCursor] = useState({ line: 0, char: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (cursor.line >= lines.length) { setDone(true); return; }
    const line = lines[cursor.line];
    if (cursor.char < line.length) {
      const t = setTimeout(() => {
        setDisplayed(d => d.map((s, i) => i === cursor.line ? line.slice(0, cursor.char + 1) : s));
        setCursor(c => ({ ...c, char: c.char + 1 }));
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setCursor({ line: cursor.line + 1, char: 0 }), 300);
      return () => clearTimeout(t);
    }
  }, [cursor, lines, speed]);

  return { displayed, done };
}

function Hero({ onChat }) {
  // Pulling directly from the ME object for the tagline
  const lines = ["Mohammed Zaki S", "Cloud · DevOps · AI Engineer", ME.tagline];
  const { displayed, done } = useTypingAnimation(lines, 35);
  const [showBtns, setShowBtns] = useState(false);
  
  useEffect(() => { 
    if (done) setTimeout(() => setShowBtns(true), 200); 
  }, [done]);

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px", background: C.bg, position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      {/* Big background text */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(80px,18vw,260px)", fontWeight: 900, color: "#ffffff06", whiteSpace: "nowrap", userSelect: "none", letterSpacing: -8, zIndex: 0 }}>ENGINEER</div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        <p style={{ color: C.accent, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 20px" }}>Available for Opportunities</p>
        
        {/* Name */}
        <h1 style={{ fontSize: "clamp(42px, 7vw, 92px)", fontWeight: 900, color: C.white, margin: "0 0 16px", lineHeight: 1.0, letterSpacing: -2 }}>
          {displayed[0]}
          {displayed[0] !== lines[0] && <span style={{ borderRight: `3px solid ${C.accent}`, marginLeft: 2, animation: "blink 1s step-end infinite" }} />}
          <span style={{ color: C.accent }}>{displayed[0] === lines[0] ? "." : ""}</span>
        </h1>
        
        {/* Title */}
        <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: C.grey, margin: "0 0 12px", fontWeight: 400, maxWidth: 640, lineHeight: 1.6 }}>
          {displayed[1]}
          {displayed[0] === lines[0] && displayed[1] !== lines[1] && <span style={{ borderRight: `2px solid ${C.grey}`, marginLeft: 2, animation: "blink 1s step-end infinite" }} />}
        </p>
        
        {/* Tagline */}
        <p style={{ fontSize: 15, color: "#555", maxWidth: 520, lineHeight: 1.8, margin: "0 0 44px", minHeight: 80 }}>
          {displayed[2]}
          {displayed[1] === lines[1] && displayed[2] !== lines[2] && <span style={{ borderRight: `2px solid ${C.grey}`, marginLeft: 2, animation: "blink 1s step-end infinite" }} />}
        </p>
        
        {/* Buttons - Fade in after typing is done */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: showBtns ? 1 : 0, transition: "opacity 0.6s ease-in", pointerEvents: showBtns ? "auto" : "none" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} style={{ background: C.accent, color: C.white, padding: "14px 32px", borderRadius: 2, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "inherit" }}>View Projects</button>
          <button onClick={onChat} style={{ background: "transparent", border: `2px solid ${C.dim}`, color: C.lightGrey, padding: "14px 32px", borderRadius: 2, cursor: "pointer", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>Chat with AI</button>
          <a href={ME.github} target="_blank" rel="noreferrer" style={{ background: "transparent", border: `2px solid ${C.dim}`, color: C.lightGrey, padding: "14px 32px", borderRadius: 2, textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>GitHub</a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" style={{ background: "transparent", border: `2px solid ${C.dim}`, color: C.lightGrey, padding: "14px 32px", borderRadius: 2, textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>LinkedIn</a>
        </div>
      </div>

      {/* Stats bar - Fade in slightly after buttons */}
      <div style={{ position: "relative", zIndex: 1, marginTop: 80, borderTop: `1px solid ${C.border}`, paddingTop: 32, display: "flex", gap: 60, flexWrap: "wrap", opacity: showBtns ? 1 : 0, transition: "opacity 0.6s ease-in 0.2s" }}>
        {[["4+", "Projects Built"], ["3", "AI/ML Models", ], ["4", "Certifications"], ["7.46", "CGPA"]].map(([n, l]) => (
          <div key={l}>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: C.white, lineHeight: 1 }}>{n}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: C.grey, letterSpacing: 1, textTransform: "uppercase" }}>{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ background: C.surface, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label>Technical Skills</Label>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: C.white, margin: "12px 0 60px", letterSpacing: -1 }}>What I Work With</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
          {ME.skills.map((s, i) => (
            <div key={s.name} style={{ background: i % 2 === 0 ? C.card : "#131313", padding: "24px 28px", borderLeft: `3px solid ${i % 3 === 0 ? C.accent : C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                <span style={{ color: C.accent, fontWeight: 900, fontSize: 14 }}>{s.level}%</span>
              </div>
              <div style={{ background: C.dim, height: 3 }}>
                <div style={{ width: `${s.level}%`, height: "100%", background: C.accent }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60 }}>
          <Label>Certifications</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
            {ME.certifications.map(c => (
              <span key={c} style={{ border: `1px solid ${C.dim}`, color: C.lightGrey, padding: "10px 18px", fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>↗ {c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onExplain }) {
  return (
    <section id="projects" style={{ background: C.bg, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label>Selected Work</Label>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: C.white, margin: "12px 0 60px", letterSpacing: -1 }}>Projects</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ME.projects.map((p, i) => (
            <div key={p.title} style={{ background: C.card, padding: "32px 36px", display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap", borderLeft: `3px solid ${i === 0 ? C.accent : "transparent"}`, transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = i === 0 ? C.accent : "transparent"}
            >
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ color: C.grey, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>{p.period}</p>
                <h3 style={{ color: C.white, fontSize: 20, fontWeight: 800, margin: "0 0 12px", letterSpacing: -0.5 }}>{p.title}</h3>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 16px", maxWidth: 520 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.stack.map(t => <span key={t} style={{ background: C.dim, color: C.lightGrey, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{t}</span>)}
                </div>
              </div>
              <button onClick={() => onExplain(p)} style={{ background: "transparent", border: `1px solid ${C.dim}`, color: C.grey, padding: "10px 20px", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>AI Explain →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AITools() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const recommend = async () => {
    if (!input.trim()) return;
    setLoading(true); setResult("");
    const res = await callClaude([{ role: "user", content: `Visitor goal/role: "${input}". Zaki's skills: ${ME.skills.map(s => s.name).join(", ")}. Projects: ${ME.projects.map(p => p.title).join(", ")}. In 3-4 sharp sentences, say which skills match and why Zaki is a strong candidate for this role.` }], "You are a confident career advisor. Be direct and persuasive.");
    setResult(res); setLoading(false);
  };

  return (
    <section id="ai-tools" style={{ background: C.surface, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label>Powered by Claude AI</Label>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: C.white, margin: "12px 0 60px", letterSpacing: -1 }}>AI Skill Recommender</h2>
        <div style={{ background: C.card, padding: "48px", borderTop: `3px solid ${C.accent}` }}>
          <p style={{ color: C.lightGrey, fontSize: 15, lineHeight: 1.8, margin: "0 0 28px", maxWidth: 560 }}>Enter a job role or goal — AI will instantly match Zaki's skills and projects to your requirements.</p>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && recommend()}
              placeholder="e.g. Cloud Engineer, ML Intern, DevOps role..."
              style={{ flex: 1, minWidth: 260, background: "#0c0c0c", border: `1px solid ${C.dim}`, borderRight: "none", color: C.white, padding: "14px 18px", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            <button onClick={recommend} disabled={loading} style={{ background: C.accent, border: "none", color: C.white, padding: "14px 28px", cursor: "pointer", fontWeight: 800, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" }}>{loading ? "..." : "Analyze"}</button>
          </div>
          {result && (
            <div style={{ marginTop: 28, borderTop: `1px solid ${C.dim}`, paddingTop: 24, color: C.lightGrey, fontSize: 15, lineHeight: 1.9 }}>{result}</div>
          )}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background: C.bg, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Label>Get In Touch</Label>
        <h2 style={{ fontSize: "clamp(32px,5vw,72px)", fontWeight: 900, color: C.white, margin: "12px 0 8px", letterSpacing: -2, lineHeight: 1 }}>
          Let's Work<br /><span style={{ color: C.accent }}>Together.</span>
        </h2>
        <p style={{ color: C.grey, fontSize: 15, margin: "24px 0 48px", maxWidth: 480, lineHeight: 1.8 }}>Open to internships, placement opportunities, and technical collaborations.</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href={`mailto:${ME.email}`} style={{ background: C.accent, color: C.white, padding: "14px 32px", textDecoration: "none", fontWeight: 800, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>{ME.email}</a>
          <a href={`tel:${ME.phone}`} style={{ border: `1px solid ${C.dim}`, color: C.lightGrey, padding: "14px 32px", textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>Call Me ↗</a>
        </div>
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span style={{ color: C.white, fontSize: 15 }}>📍 {ME.location} &nbsp;·&nbsp; 📞 {ME.phone}</span>
          <span style={{ color: C.white, fontSize: 15 }}>© 2026 Mohammed Zaki S</span>
        </div>
      </div>
    </section>
  );
}

function Chatbot({ open, onClose }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hey! Ask me anything about Zaki — his skills, projects, or background." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ w: 360, h: 500 });
  const [fontSize, setFontSize] = useState(13);
  const resizing = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  // Resize drag logic
  const onMouseDown = (e) => {
    e.preventDefault();
    resizing.current = { startX: e.clientX, startY: e.clientY, startW: size.w, startH: size.h };
    const onMove = (ev) => {
      const dx = resizing.current.startX - ev.clientX;
      const dy = resizing.current.startY - ev.clientY;
      setSize({
        w: Math.max(300, Math.min(700, resizing.current.startW + dx)),
        h: Math.max(400, Math.min(800, resizing.current.startH + dy)),
      });
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const send = async () => {
    const txt = input.trim(); if (!txt || loading) return;
    const next = [...msgs, { role: "user", content: txt }];
    setMsgs(next); setInput(""); setLoading(true);
    const reply = await callClaude(next.map(m => ({ role: m.role, content: m.content })), SYSTEM_PROMPT);
    setMsgs([...next, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  if (!open) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, width: size.w, height: size.h, background: "#111", border: `1px solid ${C.dim}`, display: "flex", flexDirection: "column", zIndex: 200, boxShadow: "0 24px 80px rgba(0,0,0,0.8)" }}>

      {/* Resize handle — top-left corner */}
      <div onMouseDown={onMouseDown} style={{ position: "absolute", top: 0, left: 0, width: 18, height: 18, cursor: "nw-resize", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill={C.grey}>
          <path d="M9 1L1 9M5 1L1 5M9 5L5 9" stroke={C.grey} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.dim}`, borderTop: `3px solid ${C.accent}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div>
          <p style={{ margin: 0, color: C.white, fontWeight: 800, fontSize: 14, letterSpacing: 0.5 }}>ASK ZAKI'S AI</p>
          <p style={{ margin: 0, color: "#22c55e", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>● Online</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Font size controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, border: `1px solid ${C.dim}`, padding: "2px 6px" }}>
            <button onClick={() => setFontSize(f => Math.max(11, f - 1))} style={{ background: "none", border: "none", color: C.grey, cursor: "pointer", fontSize: 14, lineHeight: 1, padding: "0 2px" }}>A−</button>
            <span style={{ color: C.grey, fontSize: 10 }}>{fontSize}</span>
            <button onClick={() => setFontSize(f => Math.min(18, f + 1))} style={{ background: "none", border: "none", color: C.grey, cursor: "pointer", fontSize: 14, lineHeight: 1, padding: "0 2px" }}>A+</button>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.grey, cursor: "pointer", fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ background: m.role === "user" ? C.accent : C.card, color: C.white, padding: "10px 14px", maxWidth: "80%", fontSize, lineHeight: 1.7, borderRadius: 2 }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ color: C.grey, fontSize: 12, letterSpacing: 1 }}>THINKING...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: 12, borderTop: `1px solid ${C.dim}`, display: "flex", gap: 0, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask something..."
          style={{ flex: 1, background: "#0c0c0c", border: `1px solid ${C.dim}`, borderRight: "none", color: C.white, padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
        <button onClick={send} disabled={loading} style={{ background: C.accent, border: "none", color: C.white, padding: "10px 18px", cursor: "pointer", fontWeight: 800, fontSize: 14 }}>→</button>
      </div>
    </div>
  );
}

function ExplainModal({ project, onClose }) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!project) return;
    explainProject(project).then(r => { setResult(r); setLoading(false); });
  }, [project]);

  if (!project) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#111", borderTop: `3px solid ${C.accent}`, padding: "40px 36px", maxWidth: 520, width: "100%", boxShadow: "0 40px 120px rgba(0,0,0,0.9)" }}>
        <p style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>AI Explanation</p>
        <h3 style={{ color: C.white, fontSize: 22, fontWeight: 800, margin: "0 0 20px", letterSpacing: -0.5 }}>{project.title}</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {project.stack.map(t => <span key={t} style={{ background: C.dim, color: C.lightGrey, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{t}</span>)}
        </div>
        <p style={{ color: C.lightGrey, fontSize: 14, lineHeight: 1.9, margin: "0 0 28px" }}>{loading ? "Analyzing project..." : result}</p>
        <button onClick={onClose} style={{ background: C.accent, border: "none", color: C.white, padding: "12px 28px", cursor: "pointer", fontWeight: 800, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" }}>Close</button>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <p style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>{children}</p>;
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [explainProject, setExplainProject] = useState(null);
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: C.white }}>
      <Nav />
      <Hero onChat={() => setChatOpen(true)} />
      <Skills />
      <Projects onExplain={p => setExplainProject(p)} />
      <AITools />
      <Contact />
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      <ExplainModal project={explainProject} onClose={() => setExplainProject(null)} />
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{ position: "fixed", bottom: 28, right: 28, width: 52, height: 52, background: C.accent, border: "none", color: C.white, fontSize: 20, cursor: "pointer", zIndex: 150, fontWeight: 900, boxShadow: `0 8px 30px rgba(255,77,0,0.4)` }}>AI</button>
      )}
    </div>
  );
}