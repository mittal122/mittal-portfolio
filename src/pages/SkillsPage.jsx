
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Cloud, Container, Workflow, Code, Wrench, Brain } from 'lucide-react';

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillCategories = [
    {
      id: 'cloud',
      name: 'Cloud',
      icon: Cloud,
      color: '#ffffff',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
      skills: ['AWS', 'Amazon Redshift', 'Terraform'],
      description: 'Cloud infrastructure and services',
    },
    {
      id: 'containerization',
      name: 'Containerization',
      icon: Container,
      color: '#ffffff',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&q=80',
      skills: ['Docker', 'Kubernetes'],
      description: 'Container orchestration and management',
    },
    {
      id: 'cicd',
      name: 'CI/CD',
      icon: Workflow,
      color: '#ffffff',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop&q=80',
      skills: ['Jenkins', 'CI/CD Pipelines'],
      description: 'Continuous integration and deployment',
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: Code,
      color: '#ffffff',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop&q=80',
      skills: ['Python', 'Dart', 'SQL'],
      description: 'Programming and scripting languages',
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: Wrench,
      color: '#ffffff',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80',
      skills: ['Linux', 'Git', 'DBMS'],
      description: 'Development and system tools',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: Brain,
      color: '#ffffff',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
      skills: ['Prompt Engineering', 'Machine Learning', 'LangChain', 'RAG Concepts'],
      description: 'Emerging technologies and AI',
    },
  ];

  const connections = [
    { from: 'cloud', to: 'containerization' },
    { from: 'containerization', to: 'cicd' },
    { from: 'cicd', to: 'tools' },
    { from: 'languages', to: 'advanced' },
    { from: 'tools', to: 'languages' },
  ];

  return (
    <>
      <Helmet>
        <title>Skills - Mittal Domadiya</title>
        <meta name="description" content="Explore Mittal Domadiya's technical skills including cloud technologies, containerization, CI/CD, programming languages, and advanced AI concepts." />
      </Helmet>

      <div className="min-h-screen pt-[7.25rem] md:pt-[7.75rem] lg:pt-[8.5rem] pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white" style={{ textShadow: '0 0 40px rgba(150, 150, 150, 0.5), 0 0 80px rgba(150, 150, 150, 0.3)' }}>
              Skills & Expertise
            </h1>
            <p className="text-xl text-[#888888] max-w-3xl mx-auto">
              A comprehensive ecosystem of DevOps and cloud technologies
            </p>
          </motion.div>

          {/* 3D Network Visualization */}
          <div className="relative mb-16">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {connections.map((conn, index) => {
                const fromIndex = skillCategories.findIndex(cat => cat.id === conn.from);
                const toIndex = skillCategories.findIndex(cat => cat.id === conn.to);
                const fromX = (fromIndex % 3) * 33.33 + 16.66;
                const fromY = Math.floor(fromIndex / 3) * 50 + 25;
                const toX = (toIndex % 3) * 33.33 + 16.66;
                const toY = Math.floor(toIndex / 3) * 50 + 25;

                return (
                  <motion.line
                    key={index}
                    x1={`${fromX}%`}
                    y1={`${fromY}%`}
                    x2={`${toX}%`}
                    y2={`${toY}%`}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                );
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#888888" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid md:grid-cols-3 gap-8 relative" style={{ zIndex: 1 }}>
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    onHoverStart={() => setActiveCategory(category.id)}
                    onHoverEnd={() => setActiveCategory(null)}
                    className="relative bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all"
                    style={{
                      boxShadow: activeCategory === category.id 
                        ? `0 0 40px ${category.color}60` 
                        : `0 0 20px ${category.color}20`,
                    }}
                  >
                    {/* Glowing orb */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-8 h-8 rounded-full z-10"
                      style={{ backgroundColor: category.color }}
                      animate={{
                        scale: activeCategory === category.id ? [1, 1.2, 1] : 1,
                        boxShadow: activeCategory === category.id 
                          ? `0 0 30px ${category.color}` 
                          : `0 0 10px ${category.color}`,
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2.5 rounded-lg backdrop-blur-md"
                            style={{ backgroundColor: `${category.color}30` }}
                          >
                            <Icon style={{ color: category.color }} size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{category.name}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">

                      <p className="text-white/60 text-sm mb-4">{category.description}</p>

                      <div className="space-y-2">
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-white/80 text-sm">{skill}</span>
                        </motion.div>
                      ))}
                      </div>

                      {/* Skill level indicator */}
                      <motion.div
                        className="mt-4 h-1 bg-[#0F0F0F] rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.7 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Technology Ecosystem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Interconnected Ecosystem</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              These skills work together to create robust, scalable, and efficient DevOps solutions. 
              Each technology complements the others, forming a comprehensive toolkit for modern cloud infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SkillsPage;
