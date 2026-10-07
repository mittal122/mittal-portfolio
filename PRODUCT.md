# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both must be served on every page:

- **Recruiters and hiring managers** (campus and off-campus) screening a DevOps / SRE / cloud candidate for an internship or first role. They skim in well under a minute and need role, stage, standout work, and a way to reach out.
- **Engineers and technical leads** who click through to GitHub to judge whether the work is real. They read project descriptions and repos and need architecture-level substance, not buzzwords.

## Product Purpose

Personal portfolio for Mittal Domadiya, a Computer Science & Engineering student (BTech, Charotar University of Science and Technology, 2024–2027; Diploma in Computer Engineering, TAPI Diploma Engineering College, 2021–2024) pursuing DevOps, SRE, and cloud roles. Success = a recruiter or engineer emails or messages Mittal for an interview or opportunity.

## Positioning

- **AI + DevOps crossover.** The project work applies AI to infrastructure operations: Helmsman (AI-guided Kubernetes deploy lifecycle with self-healing), AutoSRE (closed-loop GitOps auto-remediation with rollback and human escalation), CloudScope (AWS telemetry → diagrams, cost-waste and security analysis). This is the differentiator over student portfolios that list courses and tools.
- **Breadth plus leadership.** Technical depth backed by community roles: CyberKavach Club core team (cybersecurity awareness, OSINT, workshops), AIML Club core team (peer learning on AI and DevOps tooling), Training & Placement Cell student coordinator (placement drives, recruiter coordination).

## Operating Context

- Visitors arrive from résumés, LinkedIn, GitHub profile, and campus placement listings; many on mobile.
- Recruiters forward the link internally; engineers open project repos in new tabs.
- Deployed on Vercel as a single-page app (SPA rewrites in `vercel.json`). Stack: React 18, Vite 5, Tailwind 3, Framer Motion, GSAP, three.js, React Router, react-helmet for per-page meta.

## Capabilities and Constraints

- Routes: `/`, `/about`, `/projects` (`/experience` redirects there), `/skills`, `/certifications` (labelled "Courses"), `/contact`, and a catch-all 404.
- All displayed facts live in `src/data/profile.js`; pages render from it.
- Contact form sends through Formspree when `VITE_FORMSPREE_ID` is set (form ID is public, not a secret); without it, submit opens the visitor's mail app prefilled. Check: `node src/lib/contact.check.mjs`.
- Removed by decision (2026-10-07): the `/fun` mini-games page, the location line on Contact, the Blackpast font.
- Role line (decided): "DevOps & SRE engineer in training · BTech CSE '27 · open to full-time roles from 2027". Never "Cloud Architect", "SRE Specialist", "consulting", or "professional work".

## Brand Commitments

- Name: Mittal Domadiya.
- Contact: mittaldomadiya44@gmail.com, GitHub `mittal122`, LinkedIn `mittal-domadiya-412550310`.

## Evidence on Hand

- Seven open-source projects with GitHub links, in `src/data/profile.js`: Helmsman, AutoSRE, CloudScope, KubeChat (microservices chat on AWS EKS), AI Trading Platform (paper trading by default), Job Finder (multi-tenant email outreach), all 2026; Jenkins CI/CD Pipeline (2025). All seven were on the original site.
- Courses and badges in `src/pages/CertificationsPage.jsx`: AWS Academy Graduate – Cloud Developing; Kubernetes for the Absolute Beginners; Kubernetes Administration (CKA) course and practice tests (**exam not yet taken**); Linux Commands and Shell Scripting; Google Cloud Skill Badges.
- Education and community roles as listed above.
- **Absent, must not be fabricated:** paid work experience, employers, testimonials, project metrics or user counts, passed certification exams (CKA is not earned), headshot/photography.

## Product Principles

1. **Proof over adjectives.** Every claim points at a repo, a course, or a role. Projects lead; self-description follows.
2. **Honest about stage.** Student and early-career, said plainly. Never imply a credential, employer, or seniority that doesn't exist.
3. **Serve the skim and the dig.** A recruiter gets role, standout work, and contact in seconds; an engineer gets a direct path to architecture and code.
4. **Contact must work.** Every route ends in a way to reach Mittal that actually delivers.
