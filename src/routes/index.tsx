import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp, Brain, Code2, Download, Github, GraduationCap, Layers, Linkedin, Mail, Menu,
  MessageCircle, Phone, Puzzle, Target, X, Globe, ExternalLink, ImageIcon, User, ArrowRight, Send,
} from "lucide-react";
import { profile, projects, type Project } from "@/data/portfolio";

const TITLE = "Zamzam Abdikadir Farah — Software Developer";
const DESC =
  "Portfolio of Zamzam Abdikadir Farah, Computer Science student at Nugaal University and Software Developer interested in Software Engineering and AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["home", "about", "skills", "projects", "services", "education", "contact"];
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

const btn = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const btnPrimary = `${btn} bg-gradient-primary text-primary-foreground shadow-glow hover:-translate-y-0.5`;
const btnGhost = `${btn} border border-border bg-card/50 text-foreground hover:border-primary hover:text-primary-glow`;
const card = "rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow";

function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const links = NAV.map((id) => (
    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
      className={`rounded-full px-3 py-2 text-sm font-medium capitalize transition-colors ${active === id ? "bg-primary/15 text-primary-glow" : "text-muted-foreground hover:text-foreground"}`}>
      {id}
    </a>
  ));
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-primary-foreground">{profile.initials}</span>
          <span className="hidden text-sm font-semibold sm:block">{profile.name}</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">{links}</div>
        <div className="flex items-center gap-2">
          <a href="#contact" className={`${btnPrimary} hidden !min-h-9 !py-2 sm:inline-flex`}>Let's Talk</a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <div className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-4 pb-4">{links}
            <a href="#contact" onClick={() => setOpen(false)} className={`${btnPrimary} mt-2`}>Let's Talk</a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const socials = [
    { icon: Github, l: "GitHub", h: profile.github },
    { icon: Linkedin, l: "LinkedIn", h: profile.linkedin },
    { icon: MessageCircle, l: "WhatsApp", h: `https://wa.me/${profile.whatsapp}` },
  ];
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-12 sm:pt-32">
      <div aria-hidden className="animate-drift absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm">👋 Hello, I'm</p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Zamzam <span className="text-gradient">Abdikadir</span>
          </h1>
          <p className="mt-4 text-xl font-semibold sm:text-2xl">Software Developer & Computer Science Student</p>
          <p className="mt-4 max-w-md text-muted-foreground">
            Building meaningful digital experiences through software development, problem-solving, and technology.
            I study Computer Science at Nugaal University, with a strong interest in Software Engineering and AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={`${btnPrimary} !rounded-xl`}>View My Projects <ArrowRight size={16} /></a>
            <a href="#contact" className={`${btnGhost} !rounded-xl`}>Contact Me</a>
            {profile.cv ? (
              <a href={profile.cv} download className={`${btnGhost} !rounded-xl`}><Download size={16} /> Download CV</a>
            ) : (
              <button disabled title="CV coming soon" className={`${btnGhost} !rounded-xl cursor-not-allowed opacity-50`}><Download size={16} /> CV soon</button>
            )}
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            Follow me on
            {socials.map(({ icon: I, l, h }) => (
              <a key={l} href={h} {...ext} aria-label={l} className="text-foreground transition-colors hover:text-primary-glow"><I size={20} /></a>
            ))}
          </div>
        </Reveal>
        <Reveal className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="grid-dots absolute top-0 left-4 h-28 w-28" />
          <div className="relative mx-auto aspect-square w-[85%]">
            <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-primary opacity-90 shadow-glow" />
            <div className="animate-float absolute inset-3 grid place-items-center overflow-hidden rounded-full border-4 border-background bg-card">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <User size={80} strokeWidth={1.2} className="text-primary-glow" />
                  <span className="text-xs">Profile photo coming soon</span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-1/3 -left-2 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur sm:-left-6">
            <p className="font-display text-xl font-bold text-primary-glow">2027</p>
            <p className="text-xs text-muted-foreground">Expected<br />Graduation</p>
          </div>
          <div className="absolute right-0 bottom-6 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur">
            <p className="font-display text-xl font-bold text-primary-glow">BSc CS</p>
            <p className="text-xs text-muted-foreground">Nugaal<br />University</p>
          </div>
        </Reveal>
      </div>
      <Reveal className="relative mx-auto mt-14 max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {[
            { icon: Code2, t: "Software", d: "Development" },
            { icon: Layers, t: "Software", d: "Engineering" },
            { icon: Globe, t: "Web", d: "Applications" },
            { icon: Brain, t: "AI", d: "Future focus" },
          ].map(({ icon: I, t, d }) => (
            <div key={d} className="flex items-center gap-4 bg-card px-5 py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary-glow"><I size={20} /></span>
              <span><span className="block font-display text-lg font-bold">{t}</span><span className="text-sm text-muted-foreground">{d}</span></span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  const items = [
    { icon: GraduationCap, t: "Education", d: "BSc in Computer Science, Nugaal University." },
    { icon: Target, t: "Focus", d: "Software Development and Software Engineering." },
    { icon: Brain, t: "Future Goal", d: "Advanced study in Artificial Intelligence." },
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Get to know me" title="About Me" />
      <Reveal className="mx-auto max-w-3xl space-y-4 text-center text-lg text-muted-foreground">
        <p>I'm a Computer Science student at Nugaal University and a Software Developer who enjoys turning ideas into practical software solutions.</p>
        <p>I'm drawn to Software Engineering — designing well-structured, useful applications — and I'm continually working to sharpen my technical skills. Looking ahead, I'm excited to explore Artificial Intelligence and how it can solve real problems.</p>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {items.map(({ icon: I, t, d }) => (
          <Reveal key={t} className={card}>
            <I className="text-primary-glow" />
            <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const s = [
    { icon: Layers, t: "Software Engineering", tag: "Primary skill", d: ["Software design", "Problem-solving", "Application structure", "Maintainable code"] },
    { icon: Code2, t: "Software Development", d: ["Developing practical applications", "Implementing software functionality"] },
    { icon: Globe, t: "Web Development", d: ["Personal web projects", "Web application development"] },
    { icon: Brain, t: "Artificial Intelligence", tag: "Interest", d: ["Area of interest", "Future specialization"] },
  ];
  return (
    <section id="skills" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="What I work on" title="Technical Skills" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.map(({ icon: I, t, tag, d }, i) => (
            <Reveal key={t} className={`${card} ${i === 0 ? "border-primary/50" : ""}`}>
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary-glow"><I size={20} /></span>
                {tag && <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary-glow">{tag}</span>}
              </div>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {d.map((x) => <li key={x} className="flex gap-2"><span className="text-primary">▹</span>{x}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className={`${card} flex flex-col !p-0 overflow-hidden`}>
      <div className="grid aspect-video place-items-center border-b border-border bg-secondary">
        {p.image ? <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="h-full w-full object-cover" /> : (
          <span className="flex flex-col items-center gap-2 text-xs text-muted-foreground"><ImageIcon className="text-primary-glow" /> Screenshot coming soon</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium uppercase tracking-wider text-primary-glow">Personal project</span>
        <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.technologies?.length ? p.technologies.map((t) => <span key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary-glow">{t}</span>)
            : <span className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">Technologies to be added</span>}
        </div>
        {open && (
          <div className="mt-4 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
            {p.plannedFeatures.length ? (<><p className="mb-2 font-medium text-foreground">Focus areas</p>
              <ul className="space-y-1">{p.plannedFeatures.map((f) => <li key={f}>▹ {f}</li>)}</ul></>) : <p>More details coming soon.</p>}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <button onClick={() => setOpen(!open)} aria-expanded={open} className={`${btnGhost} !min-h-9 !px-4 !py-2`}>{open ? "Hide Details" : "View Details"}</button>
          {p.github && <a href={p.github} {...ext} className={`${btnGhost} !min-h-9 !px-4 !py-2`}><Github size={14} /> GitHub</a>}
          {p.demo && <a href={p.demo} {...ext} className={`${btnGhost} !min-h-9 !px-4 !py-2`}><ExternalLink size={14} /> Live Demo</a>}
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Personal work" title="Featured Projects" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ProjectCard key={p.title} p={p} />)}</div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        See more on <a href={profile.github} {...ext} className="text-primary-glow underline-offset-4 hover:underline">GitHub</a>.
      </p>
    </section>
  );
}

function Services() {
  const s = [
    { icon: Code2, t: "Software Development", d: "Creating practical software applications designed around user needs and clearly defined problems.", main: true },
    { icon: Globe, t: "Web Application Development", d: "Building functional, responsive web applications with an emphasis on usability and maintainable code." },
    { icon: Puzzle, t: "Software Problem-Solving", d: "Applying software engineering principles to structure solutions and improve application functionality." },
  ];
  return (
    <section id="services" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Services" title="What I Can Help With" />
        <div className="grid gap-5 md:grid-cols-3">
          {s.map(({ icon: I, t, d, main }) => (
            <Reveal key={t} className={`${card} ${main ? "border-primary/50" : ""}`}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><I size={22} /></span>
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-4 py-20">
      <SectionHead eyebrow="Academics" title="Education & Learning Journey" />
      <ol className="relative space-y-8 border-l border-primary/40 pl-8">
        <li>
          <span className="absolute -left-[9px] mt-6 h-4 w-4 rounded-full bg-primary shadow-glow" />
          <Reveal className={card}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm text-primary-glow">2023 – 2027</span>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary-glow">In progress</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold">Bachelor of Science in Computer Science</h3>
            <p className="text-muted-foreground">Nugaal University</p>
            <p className="mt-2 text-sm text-muted-foreground">Expected graduation: 2027</p>
          </Reveal>
        </li>
        <li>
          <span className="absolute -left-[9px] mt-6 h-4 w-4 rounded-full border-2 border-primary bg-background" />
          <Reveal className={`${card} border-dashed`}>
            <span className="font-mono text-sm text-primary-glow">Future goal</span>
            <h3 className="mt-3 text-xl font-semibold">MSc in Artificial Intelligence</h3>
            <p className="mt-2 text-sm text-muted-foreground">An academic ambition — I plan to pursue advanced study in AI after completing my bachelor's degree.</p>
          </Reveal>
        </li>
      </ol>
    </section>
  );
}

function Contact() {
  const items = [
    { icon: Mail, l: "Email", v: profile.email, h: `mailto:${profile.email}` },
    { icon: Phone, l: "Phone", v: profile.phone, h: `tel:${profile.phone}` },
    { icon: MessageCircle, l: "WhatsApp", v: profile.phone, h: `https://wa.me/${profile.whatsapp}`, e: true },
    { icon: Github, l: "GitHub", v: "github.com/zaam-cabdi", h: profile.github, e: true },
    { icon: Linkedin, l: "LinkedIn", v: "zamzam-abdiqadir", h: profile.linkedin, e: true },
  ];
  return (
    <section id="contact" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHead eyebrow="Contact" title="Let's Connect" />
        <Reveal className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          Whether you're a recruiter, developer, collaborator, or potential client, I'd love to hear from you. Reach out through any of the channels below.
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: I, l, v, h, e }) => (
            <Reveal key={l}>
              <a href={h} {...(e ? ext : {})} className={`${card} flex items-center gap-4`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary-glow"><I size={20} /></span>
                <span className="min-w-0"><span className="block text-xs text-muted-foreground">{l}</span><span className="block truncate font-medium">{v}</span></span>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <Mail className="mt-1 shrink-0 text-primary-glow" />
            <div><p className="font-display text-lg font-semibold">Let's Work Together!</p>
              <p className="text-sm text-muted-foreground">Have an idea or opportunity? I would love to hear about it.</p></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={`${btnPrimary} !rounded-xl`}>Get in Touch <Send size={16} /></a>
            <a href={`https://wa.me/${profile.whatsapp}`} {...ext} className={`${btnGhost} !rounded-xl`}><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">Building ideas into practical software solutions.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          {NAV.map((id) => <a key={id} href={`#${id}`} className="capitalize hover:text-primary-glow">{id}</a>)}
        </nav>
        <div className="flex gap-3">
          <a aria-label="GitHub" href={profile.github} {...ext} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary-glow"><Github size={18} /></a>
          <a aria-label="LinkedIn" href={profile.linkedin} {...ext} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary-glow"><Linkedin size={18} /></a>
          <a aria-label="Email" href={`mailto:${profile.email}`} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary-glow"><Mail size={18} /></a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <a href="#home" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary-glow"><ArrowUp size={14} /> Back to Top</a>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero /><About /><Skills /><Projects /><Services /><Education /><Contact />
      </main>
      <Footer />
    </>
  );
}

