import React from "react";
import Logo from "../Logo/Logo";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo className="text-2xl md:text-3xl" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The most trusted platform in Bangladesh for connecting qualified tutors with students seeking quality education.
            </p>
            <div className="flex gap-4 text-[#188bfe]">
              <a href="#" className="hover:opacity-80 transition"><FaFacebook size={20} /></a>
              <a href="#" className="hover:opacity-80 transition"><FaTwitter size={20} /></a>
              <a href="#" className="hover:opacity-80 transition"><FaLinkedin size={20} /></a>
              <a href="#" className="hover:opacity-80 transition"><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">Quick Links</h6>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">All Tuitions</a></li>
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">Find a Tutor</a></li>
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">How it Works</a></li>
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">Support</h6>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">Terms of Service</a></li>
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">Privacy Policy</a></li>
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">Contact Support</a></li>
              <li><a className="hover:text-[#188bfe] transition cursor-pointer">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h6 className="text-gray-900 font-bold uppercase tracking-wider text-xs mb-6">Newsletter</h6>
            <p className="text-sm text-gray-500 mb-4">Subscribe to get the latest tuition updates.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full focus:border-[#188bfe] focus:outline-none bg-gray-50 border-gray-200"
              />
              <button className="btn bg-[#188bfe] hover:bg-[#1578da] border-none text-white w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} eTuitionBd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-medium">
            <a className="hover:text-[#188bfe] cursor-pointer">Security</a>
            <a className="hover:text-[#188bfe] cursor-pointer">Sitemap</a>
            <a className="hover:text-[#188bfe] cursor-pointer">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;