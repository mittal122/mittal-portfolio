
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Award } from 'lucide-react';

const AboutPage = () => {
  const education = [
    {
      degree: 'BTech in Computer Science & Engineering',
      institution: 'Charotar University of Science and Technology',
      period: '2024 - 2027',
      icon: '🎓',
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'TAPI Diploma Engineering College',
      period: '2021 - 2024',
      icon: '📚',
    },
  ];

  const communities = [
    {
      name: 'Cyber Kavach Club',
      role: 'Active Member',
      description: 'Cybersecurity awareness and ethical hacking',
      icon: '🛡️',
      color: '#00D9FF',
    },
    {
      name: 'AIML Club',
      role: 'Member',
      description: 'Artificial Intelligence and Machine Learning initiatives',
      icon: '🤖',
      color: '#9D4EDD',
    },
    {
      name: 'Google Developer Groups',
      role: 'Community Member',
      description: 'Cloud technologies and developer ecosystem',
      icon: '🌐',
      color: '#00D9FF',
    },
  ];

  const skills = [
    { name: 'DevOps', level: 90 },
    { name: 'Cloud Architecture', level: 85 },
    { name: 'Kubernetes', level: 88 },
    { name: 'Docker', level: 92 },
    { name: 'CI/CD', level: 87 },
    { name: 'Python', level: 80 },
  ];

  return (
    <>
      <Helmet>
        <title>About - Mittal Domadiya</title>
        <meta name="description" content="Learn about Mittal Domadiya's educational background, community involvement, and technical expertise in DevOps and cloud technologies." />
      </Helmet>

      <div className="min-h-screen pt-[7.25rem] md:pt-[7.75rem] lg:pt-[8.5rem] pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white" style={{ textShadow: '0 0 40px rgba(150, 150, 150, 0.5), 0 0 80px rgba(150, 150, 150, 0.3)' }}>
              About Me
            </h1>
            <p className="text-xl text-[#888888] max-w-3xl mx-auto leading-relaxed">
              Passionate DevOps Engineer with expertise in cloud infrastructure, containerization, and automation. 
              Committed to building scalable, reliable systems and fostering collaborative development environments.
            </p>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-white" size={32} />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative pl-12 pb-8 border-l-2 border-white/30 last:border-0"
                >
                  <div className="absolute left-0 top-0 w-8 h-8 -translate-x-[17px] bg-[#1A1A1A] border-2 border-white rounded-full flex items-center justify-center text-xl">
                    {edu.icon}
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 hover:border-white/50 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-[#888888] font-medium mb-1">{edu.institution}</p>
                    <p className="text-white/60 text-sm">{edu.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community Involvement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-white" size={32} />
              <h2 className="text-3xl font-bold text-white">Community Involvement</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {communities.map((community, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 hover:border-white/50 transition-all cursor-pointer"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-5xl mb-4">{community.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{community.name}</h3>
                  <p className="text-[#888888] text-sm font-medium mb-2">{community.role}</p>
                  <p className="text-white/60 text-sm">{community.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-white" size={32} />
              <h2 className="text-3xl font-bold text-white">Core Competencies</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                  className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-white font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-[#0F0F0F] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.05 }}
                      style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
