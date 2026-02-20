
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const accent = '#CF9EFF';
const ad = 'rgba(207,158,255,';

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
      value: 'mittalaws@gmail.com',
      href: 'mailto:mittalaws@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/mittal122' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mittal-domadiya-412550310/' },
  ];

  const inputStyle = {
    background: `${ad}0.04)`,
    border: `1px solid ${ad}0.15)`,
    borderRadius: '10px',
    color: '#fff',
  };

  const focusGlow = `0 0 20px ${ad}0.25), 0 0 0 1px ${accent}`;

  return (
    <>
      <Helmet>
        <title>Contact - Mittal Domadiya</title>
        <meta name="description" content="Get in touch with Mittal Domadiya. Email: mittalaws@gmail.com. Available for DevOps consulting and collaboration." />
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
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
              style={{ textShadow: `0 0 50px ${ad}0.4), 0 0 100px ${ad}0.15)` }}
            >
              Get In Touch
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: `${ad}0.5)` }}>
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
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block mb-2 font-medium capitalize" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {field}
                    </label>
                    <motion.input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onFocus={() => setIsFocused({ ...isFocused, [field]: true })}
                      onBlur={() => setIsFocused({ ...isFocused, [field]: false })}
                      required
                      className="w-full px-4 py-3 placeholder-gray-600 focus:outline-none transition-all"
                      placeholder={field === 'name' ? 'Your name' : field === 'email' ? 'your.email@example.com' : "What's this about?"}
                      style={inputStyle}
                      animate={{
                        boxShadow: isFocused[field] ? focusGlow : '0 0 0 rgba(0,0,0,0)',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block mb-2 font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
                    className="w-full px-4 py-3 placeholder-gray-600 focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                    style={inputStyle}
                    animate={{
                      boxShadow: isFocused.message ? focusGlow : '0 0 0 rgba(0,0,0,0)',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-target w-full px-6 py-4 font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${accent} 0%, #9B59B6 100%)`,
                    color: '#0a0a0a',
                    borderRadius: '10px',
                    boxShadow: `0 0 30px ${ad}0.3), 0 4px 15px ${ad}0.2)`,
                  }}
                >
                  <Send size={18} />
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
                      whileHover={{ x: 6 }}
                      className="cursor-target flex items-center gap-4 p-4 cursor-pointer transition-all"
                      style={{
                        background: `${ad}0.04)`,
                        border: `1px solid ${ad}0.12)`,
                        borderRadius: '12px',
                      }}
                      onClick={() => info.href && window.open(info.href, '_blank')}
                    >
                      <div
                        className="p-3"
                        style={{
                          background: `${ad}0.1)`,
                          borderRadius: '10px',
                        }}
                      >
                        <Icon style={{ color: accent }} size={22} />
                      </div>
                      <div>
                        <div className="text-sm" style={{ color: `${ad}0.45)` }}>{info.label}</div>
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
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -4 }}
                        className="cursor-target p-4 cursor-pointer transition-all"
                        style={{
                          background: `${ad}0.06)`,
                          border: `1px solid ${ad}0.15)`,
                          borderRadius: '12px',
                          boxShadow: `0 0 15px ${ad}0.05)`,
                        }}
                      >
                        <Icon style={{ color: accent }} size={22} />
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
                className="p-6"
                style={{
                  background: `linear-gradient(135deg, ${ad}0.06), ${ad}0.02))`,
                  border: `1px solid ${ad}0.2)`,
                  borderRadius: '14px',
                  boxShadow: `0 0 30px ${ad}0.06)`,
                }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Availability</h3>
                <p className="mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Currently available for freelance projects and consulting opportunities.
                  Let's build something amazing together!
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.5)' }} />
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
