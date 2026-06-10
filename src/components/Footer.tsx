import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden pt-32 pb-12 border-t border-white/10">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-900/20 rounded-full mix-blend-screen blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="font-display font-black text-xl text-white">H</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-wide">HIMTECH</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Empowering the next generation with innovation, excellence, and character. Shaping future leaders since 1995.
            </p>
            <div className="flex items-center gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Admissions', 'Academics', 'Infrastructure', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-brand-400" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6">Contact Us</h4>
            <ul className="space-y-6 text-slate-400">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-400 shrink-0 mt-1" />
                <span>123 Innovation Drive,<br/>Tech City, TC 45678</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-brand-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-brand-400 shrink-0" />
                <span>admissions@himtech.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6">Stay Updated</h4>
            <p className="text-slate-400 mb-4">Subscribe to our newsletter for the latest updates and news.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button 
                type="button"
                className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-500 rounded-full flex items-center justify-center hover:bg-brand-400 transition-colors hover-target"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Himtech School. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
