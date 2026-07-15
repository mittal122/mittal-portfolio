import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Boxes, GitBranch, Server, Cloud, LineChart, Mail, Container, ExternalLink, ChevronRight } from 'lucide-react';
import CardSwap, { Card } from '@/components/CardSwap';
import TrueFocus from '@/components/TrueFocus';

// Unified purple accent palette
const accent = '#CF9EFF';
const accentDim = 'rgba(207,158,255,';

// Main ExperiencePage Component
const ExperiencePage = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Helmsman — AI Kubernetes Deployment Platform',
      company: 'Open Source',
      location: 'GitHub',
      period: '2026',
      type: 'DevOps Platform',
      icon: Boxes,
      link: 'https://github.com/mittal122/helmsman',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&q=80',
      description: 'A platform that guides a developer through the full Kubernetes deploy lifecycle — containerize, generate manifests, scan, deploy, verify, and self-heal — with every command and error streamed live to the UI.',
      technologies: ['Python', 'FastAPI', 'Kubernetes', 'Docker', 'Helm', 'kind'],
      achievements: [
        'Deterministic, tested core touches the cluster; the LLM stays advisory and never writes applied YAML',
        'Deploy from a container image or straight from a Git repo — builds the Dockerfile and loads it locally, no registry needed',
        'Renders multi-service docker-compose stacks as per-service Helm releases in one namespace',
      ]
    },
    {
      id: 2,
      title: 'AutoSRE — Autonomous GitOps & Auto-Remediation',
      company: 'Open Source',
      location: 'GitHub',
      period: '2026',
      type: 'SRE / GitOps',
      icon: GitBranch,
      link: 'https://github.com/mittal122/Autonomous-GitOps-Auto-Remediation-Platform',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop&q=80',
      description: 'A closed-loop SRE control plane that watches a Kubernetes cluster, diagnoses failures, and applies safe GitOps-native remediations with rollback — escalating to a human only when it cannot fix an issue.',
      technologies: ['Go', 'Python', 'Terraform', 'ArgoCD', 'Helm', 'Kubernetes'],
      achievements: [
        'Detect → Diagnose → Decide → Remediate → Verify control loop',
        'Go controller for telemetry ingestion and remediation, Python LLM service for root-cause diagnosis',
        'EKS cluster, IAM, and networking provisioned as immutable infrastructure with Terraform',
      ]
    },
    {
      id: 3,
      title: 'KubeChat — Microservices Chat on AWS EKS',
      company: 'Open Source',
      location: 'GitHub',
      period: '2026',
      type: 'Cloud-Native Microservices',
      icon: Server,
      link: 'https://github.com/mittal122/kubechat-microservices',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop&q=80',
      description: 'A real-time chat platform built as independent microservices on AWS EKS, communicating over WebSocket, with a full CI/CD pipeline and observability stack.',
      technologies: ['Kubernetes', 'AWS EKS', 'Docker', 'Jenkins', 'WebSocket', 'Prometheus', 'Grafana', 'Loki'],
      achievements: [
        'Independent microservices on AWS EKS communicating over WebSocket',
        'Automated build and deploy via a Jenkins pipeline with multiple documented deploy paths',
        'Metrics and log-based incident detection with Prometheus, Grafana, and Loki; load-tested with k6',
      ]
    },
    {
      id: 4,
      title: 'CloudScope — AWS Infrastructure Intelligence',
      company: 'Open Source',
      location: 'GitHub',
      period: '2026',
      type: 'Cloud Observability',
      icon: Cloud,
      link: 'https://github.com/mittal122/The-Interdictor-Track',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
      description: 'A platform that turns raw AWS telemetry into readable diagrams and actionable insight — real-time visibility, cost-waste detection, and automated security analysis.',
      technologies: ['TypeScript', 'Node.js', 'NVIDIA NIM', 'Docker', 'Prometheus', 'Terraform'],
      achievements: [
        'AI-organized 3D isometric infrastructure maps (Networking → Compute → Data) using NVIDIA NIM',
        'Flags orphaned EBS volumes, idle EC2, and leftover load balancers to cut cloud waste',
        'Reverse-Terraform: exports live AWS config into HCL for disaster recovery and cloning',
      ]
    },
    {
      id: 5,
      title: 'AI Trading Platform',
      company: 'Open Source',
      location: 'GitHub',
      period: '2026',
      type: 'AI / Full-Stack',
      icon: LineChart,
      link: 'https://github.com/mittal122/AI-Trading-Platform',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
      description: 'An AI-powered algorithmic trading terminal for crypto with live market data, rule-based strategies, backtesting, and LLM-assisted analysis — paper trading by default.',
      technologies: ['FastAPI', 'PyTorch', 'React', 'PostgreSQL', 'Docker', 'Binance API'],
      achievements: [
        'Live candlestick charts, order-book pressure, funding, and a volume-spike scanner',
        'Eight rule-based strategies plus a Smart Money Concepts engine and pattern recognition',
        'OHLCV foundation model for price forecasting, with backtesting and portfolio analytics',
      ]
    },
    {
      id: 6,
      title: 'Job Finder — Multi-Tenant Email Outreach',
      company: 'Open Source',
      location: 'GitHub',
      period: '2026',
      type: 'Full-Stack SaaS',
      icon: Mail,
      link: 'https://github.com/mittal122/job-finder',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&q=80',
      description: 'A multi-user tool where each account is a fully isolated tenant — connect a Gmail account, generate a personalized message per recipient, and send with configurable pacing and a unified history.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'REST APIs'],
      achievements: [
        'Full multi-tenant data isolation with email/password and Google sign-in',
        'Credentials and API keys encrypted at rest; signed unsubscribe links and a suppression list',
        'LLM-personalized bulk send with Excel-to-placeholder mapping and saveable presets',
      ]
    },
    {
      id: 7,
      title: 'Jenkins CI/CD Pipeline',
      company: 'Open Source',
      location: 'GitHub',
      period: '2025',
      type: 'CI/CD',
      icon: Container,
      link: 'https://github.com/mittal122/jenkins-cicd-pipeline',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      description: 'A containerized Django application shipped through a full Jenkins CI/CD pipeline to Kubernetes.',
      technologies: ['Python', 'Django', 'Docker', 'Kubernetes', 'Jenkins'],
      achievements: [
        'End-to-end Jenkins pipeline from build to Kubernetes deploy',
        'Containerized app with docker-compose for local development',
        'Kubernetes manifests for orchestrated deployment',
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Experience & Projects | Portfolio</title>
        <meta name="description" content="Professional experience and project showcase" />
      </Helmet>

      <div className="min-h-screen pt-[7.25rem] md:pt-[7.75rem] lg:pt-[8.5rem] pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] mx-auto mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, #CF9EFF, transparent)' }}
            />
            <div className="mb-6">
              <TrueFocus
                sentence="Experience & Projects"
                manualMode={false}
                blurAmount={5}
                borderColor="#CF9EFF"
                glowColor="rgba(207, 158, 255, 0.6)"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white"
                textStyle={{ textShadow: '0 0 50px rgba(207,158,255,0.4), 0 0 100px rgba(207,158,255,0.15)' }}
              />
            </div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(207,158,255,0.5)' }}>
              A showcase of professional work spanning cloud architecture, containerization, AI agents, and full-stack development.
            </p>
          </motion.div>

          {/* ── Split Layout: Details Left + CardSwap Right ── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">

            {/* Left Side — Active Project Detail */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Active project detail card */}
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8 mb-8"
                style={{
                  background: `${accentDim}0.04)`,
                  border: `1px solid ${accentDim}0.12)`,
                  borderRadius: '20px',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-mono tracking-wider px-3 py-1"
                    style={{
                      color: accent,
                      border: `1px solid ${accentDim}0.25)`,
                      background: `${accentDim}0.08)`,
                      borderRadius: '4px',
                    }}
                  >
                    #{String(projects[activeProject].id).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono tracking-wider" style={{ color: `${accentDim}0.4)` }}>
                    {projects[activeProject].period} · {projects[activeProject].type}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  {projects[activeProject].title}
                </h2>
                <p className="text-sm mb-5" style={{ color: `${accentDim}0.5)` }}>
                  {projects[activeProject].company}
                </p>

                <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {projects[activeProject].description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: accent }}>
                    Key Achievements
                  </h4>
                  <div className="space-y-2">
                    {projects[activeProject].achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: accent }} />
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {projects[activeProject].technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-[11px] font-mono tracking-wide"
                      style={{
                        background: `${accentDim}0.06)`,
                        color: accent,
                        border: `1px solid ${accentDim}0.18)`,
                        borderRadius: '6px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Code link */}
                {projects[activeProject].link && (
                  <a
                    href={projects[activeProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium transition-all duration-300 hover:gap-3"
                    style={{
                      color: accent,
                      border: `1px solid ${accentDim}0.3)`,
                      background: `${accentDim}0.08)`,
                      borderRadius: '8px',
                    }}
                  >
                    <ExternalLink size={15} />
                    View Code on GitHub
                  </a>
                )}
              </motion.div>

              {/* Project selector list */}
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    onClick={() => setActiveProject(index)}
                    className="cursor-target w-full text-left px-5 py-3.5 flex items-center gap-4 transition-all duration-300 group cursor-pointer"
                    style={{
                      background: activeProject === index ? `${accentDim}0.08)` : 'transparent',
                      border: `1px solid ${activeProject === index ? `${accentDim}0.2)` : `${accentDim}0.06)`}`,
                      borderRadius: '12px',
                    }}
                  >
                    <span
                      className="text-[10px] font-mono w-6 text-center flex-shrink-0"
                      style={{ color: activeProject === index ? accent : `${accentDim}0.3)` }}
                    >
                      {String(project.id).padStart(2, '0')}
                    </span>
                    <span
                      className="text-sm font-medium truncate transition-colors duration-300"
                      style={{ color: activeProject === index ? 'white' : 'rgba(255,255,255,0.45)' }}
                    >
                      {project.title}
                    </span>
                    <span
                      className="ml-auto text-[10px] font-mono flex-shrink-0"
                      style={{ color: `${accentDim}0.3)` }}
                    >
                      {project.period}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right Side — CardSwap Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div style={{ height: '650px', position: 'relative' }}>
                <CardSwap
                  cardDistance={55}
                  verticalDistance={65}
                  delay={4000}
                  pauseOnHover={true}
                  width={420}
                  height={520}
                  skewAmount={5}
                  easing="elastic"
                >
                  {projects.map((project, index) => (
                    <Card key={project.id}>
                      <div className="w-full h-full flex flex-col overflow-hidden" style={{ borderRadius: '16px' }}>
                        {/* Card image */}
                        <div className="relative h-[55%] overflow-hidden flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(to bottom, transparent 40%, #060010 100%)',
                            }}
                          />
                          <span
                            className="absolute top-4 left-4 text-[10px] font-mono tracking-wider px-2 py-1"
                            style={{
                              color: accent,
                              background: 'rgba(6,0,16,0.7)',
                              border: `1px solid ${accentDim}0.25)`,
                              borderRadius: '4px',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            #{String(project.id).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Card content */}
                        <div className="flex-1 p-5 flex flex-col justify-between" style={{ background: '#060010' }}>
                          <div>
                            <span className="text-[10px] font-mono tracking-wider block mb-2" style={{ color: `${accentDim}0.4)` }}>
                              {project.period} · {project.type}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                              {project.title}
                            </h3>
                            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                              {project.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-[9px] font-mono"
                                style={{
                                  background: `${accentDim}0.06)`,
                                  color: accent,
                                  border: `1px solid ${accentDim}0.15)`,
                                  borderRadius: '4px',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </motion.div>
          </div>

          {/* ── Mobile/Tablet Card Grid (shown below lg) ── */}
          <div className="lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="cursor-target group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  onClick={() => setActiveProject(index)}
                >
                  <div
                    className="relative h-full overflow-hidden transition-all duration-300"
                    style={{
                      background: `${accentDim}0.03)`,
                      border: `1px solid ${activeProject === index ? `${accentDim}0.25)` : `${accentDim}0.1)`}`,
                      borderRadius: '14px',
                    }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, #060010 100%)' }} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-xs line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[9px] font-mono"
                            style={{
                              background: `${accentDim}0.06)`,
                              color: accent,
                              border: `1px solid ${accentDim}0.15)`,
                              borderRadius: '4px',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
