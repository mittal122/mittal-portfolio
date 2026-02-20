
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ArrowRight, Terminal, Cloud, Server, GraduationCap, Users, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LaserFlow from '@/components/LaserFlow';

const HomePage = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'MITTAL DOMADIYA';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const roles = [
    { icon: Terminal, label: 'DevOps Engineer' },
    { icon: Cloud, label: 'Cloud Architect' },
    { icon: Server, label: 'SRE Specialist' },
  ];

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

  // Refs for scroll-triggered animations
  const aboutRef = useRef(null);
  const eduRef = useRef(null);
  const communityRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });
  const eduInView = useInView(eduRef, { once: true, margin: '-80px' });
  const communityInView = useInView(communityRef, { once: true, margin: '-80px' });
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' });

  return (
    <>
      <Helmet>
        <title>Mittal Domadiya - DevOps Engineer | Cloud Architect | SRE Specialist</title>
        <meta name="description" content="Portfolio of Mittal Domadiya, a skilled DevOps Engineer specializing in cloud architecture, Kubernetes, Docker, and site reliability engineering." />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#060010' }}>
        {/* LaserFlow Background — beam anchored to bottom-right */}
        <div className="absolute inset-0 z-0">
          <LaserFlow
            horizontalBeamOffset={0.32}
            verticalBeamOffset={-0.42}
            color="#CF9EFF"
            horizontalSizing={0.6}
            verticalSizing={1.8}
            wispDensity={1.2}
            wispSpeed={12}
            wispIntensity={4}
            flowSpeed={0.3}
            flowStrength={0.2}
            fogIntensity={0.5}
            fogScale={0.28}
            fogFallSpeed={0.5}
            decay={1.0}
            falloffStart={1.3}
          />
        </div>

        {/* Gradient to darken the left/top for text readability */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, rgba(6,0,16,0.85) 0%, rgba(6,0,16,0.5) 35%, transparent 65%),
              linear-gradient(to bottom, rgba(6,0,16,0.4) 0%, transparent 40%)
            `,
          }}
        />

        {/* ── Content: left-aligned, vertically centered ── */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
            <div className="max-w-2xl">

              {/* Greeting tag */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span
                  className="inline-block px-5 py-2 text-xs font-medium tracking-[0.25em] uppercase"
                  style={{
                    color: '#CF9EFF',
                    border: '1px solid rgba(207, 158, 255, 0.25)',
                    background: 'rgba(207, 158, 255, 0.06)',
                  }}
                >
                  Welcome to my portfolio
                </span>
              </motion.div>

              {/* Typewriter name */}
              <motion.h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95]"
                style={{
                  textShadow: '0 0 60px rgba(207,158,255,0.35), 0 0 120px rgba(207,158,255,0.12)',
                  letterSpacing: '-0.03em',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {displayText}
                <motion.span
                  className="text-[#CF9EFF]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.h1>

              {/* Decorative accent line */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="w-20 h-[2px] mt-5 mb-6"
                style={{
                  background: 'linear-gradient(90deg, #CF9EFF, transparent)',
                }}
              />

              {/* Role badges */}
              <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                {roles.map((role, i) => {
                  const Icon = role.icon;
                  return (
                    <motion.div
                      key={role.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.45 + i * 0.12 }}
                      className="flex items-center gap-2 px-4 py-2"
                      style={{
                        border: '1px solid rgba(207,158,255,0.15)',
                        background: 'rgba(207,158,255,0.04)',
                      }}
                    >
                      <Icon size={14} style={{ color: '#CF9EFF' }} />
                      <span
                        className="text-sm font-light tracking-wider"
                        style={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {role.label}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                <Link
                  to="/contact"
                  className="cursor-target inline-flex items-center gap-2 px-8 py-4 font-medium transition-all duration-300 cursor-pointer group text-sm md:text-base"
                  style={{
                    background: 'linear-gradient(135deg, #CF9EFF 0%, #9B59B6 100%)',
                    color: '#0a0a0a',
                    boxShadow: '0 0 40px rgba(207,158,255,0.3), 0 4px 20px rgba(207,158,255,0.2)',
                    letterSpacing: '0.1em',
                  }}
                >
                  <Sparkles className="group-hover:rotate-12 transition-transform" size={18} />
                  GET IN TOUCH
                </Link>

                <Link
                  to="/experience"
                  className="cursor-target inline-flex items-center gap-2 px-8 py-4 font-medium transition-all duration-300 cursor-pointer group text-sm md:text-base"
                  style={{
                    border: '1px solid rgba(207,158,255,0.3)',
                    color: '#CF9EFF',
                    background: 'rgba(207,158,255,0.05)',
                    letterSpacing: '0.1em',
                  }}
                >
                  VIEW MY WORK
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — bottom center */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(207,158,255,0.4)' }}
            >
              Scroll
            </span>
            <div
              className="w-[1px] h-8"
              style={{ background: 'linear-gradient(180deg, rgba(207,158,255,0.4), transparent)' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ABOUT SECTION — scrolls below the hero
          ════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: '#060010' }}>

        {/* ── Intro / Who I Am ── */}
        <section ref={aboutRef} className="relative py-28 px-4 sm:px-8 overflow-hidden">
          {/* Subtle top fade from hero */}
          <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #060010, transparent)' }} />

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-6"
            >
              <span
                className="inline-block px-5 py-2 text-xs font-medium tracking-[0.25em] uppercase mb-8"
                style={{
                  color: '#CF9EFF',
                  border: '1px solid rgba(207,158,255,0.25)',
                  background: 'rgba(207,158,255,0.06)',
                }}
              >
                About Me
              </span>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
                style={{ textShadow: '0 0 50px rgba(207,158,255,0.35)' }}
              >
                Who I Am
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={aboutInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-20 h-[2px] mx-auto mb-8"
                style={{ background: 'linear-gradient(90deg, transparent, #CF9EFF, transparent)' }}
              />
              <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Passionate DevOps Engineer with expertise in cloud infrastructure, containerization, and automation.
                Committed to building scalable, reliable systems and fostering collaborative development environments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Education ── */}
        <section ref={eduRef} className="relative py-20 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={eduInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-12"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.2)' }}
              >
                <GraduationCap style={{ color: '#CF9EFF' }} size={24} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Education</h2>
            </motion.div>

            <div className="relative">
              {/* Timeline center line */}
              <div
                className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px]"
                style={{ background: 'linear-gradient(180deg, #CF9EFF, rgba(207,158,255,0.1), transparent)' }}
              />

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    animate={eduInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                    className="relative pl-16 sm:pl-20"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-6 sm:left-8 top-6 w-5 h-5 -translate-x-1/2 flex items-center justify-center"
                      style={{
                        background: '#060010',
                        border: '2px solid #CF9EFF',
                        borderRadius: '50%',
                        boxShadow: '0 0 20px rgba(207,158,255,0.4), 0 0 40px rgba(207,158,255,0.15)',
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: '#CF9EFF' }} />
                    </div>

                    {/* Card */}
                    <div
                      className="p-6 sm:p-8 transition-all duration-500 hover:translate-x-2 group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(207,158,255,0.06) 0%, rgba(207,158,255,0.02) 100%)',
                        border: '1px solid rgba(207,158,255,0.1)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0">{edu.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#CF9EFF] transition-colors duration-300">{edu.degree}</h3>
                          <p className="font-medium mb-1" style={{ color: 'rgba(207,158,255,0.6)' }}>{edu.institution}</p>
                          <span
                            className="inline-block px-3 py-1 text-xs font-medium mt-2"
                            style={{
                              color: '#CF9EFF',
                              background: 'rgba(207,158,255,0.08)',
                              border: '1px solid rgba(207,158,255,0.15)',
                              borderRadius: '20px',
                            }}
                          >
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Community Involvement ── */}
        <section ref={communityRef} className="relative py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={communityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-12"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.2)' }}
              >
                <Users style={{ color: '#CF9EFF' }} size={24} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Community</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {communities.map((community, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={communityInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="cursor-target relative p-7 transition-all cursor-pointer group overflow-hidden"
                  style={{
                    background: 'rgba(207,158,255,0.03)',
                    border: '1px solid rgba(207,158,255,0.1)',
                    borderRadius: '20px',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(207,158,255,0.12) 0%, transparent 70%)',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-5xl mb-5">{community.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#CF9EFF] transition-colors duration-300">{community.name}</h3>
                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold mb-3"
                      style={{
                        color: '#CF9EFF',
                        background: 'rgba(207,158,255,0.1)',
                        borderRadius: '20px',
                      }}
                    >
                      {community.role}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{community.description}</p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-500"
                    style={{ background: 'linear-gradient(90deg, transparent, #CF9EFF, transparent)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Competencies ── */}
        <section ref={skillsRef} className="relative py-20 pb-28 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-12"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.2)' }}
              >
                <Award style={{ color: '#CF9EFF' }} size={24} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Core Competencies</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                  className="group p-5 sm:p-6 transition-all duration-300"
                  style={{
                    background: 'rgba(207,158,255,0.03)',
                    border: '1px solid rgba(207,158,255,0.1)',
                    borderRadius: '16px',
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <ChevronRight size={16} style={{ color: '#CF9EFF' }} />
                      <span className="text-white font-semibold tracking-wide">{skill.name}</span>
                    </div>
                    <span className="font-bold text-sm tabular-nums" style={{ color: '#CF9EFF' }}>{skill.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(207,158,255,0.08)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                      style={{
                        background: 'linear-gradient(90deg, #CF9EFF, #9B59B6)',
                        boxShadow: '0 0 12px rgba(207,158,255,0.4)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
