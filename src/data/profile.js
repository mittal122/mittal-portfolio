// Single source of truth for every fact the site shows.
// Pages render from here; don't restate these facts inline in JSX.
// Honesty rules (PRODUCT.md): student stage said plainly, courses are not
// certifications, no invented employers, metrics or availability claims.

export const person = {
  name: 'Mittal Domadiya',
  roleLine: "DevOps & SRE engineer in training · BTech CSE '27",
  availability: 'Open to full-time DevOps / SRE roles from 2027',
  thesis: 'I build AI-assisted tooling for Kubernetes operations, where the deterministic core acts and the model only advises.',
  summary:
    'Final-year Computer Science student focused on DevOps and cloud: building automated, observable infrastructure on AWS and Kubernetes, and learning by shipping real, self-built projects.',
  email: 'mittaldomadiya44@gmail.com',
  links: {
    github: 'https://github.com/mittal122',
    linkedin: 'https://www.linkedin.com/in/mittal-domadiya-412550310/',
  },
};

export const education = [
  {
    degree: 'BTech in Computer Science & Engineering',
    institution: 'Charotar University of Science and Technology',
    period: '2024 – 2027',
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'TAPI Diploma Engineering College',
    period: '2021 – 2024',
  },
];

export const communities = [
  { name: 'CyberKavach Club', role: 'Core Team Member', description: 'Cybersecurity awareness, OSINT, and campus workshops' },
  { name: 'AIML Club', role: 'Core Team Member', description: 'Peer-learning sessions on AI and DevOps tooling' },
  { name: 'Training & Placement Cell', role: 'Student Coordinator', description: 'Campus placement drives and recruiter coordination' },
];

// `featured` marks the AI + infrastructure projects that carry the positioning.
export const projects = [
  {
    slug: 'helmsman',
    name: 'Helmsman',
    tagline: 'AI Kubernetes deployment platform',
    kind: 'DevOps platform',
    year: '2026',
    featured: true,
    repo: 'https://github.com/mittal122/helmsman',
    summary:
      'Guides a developer through the full Kubernetes deploy lifecycle (containerize, generate manifests, scan, deploy, verify, self-heal) with every command and error streamed live to the UI.',
    stack: ['Python', 'FastAPI', 'Kubernetes', 'Docker', 'Helm', 'kind'],
    highlights: [
      'Deterministic, tested core touches the cluster; the LLM stays advisory and never writes applied YAML',
      'Deploy from a container image or straight from a Git repo: builds the Dockerfile and loads it locally, no registry needed',
      'Renders multi-service docker-compose stacks as per-service Helm releases in one namespace',
    ],
  },
  {
    slug: 'autosre',
    name: 'AutoSRE',
    tagline: 'Autonomous GitOps & auto-remediation',
    kind: 'SRE / GitOps',
    year: '2026',
    featured: true,
    repo: 'https://github.com/mittal122/Autonomous-GitOps-Auto-Remediation-Platform',
    summary:
      'A closed-loop SRE control plane that watches a Kubernetes cluster, diagnoses failures, and applies safe GitOps-native remediations with rollback, escalating to a human only when it cannot fix an issue.',
    stack: ['Go', 'Python', 'Terraform', 'ArgoCD', 'Helm', 'Kubernetes'],
    loop: ['Detect', 'Diagnose', 'Decide', 'Remediate', 'Verify'],
    highlights: [
      'Detect → Diagnose → Decide → Remediate → Verify control loop',
      'Go controller for telemetry ingestion and remediation, Python LLM service for root-cause diagnosis',
      'EKS cluster, IAM, and networking provisioned as immutable infrastructure with Terraform',
    ],
  },
  {
    slug: 'cloudscope',
    name: 'CloudScope',
    tagline: 'AWS infrastructure intelligence',
    kind: 'Cloud observability',
    year: '2026',
    featured: true,
    repo: 'https://github.com/mittal122/The-Interdictor-Track',
    summary:
      'Turns raw AWS telemetry into readable diagrams and actionable insight: real-time visibility, cost-waste detection, and automated security analysis.',
    stack: ['TypeScript', 'Node.js', 'NVIDIA NIM', 'Docker', 'Prometheus', 'Terraform'],
    highlights: [
      'AI-organized 3D isometric infrastructure maps (Networking → Compute → Data) using NVIDIA NIM',
      'Flags orphaned EBS volumes, idle EC2, and leftover load balancers to cut cloud waste',
      'Reverse-Terraform: exports live AWS config into HCL for disaster recovery and cloning',
    ],
  },
  {
    slug: 'kubechat',
    name: 'KubeChat',
    tagline: 'Microservices chat on AWS EKS',
    kind: 'Cloud-native microservices',
    year: '2026',
    repo: 'https://github.com/mittal122/kubechat-microservices',
    summary:
      'A real-time chat platform built as independent microservices on AWS EKS, communicating over WebSocket, with a full CI/CD pipeline and observability stack.',
    stack: ['Kubernetes', 'AWS EKS', 'Docker', 'Jenkins', 'WebSocket', 'Prometheus', 'Grafana', 'Loki'],
    highlights: [
      'Independent microservices on AWS EKS communicating over WebSocket',
      'Automated build and deploy via a Jenkins pipeline with multiple documented deploy paths',
      'Metrics and log-based incident detection with Prometheus, Grafana, and Loki; load-tested with k6',
    ],
  },
  {
    slug: 'ai-trading-platform',
    name: 'AI Trading Platform',
    short: 'AI Trading',
    tagline: 'Algorithmic crypto trading terminal',
    kind: 'AI / full-stack',
    year: '2026',
    repo: 'https://github.com/mittal122/AI-Trading-Platform',
    summary:
      'An AI-powered algorithmic trading terminal for crypto with live market data, rule-based strategies, backtesting, and LLM-assisted analysis. Paper trading by default.',
    stack: ['FastAPI', 'PyTorch', 'React', 'PostgreSQL', 'Docker', 'Binance API'],
    highlights: [
      'Live candlestick charts, order-book pressure, funding, and a volume-spike scanner',
      'Eight rule-based strategies plus a Smart Money Concepts engine and pattern recognition',
      'OHLCV foundation model for price forecasting, with backtesting and portfolio analytics',
    ],
  },
  {
    slug: 'job-finder',
    name: 'Job Finder',
    tagline: 'Multi-tenant email outreach',
    kind: 'Full-stack SaaS',
    year: '2026',
    repo: 'https://github.com/mittal122/job-finder',
    summary:
      'A multi-user tool where each account is a fully isolated tenant: connect a Gmail account, generate a personalized message per recipient, and send with configurable pacing and a unified history.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'REST APIs'],
    highlights: [
      'Full multi-tenant data isolation with email/password and Google sign-in',
      'Credentials and API keys encrypted at rest; signed unsubscribe links and a suppression list',
      'LLM-personalized bulk send with Excel-to-placeholder mapping and saveable presets',
    ],
  },
  {
    slug: 'jenkins-cicd',
    name: 'Jenkins CI/CD Pipeline',
    short: 'Jenkins CI/CD',
    tagline: 'Django to Kubernetes, end to end',
    kind: 'CI/CD',
    year: '2025',
    repo: 'https://github.com/mittal122/jenkins-cicd-pipeline',
    summary: 'A containerized Django application shipped through a full Jenkins CI/CD pipeline to Kubernetes.',
    stack: ['Python', 'Django', 'Docker', 'Kubernetes', 'Jenkins'],
    highlights: [
      'End-to-end Jenkins pipeline from build to Kubernetes deploy',
      'Containerized app with docker-compose for local development',
      'Kubernetes manifests for orchestrated deployment',
    ],
  },
];

// Courses and badges. None of these is a passed certification exam.
export const courses = [
  { title: 'AWS Academy Graduate – Cloud Developing', provider: 'AWS Academy', year: '2024', kind: 'Course', topics: ['AWS', 'EC2', 'S3', 'Lambda'] },
  { title: 'Kubernetes for the Absolute Beginners – Hands-on', provider: 'Udemy', year: '2024', kind: 'Course', topics: ['Pods', 'Deployments', 'Services'] },
  { title: 'Kubernetes Administration (CKA) – Course & Practice Tests', provider: 'Udemy', year: '2025', kind: 'Course', note: 'Exam not yet taken', topics: ['Cluster management', 'Troubleshooting', 'Security'] },
  { title: 'Linux Commands and Shell Scripting – Hands-on', provider: 'Coursera', year: '2024', kind: 'Course', topics: ['Linux', 'Bash', 'Shell scripting'] },
  { title: 'Google Cloud Skill Badges', provider: 'Google Cloud', year: '2024', kind: 'Skill badges', topics: ['GCP services', 'Hands-on labs'] },
];

// Grouped toolkit. No self-rated percentages: the projects are the evidence.
export const toolkit = [
  { group: 'Cloud', items: ['AWS (EC2, EKS, S3, IAM, VPC, Lambda)', 'Amazon Redshift', 'Google Cloud'] },
  { group: 'Containers & orchestration', items: ['Docker', 'Kubernetes', 'Helm', 'kind / minikube'] },
  { group: 'IaC & CI/CD', items: ['Terraform', 'GitHub Actions', 'Jenkins', 'ArgoCD', 'Git'] },
  { group: 'Observability', items: ['Prometheus', 'Grafana', 'Loki', 'Linux'] },
  { group: 'Languages', items: ['Go', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { group: 'AI & backend', items: ['Node.js', 'FastAPI', 'PostgreSQL', 'LangGraph', 'Google Gemini API', 'NVIDIA NIM'] },
];
