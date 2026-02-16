import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase, Bot, Video, Camera } from 'lucide-react';

// Category color mapping for accent bars
const categoryColors = {
  'Cloud Architecture': {
    accent: '#0EA5E9', // Sky blue
    glow: 'rgba(14, 165, 233, 0.3)'
  },
  'Containerized Deployment': {
    accent: '#10B981', // Green
    glow: 'rgba(16, 185, 129, 0.3)'
  },
  'Full-Stack Kubernetes Project': {
    accent: '#10B981', // Green
    glow: 'rgba(16, 185, 129, 0.3)'
  },
  'Software Development': {
    accent: '#10B981', // Green
    glow: 'rgba(16, 185, 129, 0.3)'
  },
  'Mobile Development': {
    accent: '#8B5CF6', // Purple
    glow: 'rgba(139, 92, 246, 0.3)'
  },
  'AI Agent': {
    accent: '#8B5CF6', // Purple
    glow: 'rgba(139, 92, 246, 0.3)'
  }
};

// Simple Project Card Component with Subtle Animations
const ProjectCard = ({ project, index }) => {
  const colors = categoryColors[project.type] || categoryColors['Software Development'];
  
  return (
    <motion.div 
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-black/40 border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:shadow-2xl">
        {/* Color-coded accent bar at top */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
          style={{
            backgroundColor: colors.accent,
            boxShadow: `0 0 20px ${colors.glow}`
          }}
        />
        
        {/* Card content */}
        <div className="p-6 flex flex-col h-full">
          {/* Header: Serial Number + Title */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span 
                className="text-xs font-mono tracking-wider px-2 py-1 rounded border"
                style={{
                  color: colors.accent,
                  borderColor: colors.accent,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}
              >
                #{String(project.id).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                {project.period.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="text-xs text-white/50 mt-1">{project.company}</p>
          </div>
          
          {/* Project Image */}
          <div className="mb-4 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
              style={{
                border: `1px solid ${colors.accent}30`
              }}
            />
          </div>
          
          {/* Description (2 lines max) */}
          <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4 flex-grow">
            {project.description}
          </p>
          
          {/* Tech Stack (static chips) */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <div
                key={i}
                className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wide"
                style={{
                  backgroundColor: `${colors.accent}15`,
                  color: colors.accent,
                  border: `1px solid ${colors.accent}30`
                }}
              >
                {tech}
              </div>
            ))}
            {project.technologies.length > 3 && (
              <div
                className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wide text-white/40"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                +{project.technologies.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main ExperiencePage Component
const ExperiencePage = () => {
  const projects = [
    {
      id: 1,
      title: 'AWS Redshift Cloud Project',
      company: 'Freelance/Client Work',
      location: 'USA',
      period: '2025',
      type: 'Cloud Architecture',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
      description: 'Configured Amazon Redshift for large-scale analytics workloads, optimizing query performance and data warehouse architecture.',
      technologies: ['AWS Redshift', 'SQL', 'Data Warehousing', 'Cloud Architecture'],
      achievements: [
        'Optimized query performance by 40%',
        'Implemented automated data pipelines',
        'Reduced infrastructure costs by 25%',
      ]
    },
    {
      id: 2,
      title: 'Kubernetes & Docker Project',
      company: 'PDF to Document Converter',
      location: 'Surat',
      period: '2025',
      type: 'Containerized Deployment',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&q=80',
      description: 'Built and deployed a containerized PDF conversion service using Kubernetes orchestration and Docker containers.',
      technologies: ['Kubernetes', 'Docker', 'Python', 'Microservices'],
      achievements: [
        'Deployed scalable microservices architecture',
        'Implemented CI/CD pipelines',
        'Achieved 99.9% uptime',
      ]
    },
    {
      id: 3,
      title: 'Real-Time Chat Application',
      company: 'WhatsApp-like Messaging Platform',
      location: 'Kubernetes Deployment',
      period: '2025',
      type: 'Full-Stack Kubernetes Project',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop&q=80',
      description: 'Developed and deployed a real-time chat application similar to WhatsApp using Node.js, MongoDB, and Kubernetes orchestration with advanced messaging features.',
      technologies: ['Kubernetes', 'Node.js', 'MongoDB', 'Socket.io', 'WebSockets'],
      achievements: [
        'Real-time typing indicators and presence status',
        'Message read/seen receipts functionality',
        'Scalable microservices architecture on Kubernetes',
      ]
    },
    {
      id: 4,
      title: 'Python Developer Intern',
      company: 'Tech Solutions',
      location: 'Surat',
      period: '2022',
      type: 'Software Development',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop&q=80',
      description: 'Developed Python-based automation scripts and backend services for enterprise applications.',
      technologies: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
      achievements: [
        'Automated 15+ manual processes',
        'Built RESTful APIs for client applications',
        'Improved code efficiency by 30%',
      ]
    },
    {
      id: 5,
      title: 'Flutter Developer Intern',
      company: 'Mobile Innovations',
      location: 'Surat',
      period: '2023',
      type: 'Mobile Development',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
      description: 'Created cross-platform mobile applications using Flutter framework with focus on user experience.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Mobile UI/UX'],
      achievements: [
        'Developed 3 production mobile apps',
        'Implemented real-time features with Firebase',
        'Maintained 4.5+ star ratings',
      ]
    },
    {
      id: 6,
      title: 'Script to Video Agent',
      company: 'AI Automation Project',
      location: 'Remote',
      period: '2025',
      type: 'AI Agent',
      icon: Video,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&q=80',
      description: 'AI-powered Python agent that transforms written scripts into professional videos with automated scene generation, voiceover, and visual effects.',
      technologies: ['Python', 'AI/ML', 'Video Generation', 'Text-to-Speech'],
      achievements: [
        'Automated script-to-video generation pipeline',
        'AI-driven scene composition and transitions',
        'Text-to-speech integration for narration',
      ]
    },
    {
      id: 7,
      title: 'Virtual Try-On Studio',
      company: 'AI Fashion Agent',
      location: 'Remote',
      period: '2025',
      type: 'AI Agent',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      description: 'Professional AI agent for studio-level clothing photography with model face integration and style customization.',
      technologies: ['Python', 'Computer Vision', 'Image Gen', 'FastAPI'],
      achievements: [
        'Studio-quality clothing visualization',
        'Custom model face integration',
        'Professional photography automation',
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white" style={{ textShadow: '0 0 40px rgba(150, 150, 150, 0.5), 0 0 80px rgba(150, 150, 150, 0.3)' }}>
              Experience & Projects
            </h1>
            <p className="text-xl text-[#888888] max-w-3xl mx-auto">
              A showcase of professional work spanning cloud architecture, containerization, AI agents, and full-stack development.
            </p>
          </motion.div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


export default ExperiencePage;
