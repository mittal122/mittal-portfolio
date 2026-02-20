
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
    },
    {
      name: 'AIML Club',
      role: 'Member',
      description: 'Artificial Intelligence and Machine Learning initiatives',
      icon: '🤖',
    },
    {
      name: 'Google Developer Groups',
      role: 'Community Member',
      description: 'Cloud technologies and developer ecosystem',
      icon: '🌐',
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
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] mx-auto mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, #CF9EFF, transparent)' }}
            />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
              style={{ textShadow: '0 0 50px rgba(207,158,255,0.4), 0 0 100px rgba(207,158,255,0.15)' }}
            >
              About Me
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(207,158,255,0.5)' }}>
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
              <GraduationCap style={{ color: '#CF9EFF' }} size={28} />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative pl-12 pb-8 last:pb-0"
                  style={{ borderLeft: '2px solid rgba(207,158,255,0.2)' }}
                >
                  <div
                    className="absolute left-0 top-0 w-8 h-8 -translate-x-[17px] flex items-center justify-center text-xl"
                    style={{
                      background: '#0d0518',
                      border: '2px solid #CF9EFF',
                      borderRadius: '50%',
                      boxShadow: '0 0 15px rgba(207,158,255,0.3)',
                    }}
                  >
                    {edu.icon}
                  </div>
                  <div
                    className="p-6 transition-all duration-300 hover:translate-x-1"
                    style={{
                      background: 'rgba(207,158,255,0.04)',
                      border: '1px solid rgba(207,158,255,0.12)',
                      borderRadius: '12px',
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="font-medium mb-1" style={{ color: 'rgba(207,158,255,0.6)' }}>{edu.institution}</p>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{edu.period}</p>
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
              <Users style={{ color: '#CF9EFF' }} size={28} />
              <h2 className="text-3xl font-bold text-white">Community Involvement</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {communities.map((community, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="cursor-target p-6 transition-all cursor-pointer group"
                  style={{
                    background: 'rgba(207,158,255,0.04)',
                    border: '1px solid rgba(207,158,255,0.12)',
                    borderRadius: '12px',
                    boxShadow: '0 0 25px rgba(207,158,255,0.05)',
                  }}
                >
                  <div className="text-5xl mb-4">{community.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{community.name}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: '#CF9EFF' }}>{community.role}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{community.description}</p>
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
              <Award style={{ color: '#CF9EFF' }} size={28} />
              <h2 className="text-3xl font-bold text-white">Core Competencies</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                  className="p-5"
                  style={{
                    background: 'rgba(207,158,255,0.04)',
                    border: '1px solid rgba(207,158,255,0.12)',
                    borderRadius: '12px',
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="font-bold text-sm" style={{ color: '#CF9EFF' }}>{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(207,158,255,0.08)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.05 }}
                      style={{
                        background: 'linear-gradient(90deg, #CF9EFF, #9B59B6)',
                        boxShadow: '0 0 12px rgba(207,158,255,0.5)',
                      }}
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
