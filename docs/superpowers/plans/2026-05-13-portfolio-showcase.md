# Portfolio Showcase (Projects, Certificates, Experiences) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a showcase system for 5 projects, certificates, and experiences with detail pages for each, using the installed Aceternity UI and Magic UI components.

**Architecture:** Data-driven approach — all content lives in `src/data/*.js` files, consumed by section components on the home page and detail pages via React Router's `useParams`. Each section uses the pre-installed UI components (Bento Grid, 3D Card, Lamp, Tracing Beam, etc.) with Framer Motion animations.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, shadcn/ui, framer-motion, yet-another-react-lightbox, react-router-dom v7

---

## Pre-requisite: Bug Fixes (Must do first)

### Task 0: Fix Existing Bugs

**Files:**
- Modify: `src/components/Navbar.jsx:18`
- Modify: `src/components/ProjectSection.jsx:74,81`

- [ ] **Step 1: Fix Navbar scroll detection bug**

In `src/components/Navbar.jsx` line 18, change `window.screenY` to `window.scrollY`:

```jsx
// BEFORE (broken):
setIsScrolled(window.screenY > 10);

// AFTER (fixed):
setIsScrolled(window.scrollY > 10);
```

- [ ] **Step 2: Fix ProjectSection link href bugs**

In `src/components/ProjectSection.jsx` lines 74 and 81, the href attributes have the variable names inside string quotes instead of JSX expressions:

```jsx
// BEFORE (broken — renders literal text "{project.demoUrl}"):
href="{project.demoUrl}"
href="{project.githubUrl}"

// AFTER (fixed):
href={project.demoUrl}
href={project.githubUrl}
```

- [ ] **Step 3: Fix Magic Card next-themes dependency**

In `src/components/ui/magic-card.jsx`, the component imports `useTheme` from `next-themes` which is a Next.js package. The project uses a custom dark mode system (`.dark` class on `<html>`, persisted via localStorage). Replace the theme detection:

```jsx
// BEFORE:
import { useTheme } from "next-themes"
// ... inside component:
const { theme, systemTheme } = useTheme()
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
const isDarkTheme = useMemo(() => {
  if (!mounted) return true
  const currentTheme = theme === "system" ? systemTheme : theme
  return currentTheme === "dark"
}, [theme, systemTheme, mounted])

// AFTER:
// Remove the import of useTheme from "next-themes"
// ... inside component, replace the theme block with:
const [isDarkTheme, setIsDarkTheme] = useState(true)

useEffect(() => {
  const checkDark = () => {
    setIsDarkTheme(document.documentElement.classList.contains("dark"))
  }
  checkDark()
  const observer = new MutationObserver(checkDark)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}, [])
```

Remove the `import { useTheme } from "next-themes"` line entirely.

- [ ] **Step 4: Commit bug fixes**

```bash
git add src/components/Navbar.jsx src/components/ProjectSection.jsx src/components/ui/magic-card.jsx
git commit -m "fix: navbar scroll detection, project links, and magic-card theme detection"
```

---

## Phase 1: Data Files

### Task 1: Create Projects Data

**Files:**
- Create: `src/data/projects.js`

- [ ] **Step 1: Create the projects data file**

```js
// src/data/projects.js
import proj1 from "@/assets/1.png";
import proj2 from "@/assets/2.png";
import proj3 from "@/assets/3.png";
import proj4 from "@/assets/4.jpg";
import proj5 from "@/assets/5.jpg";

const projects = [
  {
    id: 1,
    slug: "project-1",
    title: "Project 1",
    description: "Beautiful website built with React and Tailwind CSS",
    image: proj1,
    tags: ["React", "Tailwind CSS", "Vite"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/ibayers/project-1",
    featured: true,
    detail: {
      overview:
        "A modern web application built with cutting-edge technologies. This project demonstrates proficiency in component-based architecture and responsive design.",
      techStack: [
        { name: "React", icon: "react" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Vite", icon: "vite" },
      ],
      challenges:
        "Implementing a performant animation system while maintaining accessibility standards across different devices and browsers.",
      features: [
        "Responsive design across all breakpoints",
        "Dark mode support with smooth transitions",
        "Optimized bundle size under 150kb",
      ],
      screenshots: [proj1],
    },
  },
  {
    id: 2,
    slug: "project-2",
    title: "Project 2",
    description: "Interactive website with HTML, CSS, and JavaScript",
    image: proj2,
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/ibayers/project-2",
    featured: false,
    detail: {
      overview:
        "An interactive website showcasing creative use of vanilla web technologies with modern design patterns.",
      techStack: [
        { name: "HTML5", icon: "html" },
        { name: "CSS3", icon: "css" },
        { name: "JavaScript", icon: "javascript" },
      ],
      challenges:
        "Creating complex animations without a framework while keeping the code maintainable and performant.",
      features: [
        "CSS Grid and Flexbox layouts",
        "Vanilla JavaScript animations",
        "Cross-browser compatibility",
      ],
      screenshots: [proj2],
    },
  },
  {
    id: 3,
    slug: "project-3",
    title: "Project 3",
    description: "Simple website with modern design and easy navigation",
    image: proj3,
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/ibayers/project-3",
    featured: false,
    detail: {
      overview:
        "A full-stack application with a clean, intuitive interface focused on user experience and accessibility.",
      techStack: [
        { name: "React", icon: "react" },
        { name: "Node.js", icon: "nodejs" },
        { name: "MongoDB", icon: "mongodb" },
      ],
      challenges:
        "Designing an API that balances flexibility with security while keeping response times under 200ms.",
      features: [
        "RESTful API with JWT authentication",
        "Responsive admin dashboard",
        "Real-time data updates",
      ],
      screenshots: [proj3],
    },
  },
  {
    id: 4,
    slug: "project-4",
    title: "Project 4",
    description: "E-commerce platform with payment integration",
    image: proj4,
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/ibayers/project-4",
    featured: false,
    detail: {
      overview:
        "A full-featured e-commerce platform with secure payment processing and inventory management.",
      techStack: [
        { name: "Next.js", icon: "nextjs" },
        { name: "Stripe", icon: "stripe" },
        { name: "PostgreSQL", icon: "postgresql" },
      ],
      challenges:
        "Implementing PCI-compliant payment flows and handling concurrent inventory updates.",
      features: [
        "Stripe payment integration",
        "Real-time inventory tracking",
        "Admin dashboard with analytics",
      ],
      screenshots: [proj4],
    },
  },
  {
    id: 5,
    slug: "project-5",
    title: "Project 5",
    description: "Real-time chat application with WebSocket",
    image: proj5,
    tags: ["React", "Socket.io", "Express"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/ibayers/project-5",
    featured: false,
    detail: {
      overview:
        "A real-time messaging application supporting private chats, group conversations, and file sharing.",
      techStack: [
        { name: "React", icon: "react" },
        { name: "Socket.io", icon: "socketio" },
        { name: "Express", icon: "express" },
      ],
      challenges:
        "Handling message ordering and delivery guarantees across unstable connections.",
      features: [
        "Real-time messaging with WebSocket",
        "File sharing with preview",
        "Online status indicators",
      ],
      screenshots: [proj5],
    },
  },
];

export default projects;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.js
git commit -m "feat: add projects data file with 5 placeholder projects"
```

---

### Task 2: Create Certificates Data

**Files:**
- Create: `src/data/certificates.js`

- [ ] **Step 1: Create the certificates data file**

```js
// src/data/certificates.js
import cert1 from "@/assets/1.png";
import cert2 from "@/assets/2.png";
import cert3 from "@/assets/3.png";
import cert4 from "@/assets/4.jpg";
import cert5 from "@/assets/5.jpg";
import cert6 from "@/assets/6.jpg";
import cert7 from "@/assets/7.png";
import cert8 from "@/assets/8.png";
import cert9 from "@/assets/9.png";
import cert10 from "@/assets/10.jpg";
import cert11 from "@/assets/11.jpg";

const certificates = [
  {
    id: 1,
    slug: "certificate-1",
    title: "Certificate 1",
    issuer: "Google",
    date: "2024-01",
    image: cert1,
    credentialUrl: "https://example.com/verify/1",
    category: "Cloud",
    description:
      "Demonstrated proficiency in cloud computing fundamentals including compute, storage, and networking services.",
  },
  {
    id: 2,
    slug: "certificate-2",
    title: "Certificate 2",
    issuer: "Meta",
    date: "2024-03",
    image: cert2,
    credentialUrl: "https://example.com/verify/2",
    category: "Web",
    description:
      "Completed the front-end development program covering React, responsive design, and web accessibility.",
  },
  {
    id: 3,
    slug: "certificate-3",
    title: "Certificate 3",
    issuer: "AWS",
    date: "2024-05",
    image: cert3,
    credentialUrl: "https://example.com/verify/3",
    category: "Cloud",
    description:
      "Earned the AWS Cloud Practitioner certification validating foundational understanding of AWS Cloud.",
  },
  {
    id: 4,
    slug: "certificate-4",
    title: "Certificate 4",
    issuer: "Coursera",
    date: "2024-06",
    image: cert4,
    credentialUrl: "https://example.com/verify/4",
    category: "AI",
    description:
      "Completed the machine learning specialization covering supervised and unsupervised learning techniques.",
  },
  {
    id: 5,
    slug: "certificate-5",
    title: "Certificate 5",
    issuer: "freeCodeCamp",
    date: "2024-07",
    image: cert5,
    credentialUrl: "https://example.com/verify/5",
    category: "Web",
    description:
      "Earned the JavaScript Algorithms and Data Structures certification by completing 300+ hours of coursework.",
  },
  {
    id: 6,
    slug: "certificate-6",
    title: "Certificate 6",
    issuer: "Udemy",
    date: "2024-08",
    image: cert6,
    credentialUrl: "https://example.com/verify/6",
    category: "Web",
    description:
      "Completed the complete React developer course including hooks, context, and Redux.",
  },
  {
    id: 7,
    slug: "certificate-7",
    title: "Certificate 7",
    issuer: "Google",
    date: "2024-09",
    image: cert7,
    credentialUrl: "https://example.com/verify/7",
    category: "AI",
    description:
      "Earned the TensorFlow Developer Certificate demonstrating ability to build and train ML models.",
  },
  {
    id: 8,
    slug: "certificate-8",
    title: "Certificate 8",
    issuer: "Microsoft",
    date: "2024-10",
    image: cert8,
    credentialUrl: "https://example.com/verify/8",
    category: "Cloud",
    description:
      "Completed Azure Fundamentals certification covering cloud concepts and Azure services.",
  },
  {
    id: 9,
    slug: "certificate-9",
    title: "Certificate 9",
    issuer: "Coursera",
    date: "2024-11",
    image: cert9,
    credentialUrl: "https://example.com/verify/9",
    category: "Other",
    description:
      "Completed the UX Design specialization covering user research, wireframing, and prototyping.",
  },
  {
    id: 10,
    slug: "certificate-10",
    title: "Certificate 10",
    issuer: "Dicoding",
    date: "2024-12",
    image: cert10,
    credentialUrl: "https://example.com/verify/10",
    category: "Web",
    description:
      "Completed the front-end web development learning path with React and modern JavaScript.",
  },
  {
    id: 11,
    slug: "certificate-11",
    title: "Certificate 11",
    issuer: "Bangkit",
    date: "2025-01",
    image: cert11,
    credentialUrl: "https://example.com/verify/11",
    category: "Other",
    description:
      "Graduated from the Bangkit Academy program by Google, GoTo, and Traveloka.",
  },
];

export default certificates;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/certificates.js
git commit -m "feat: add certificates data file with 11 placeholder certificates"
```

---

### Task 3: Create Experiences Data

**Files:**
- Create: `src/data/experiences.js`

- [ ] **Step 1: Create the experiences data file**

```js
// src/data/experiences.js

const experiences = [
  {
    id: 1,
    slug: "frontend-developer-company-a",
    title: "Frontend Developer",
    company: "Company A",
    period: "Jan 2024 — Present",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    description:
      "Building and maintaining responsive web applications using React and TypeScript. Collaborating with design and backend teams to deliver pixel-perfect user interfaces.",
    achievements: [
      "Reduced page load time by 40% through code splitting and lazy loading",
      "Implemented component library used across 3 product teams",
      "Mentored 2 junior developers in React best practices",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    id: 2,
    slug: "web-developer-intern-company-b",
    title: "Web Developer Intern",
    company: "Company B",
    period: "Jun 2023 — Dec 2023",
    location: "Bandung, Indonesia",
    type: "Internship",
    description:
      "Assisted in developing internal tools and customer-facing features. Gained hands-on experience with modern web development workflows and agile methodology.",
    achievements: [
      "Built an internal dashboard used by 50+ employees",
      "Contributed to 15+ feature releases during the internship",
      "Received Outstanding Intern recognition",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    id: 3,
    slug: "freelance-developer",
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "Jan 2023 — May 2023",
    location: "Remote",
    type: "Freelance",
    description:
      "Designed and developed websites for small businesses and startups. Managed complete project lifecycles from requirements gathering to deployment.",
    achievements: [
      "Delivered 5 client websites on time and within budget",
      "Achieved 100% client satisfaction rating",
      "Implemented SEO best practices resulting in 60% organic traffic increase for clients",
    ],
    techStack: ["React", "Node.js", "Figma", "WordPress"],
  },
];

export default experiences;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/experiences.js
git commit -m "feat: add experiences data file with 3 placeholder experiences"
```

---

## Phase 2: Project Section (Home Page)

### Task 4: Rebuild ProjectSection with Bento-style Layout + Animations

**Files:**
- Modify: `src/components/ProjectSection.jsx`

**Components used:** `Badge` from `src/components/ui/badge.jsx`, `motion` from `framer-motion`, data from `src/data/projects.js`

- [ ] **Step 1: Rewrite ProjectSection.jsx**

```jsx
// src/components/ProjectSection.jsx
import { ArrowRight, ExternalLink, Github, Star } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import projects from "@/data/projects";

const ProjectSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills in web development,
            from responsive frontends to full-stack applications.
          </p>
        </motion.div>

        {/* Grid Layout — featured project spans 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={
                project.featured
                  ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }
            >
              <Link to={`/projects/${project.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-xl bg-card border border-border card-hover h-full">
                  {/* Project Image */}
                  <div
                    className={`overflow-hidden ${
                      project.featured ? "h-64 lg:h-80" : "h-48"
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {project.featured && (
                      <div className="flex items-center gap-1 text-primary mb-2">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-medium">Featured</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Detail <ArrowRight size={14} />
                      </span>
                      <div className="flex gap-3 ml-auto">
                        <span
                          onClick={(e) => e.stopPropagation()}
                          className="text-foreground/60 hover:text-primary transition-colors"
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </span>
                        <span
                          onClick={(e) => e.stopPropagation()}
                          className="text-foreground/60 hover:text-primary transition-colors"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={18} />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            href="https://github.com/ibayers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;
```

- [ ] **Step 2: Verify it renders**

Run: `npm run dev`
Expected: Home page loads, Project section shows 5 cards with stagger animation. Featured project spans 2 columns.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectSection.jsx
git commit -m "feat: rebuild project section with bento layout, stagger animation, and 5 projects"
```

---

## Phase 3: Certificate Section (Home Page)

### Task 5: Rebuild certifSection with Tabs + Animated Grid

**Files:**
- Modify: `src/components/certifSection.jsx`
- Modify: `src/Pages/home.jsx` (update import name)

**Components used:** `Tabs/TabsList/TabsTrigger/TabsContent` from `src/components/ui/tabs.jsx`, `Badge` from `src/components/ui/badge.jsx`, `motion` + `AnimatePresence` from `framer-motion`

- [ ] **Step 1: Rewrite certifSection.jsx**

```jsx
// src/components/certifSection.jsx
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import certificates from "@/data/certificates";

const categories = ["Semua", "Cloud", "Web", "AI", "Other"];

const CertificateCard = ({ cert }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <Link to={`/certificates/${cert.slug}`} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-card border border-border card-hover">
        {/* Certificate Image */}
        <div className="h-40 overflow-hidden">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-primary text-sm font-medium flex items-center gap-1">
              <Eye size={14} /> View Detail
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Badge variant="outline" className="mb-2 text-xs">
            {cert.category}
          </Badge>
          <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
            {cert.title}
          </h3>
          <p className="text-muted-foreground text-xs">
            {cert.issuer} — {cert.date}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
);

const CertificateSection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredCerts =
    activeCategory === "Semua"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  return (
    <section id="certificates" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and courses I have completed to
            continuously improve my skills.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="mx-auto flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
```

- [ ] **Step 2: Update home.jsx import**

In `src/Pages/home.jsx`:

```jsx
// BEFORE:
import CircularGalleryDemo from "../components/certifSection";

// AFTER:
import CertificateSection from "../components/certifSection";
```

In JSX:

```jsx
// BEFORE:
<CircularGalleryDemo />

// AFTER:
<CertificateSection />
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Expected: Certificate section shows with filter tabs. Clicking a tab filters certificates with animation.

- [ ] **Step 4: Commit**

```bash
git add src/components/certifSection.jsx src/Pages/home.jsx
git commit -m "feat: rebuild certificate section with tabs filter and animated grid"
```

---

## Phase 4: Experience Section (Home Page)

### Task 6: Create ExperienceSection with Tracing Beam + Magic Card

**Files:**
- Create: `src/components/ExperienceSection.jsx`
- Modify: `src/Pages/home.jsx` (add import + JSX)
- Modify: `src/components/Navbar.jsx` (add nav links)

**Components used:** `TracingBeam` from `src/components/ui/tracing-beam.jsx`, `MagicCard` from `src/components/ui/magic-card.jsx`, `NumberTicker` from `src/components/ui/number-ticker.jsx`, `Badge` from `src/components/ui/badge.jsx`

- [ ] **Step 1: Create ExperienceSection.jsx**

```jsx
// src/components/ExperienceSection.jsx
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TracingBeam } from "@/components/ui/tracing-beam";
import experiences from "@/data/experiences";

const ExperienceSection = () => {
  return (
    <section id="experiences" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the experiences that have shaped my
            career as a developer.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="flex justify-center gap-12 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              <NumberTicker value={3} />
            </div>
            <p className="text-muted-foreground text-sm">Experiences</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              <NumberTicker value={5} />+
            </div>
            <p className="text-muted-foreground text-sm">Projects</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              <NumberTicker value={11} />
            </div>
            <p className="text-muted-foreground text-sm">Certificates</p>
          </div>
        </div>

        {/* Timeline with Tracing Beam */}
        <div className="max-w-3xl mx-auto">
          <TracingBeam>
            <div className="flex flex-col gap-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/experiences/${exp.slug}`}>
                    <MagicCard
                      className="cursor-pointer rounded-xl p-6 bg-card border border-border"
                      gradientSize={300}
                      gradientColor="rgba(139, 92, 246, 0.15)"
                    >
                      <div className="relative z-40">
                        <Badge variant="outline" className="mb-3">
                          {exp.type}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium text-sm mb-2">
                          {exp.company}
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {exp.location}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {exp.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Detail <ArrowRight size={14} />
                        </span>
                      </div>
                    </MagicCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
```

- [ ] **Step 2: Add ExperienceSection to home.jsx**

In `src/Pages/home.jsx`, add import and place between SkillSection and ProjectSection:

```jsx
// Add import at top:
import ExperienceSection from "../components/ExperienceSection";

// In JSX, update order:
<SkillSection />
<ExperienceSection />
<ProjectSection />
```

- [ ] **Step 3: Update Navbar navItems**

In `src/components/Navbar.jsx`, update the navItems array:

```jsx
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experiences" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];
```

- [ ] **Step 4: Verify it renders**

Run: `npm run dev`
Expected: Experience section appears with Tracing Beam timeline, Magic Cards with gradient hover, and Number Ticker counters.

- [ ] **Step 5: Commit**

```bash
git add src/components/ExperienceSection.jsx src/Pages/home.jsx src/components/Navbar.jsx
git commit -m "feat: add experience section with tracing beam timeline and magic cards"
```

---

## Phase 5: Detail Pages

### Task 7: Create Project Detail Page

**Files:**
- Create: `src/Pages/ProjectDetail.jsx`

**Components used:** `Spotlight` from `src/components/ui/spotlight.jsx`, `TextGenerateEffect` from `src/components/ui/text-generate-effect.jsx`, `Badge` from `src/components/ui/badge.jsx`, Lightbox from `yet-another-react-lightbox`

- [ ] **Step 1: Create ProjectDetail.jsx**

```jsx
// src/Pages/ProjectDetail.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, CheckCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import projects from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { detail } = project;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-32 px-4">
        <Spotlight
          className="-top-40 left-0 md:left-60"
          fill="hsl(var(--primary))"
        />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <TextGenerateEffect
            words={project.title}
            className="text-4xl md:text-5xl font-bold"
          />
          <p className="text-muted-foreground mt-4 text-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button flex items-center gap-2"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-border font-medium transition-all hover:bg-muted flex items-center gap-2"
            >
              <Github size={16} /> Source Code
            </a>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto max-w-4xl px-4 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden border border-border shadow-lg cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {detail.overview}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Challenges</h2>
              <p className="text-muted-foreground leading-relaxed">
                {detail.challenges}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {detail.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <CheckCircle
                      size={18}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {detail.techStack.map((tech) => (
                  <Badge key={tech.name} variant="outline">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-semibold mb-4">Links</h3>
              <div className="space-y-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={16} /> Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={detail.screenshots.map((s) => ({ src: s }))}
      />
    </div>
  );
};

export default ProjectDetail;
```

- [ ] **Step 2: Commit**

```bash
git add src/Pages/ProjectDetail.jsx
git commit -m "feat: add project detail page with spotlight, text generate, and lightbox"
```

---

### Task 8: Create Certificate Detail Page

**Files:**
- Create: `src/Pages/CertificateDetail.jsx`

- [ ] **Step 1: Create CertificateDetail.jsx**

```jsx
// src/Pages/CertificateDetail.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Calendar, Building2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import certificates from "@/data/certificates";

const CertificateDetail = () => {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const cert = certificates.find((c) => c.slug === slug);

  if (!cert) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Certificate Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4">
              {cert.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {cert.title}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Building2 size={16} /> {cert.issuer}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {cert.date}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Image */}
      <div className="container mx-auto max-w-4xl px-4 -mt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-border shadow-lg cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full object-contain max-h-[600px] bg-card"
          />
        </motion.div>
      </div>

      {/* Details */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="rounded-xl bg-card border border-border p-8">
          <h2 className="text-xl font-semibold mb-4">About this Certificate</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {cert.description}
          </p>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button inline-flex items-center gap-2"
            >
              <ExternalLink size={16} /> Verify Credential
            </a>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: cert.image }]}
      />
    </div>
  );
};

export default CertificateDetail;
```

- [ ] **Step 2: Commit**

```bash
git add src/Pages/CertificateDetail.jsx
git commit -m "feat: add certificate detail page with lightbox zoom"
```

---

### Task 9: Create Experience Detail Page

**Files:**
- Create: `src/Pages/ExperienceDetail.jsx`

- [ ] **Step 1: Create ExperienceDetail.jsx**

```jsx
// src/Pages/ExperienceDetail.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import experiences from "@/data/experiences";

const ExperienceDetail = () => {
  const { slug } = useParams();
  const exp = experiences.find((e) => e.slug === slug);

  if (!exp) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Experience Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <Badge variant="outline" className="mb-4">
            {exp.type}
          </Badge>

          <TextGenerateEffect
            words={exp.title}
            className="text-4xl md:text-5xl font-bold"
          />

          <p className="text-primary font-medium text-lg mt-2">
            {exp.company}
          </p>

          <div className="flex items-center gap-6 text-muted-foreground mt-4">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {exp.period}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {exp.location}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <TracingBeam>
          <div className="space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Role Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
              <ul className="space-y-4">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <CheckCircle
                      size={18}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {exp.techStack.map((tech) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="secondary" className="text-sm px-4 py-2">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};

export default ExperienceDetail;
```

- [ ] **Step 2: Commit**

```bash
git add src/Pages/ExperienceDetail.jsx
git commit -m "feat: add experience detail page with tracing beam and text generate"
```

---

## Phase 6: Routing & Final Integration

### Task 10: Add Routes

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx with new routes**

```jsx
// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Notfound from "./Pages/Notfound";
import ProjectDetail from "./Pages/ProjectDetail";
import CertificateDetail from "./Pages/CertificateDetail";
import ExperienceDetail from "./Pages/ExperienceDetail";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="certificates/:slug" element={<CertificateDetail />} />
          <Route path="experiences/:slug" element={<ExperienceDetail />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
```

- [ ] **Step 2: Final verification**

Run: `npm run dev`

Check:
- Home page loads with all sections in order: Hero, About, Skills, Experience, Projects, Certificates, Contact, Footer
- Clicking a project card navigates to `/projects/:slug`
- Clicking a certificate card navigates to `/certificates/:slug`
- Clicking an experience card navigates to `/experiences/:slug`
- "Back to Portfolio" link returns to home page
- Invalid slug shows "Not Found" message
- All animations work (stagger, text generate, number ticker, magic card gradient)
- Dark/light mode toggle works on all pages

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add routes for project, certificate, and experience detail pages"
```

---

## File Summary

| Action | File | Purpose |
|--------|------|---------|
| Modify | `src/components/Navbar.jsx` | Fix scrollY bug, add Experience & Certificates nav links |
| Modify | `src/components/ProjectSection.jsx` | Rebuild with bento layout + stagger animation |
| Modify | `src/components/certifSection.jsx` | Rebuild with tabs filter + animated grid |
| Modify | `src/components/ui/magic-card.jsx` | Fix next-themes dependency |
| Modify | `src/App.jsx` | Add 3 new routes |
| Modify | `src/Pages/home.jsx` | Add ExperienceSection, update cert import |
| Create | `src/data/projects.js` | 5 project data objects |
| Create | `src/data/certificates.js` | 11 certificate data objects |
| Create | `src/data/experiences.js` | 3 experience data objects |
| Create | `src/components/ExperienceSection.jsx` | Timeline with Tracing Beam + Magic Card |
| Create | `src/Pages/ProjectDetail.jsx` | Project detail with Spotlight + Lightbox |
| Create | `src/Pages/CertificateDetail.jsx` | Certificate detail with Lightbox zoom |
| Create | `src/Pages/ExperienceDetail.jsx` | Experience detail with Tracing Beam |

**Total: 6 modified files, 7 new files, 13 files touched**
