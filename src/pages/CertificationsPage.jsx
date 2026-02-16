
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Calendar } from 'lucide-react';

const CertificationsPage = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const certifications = [
    {
      id: 1,
      title: 'Kubernetes for the Absolute Beginners – Hands-on',
      provider: 'KodeKloud/Udemy',
      date: '2024',
      icon: '☸️',
      skills: ['Kubernetes', 'Container Orchestration', 'Pods', 'Deployments'],
      description: 'Comprehensive hands-on training in Kubernetes fundamentals and container orchestration.',
    },
    {
      id: 2,
      title: 'Hands-on Introduction to Linux Commands and Shell Scripting',
      provider: 'IBM/Coursera',
      date: '2024',
      icon: '🐧',
      skills: ['Linux', 'Shell Scripting', 'Bash', 'Command Line'],
      description: 'Practical experience with Linux system administration and shell scripting.',
    },
    {
      id: 3,
      title: 'Certified Kubernetes Administrator (CKA) with Practice Tests',
      provider: 'KodeKloud',
      date: '2025',
      icon: '🎯',
      skills: ['Kubernetes Admin', 'Cluster Management', 'Troubleshooting', 'Security'],
      description: 'Advanced Kubernetes administration with real-world practice scenarios.',
    },
    {
      id: 4,
      title: 'Google Cloud Skills',
      provider: 'Google',
      date: '2024',
      icon: '☁️',
      skills: ['Google Cloud', 'Cloud Architecture', 'GCP Services'],
      description: 'Expertise in Google Cloud Platform services and architecture.',
    },
    {
      id: 5,
      title: 'Jenkins for Beginners',
      provider: 'Udemy',
      date: '2024',
      icon: '🔧',
      skills: ['Jenkins', 'CI/CD', 'Automation', 'Pipelines'],
      description: 'Fundamentals of continuous integration and deployment with Jenkins.',
    },
  ];

  const stats = [
    { label: 'Certifications', value: 5, suffix: '+' },
    { label: 'Hours of Learning', value: 200, suffix: '+' },
    { label: 'Skills Acquired', value: 15, suffix: '+' },
  ];

  return (
    <>
      <Helmet>
        <title>Certifications - Mittal Domadiya</title>
        <meta name="description" content="View Mittal Domadiya's professional certifications in Kubernetes, Linux, Jenkins, and cloud technologies from leading platforms." />
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
              Certifications
            </h1>
            <p className="text-xl text-[#888888] max-w-3xl mx-auto">
              Continuous learning and professional development journey
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1A1A1A] rounded-xl border border-white/10 p-6 text-center"
              >
                <motion.div
                  className="text-5xl font-black text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Certification Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative h-[320px] cursor-pointer"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setFlippedCard(cert.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: flippedCard === cert.id ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-[#1A1A1A] rounded-xl border border-white/10 p-6 flex flex-col"
                    style={{
                      backfaceVisibility: 'hidden',
                      boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className="text-6xl mb-4">{cert.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{cert.title}</h3>
                    <p className="text-[#888888] font-medium mb-2">{cert.provider}</p>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                      <Calendar size={16} />
                      <span>{cert.date}</span>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <CheckCircle size={16} />
                        <span>Verified Certificate</span>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl border border-white/30 p-6"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <h4 className="text-lg font-bold text-white mb-3">Skills Gained</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 border border-white/30 text-white text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/70 text-sm">{cert.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Learning Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#1A1A1A] rounded-xl border border-white/10 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-white" size={32} />
              <h2 className="text-3xl font-bold text-white">Learning Journey</h2>
            </div>
            <p className="text-white/70 mb-6">
              My commitment to continuous learning drives me to stay updated with the latest DevOps practices, 
              cloud technologies, and industry standards. Each certification represents hands-on experience and 
              practical knowledge that I apply in real-world scenarios.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/10 border border-white/30 text-white rounded-full text-sm">
                🎯 Goal-Oriented Learning
              </span>
              <span className="px-4 py-2 bg-white/10 border border-white/30 text-white rounded-full text-sm">
                💡 Practical Application
              </span>
              <span className="px-4 py-2 bg-white/10 border border-white/30 text-white rounded-full text-sm">
                🚀 Continuous Growth
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CertificationsPage;
