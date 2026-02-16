
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isFocused, setIsFocused] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Feature Coming Soon!',
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mittaldomadiya7096@gmail.com',
      href: 'mailto:mittaldomadiya7096@gmail.com',
      color: '#ffffff',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7096827305',
      href: 'tel:+917096827305',
      color: '#ffffff',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: null,
      color: '#ffffff',
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: '#ffffff' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#ffffff' },
    { icon: Twitter, label: 'Twitter', href: '#', color: '#ffffff' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Mittal Domadiya</title>
        <meta name="description" content="Get in touch with Mittal Domadiya. Email: mittaldomadiya7096@gmail.com, Phone: +91 7096827305. Available for DevOps consulting and collaboration." />
      </Helmet>

      <div className="min-h-screen pt-[7.25rem] md:pt-[7.75rem] lg:pt-[8.5rem] pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white" style={{ textShadow: '0 0 40px rgba(150, 150, 150, 0.5), 0 0 80px rgba(150, 150, 150, 0.3)' }}>
              Get In Touch
            </h1>
            <p className="text-xl text-[#888888] max-w-3xl mx-auto">
              Let's collaborate on your next DevOps project or discuss cloud infrastructure solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2 font-medium">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({ ...isFocused, name: true })}
                    onBlur={() => setIsFocused({ ...isFocused, name: false })}
                    required
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                    placeholder="Your name"
                    animate={{
                      boxShadow: isFocused.name ? '0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 0px rgba(255, 255, 255, 0)',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 font-medium">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({ ...isFocused, email: true })}
                    onBlur={() => setIsFocused({ ...isFocused, email: false })}
                    required
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                    placeholder="your.email@example.com"
                    animate={{
                      boxShadow: isFocused.email ? '0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 0px rgba(255, 255, 255, 0)',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2 font-medium">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({ ...isFocused, subject: true })}
                    onBlur={() => setIsFocused({ ...isFocused, subject: false })}
                    required
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                    placeholder="What's this about?"
                    animate={{
                      boxShadow: isFocused.subject ? '0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 0px rgba(255, 255, 255, 0)',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 font-medium">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({ ...isFocused, message: true })}
                    onBlur={() => setIsFocused({ ...isFocused, message: false })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all resize-none"
                    placeholder="Tell me about your project..."
                    animate={{
                      boxShadow: isFocused.message ? '0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 0px rgba(255, 255, 255, 0)',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-white text-black font-semibold rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-white/10 cursor-pointer"
                      onClick={() => info.href && window.open(info.href, '_blank')}
                    >
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${info.color}20` }}
                      >
                        <Icon style={{ color: info.color }} size={24} />
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="p-4 bg-[#1A1A1A] rounded-lg border border-white/10 cursor-pointer"
                        style={{
                          boxShadow: `0 0 20px ${social.color}20`,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: '🚧 Feature Coming Soon!',
                            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                          });
                        }}
                      >
                        <Icon style={{ color: social.color }} size={24} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] p-6 rounded-xl border border-white/30"
                style={{
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Availability</h3>
                <p className="text-white/70 mb-4">
                  Currently available for freelance projects and consulting opportunities. 
                  Let's build something amazing together!
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="text-white font-medium">Available for work</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
