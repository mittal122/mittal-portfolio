
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Cloud, Container, Workflow, Code, Wrench, Brain } from 'lucide-react';

const accent = '#CF9EFF';
const accentDim = 'rgba(207,158,255,';

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillCategories = [
    {
      id: 'cloud',
      name: 'Cloud',
      icon: Cloud,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
      skills: ['AWS', 'Amazon Redshift', 'Terraform'],
      description: 'Cloud infrastructure and services',
    },
    {
      id: 'containerization',
      name: 'Containerization',
      icon: Container,
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&q=80',
      skills: ['Docker', 'Kubernetes'],
      description: 'Container orchestration and management',
    },
    {
      id: 'cicd',
      name: 'CI/CD',
      icon: Workflow,
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop&q=80',
      skills: ['Jenkins', 'CI/CD Pipelines'],
      description: 'Continuous integration and deployment',
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop&q=80',
      skills: ['Python', 'Dart', 'SQL'],
      description: 'Programming and scripting languages',
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80',
      skills: ['Linux', 'Git', 'DBMS'],
      description: 'Development and system tools',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: Brain,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
      skills: ['Prompt Engineering', 'Machine Learning', 'LangChain', 'RAG Concepts'],
      description: 'Emerging technologies and AI',
    },
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
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
              style={{ textShadow: `0 0 50px ${accentDim}0.4), 0 0 100px ${accentDim}0.15)` }}
            >
              Skills & Expertise
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: `${accentDim}0.5)` }}>
              A comprehensive ecosystem of DevOps and cloud technologies
            </p>
          </motion.div>

          {/* Skill Cards Grid */}
          <div className="grid md:grid-cols-3 gap-7 mb-16">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setActiveCategory(category.id)}
                  onHoverEnd={() => setActiveCategory(null)}
                  className="cursor-target relative overflow-hidden cursor-pointer transition-all group"
                  style={{
                    background: `${accentDim}0.03)`,
                    border: `1px solid ${accentDim}${isActive ? '0.3' : '0.12'})`,
                    borderRadius: '14px',
                    boxShadow: isActive
                      ? `0 0 35px ${accentDim}0.12), 0 8px 30px ${accentDim}0.08)`
                      : `0 0 15px ${accentDim}0.03)`,
                  }}
                >
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, #060010 5%, rgba(6,0,16,0.5) 50%, transparent)',
                      }}
                    />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2.5"
                          style={{
                            background: `${accentDim}0.15)`,
                            border: `1px solid ${accentDim}0.25)`,
                            borderRadius: '10px',
                          }}
                        >
                          <Icon style={{ color: accent }} size={22} />
                        </div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm mb-4" style={{ color: `${accentDim}0.45)` }}>{category.description}</p>

                    <div className="space-y-2">
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: index * 0.08 + i * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{skill}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Skill bar */}
                    <motion.div
                      className="mt-5 h-[2px] rounded-full overflow-hidden"
                      style={{ background: `${accentDim}0.08)` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.08 + 0.4 }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${accent}, #9B59B6)` }}
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: index * 0.08 + 0.6 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Technology Ecosystem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Interconnected Ecosystem</h2>
            <p className="max-w-2xl mx-auto" style={{ color: `${accentDim}0.45)` }}>
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
