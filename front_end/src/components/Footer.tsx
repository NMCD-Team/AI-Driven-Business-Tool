import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative bg-[#000000] text-white py-20 px-6">
      {/* Overlay background graphic, optional */}
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern.svg')] bg-cover bg-center"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#FFE712] mb-12">Get in Touch</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#6D828F] hover:bg-[#9AA7B2] transition-colors duration-300 p-6 rounded-xl text-center shadow-lg"
          >
            <FaEnvelope className="text-[#FFE712] text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-sm break-words text-white">contact@nikkeishamoodie.ca</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#6D828F] hover:bg-[#9AA7B2] transition-colors duration-300 p-6 rounded-xl text-center shadow-lg"
          >
            <FaPhone className="text-[#FFE712] text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-sm text-white">(647) 914-8873</p>
          </motion.div>

          {/* Scheduler */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#6D828F] hover:bg-[#9AA7B2] transition-colors duration-300 p-6 rounded-xl text-center shadow-lg"
          >
            <FaCalendarAlt className="text-[#FFE712] text-3xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Book a Session</h3>
            <a
              href="https://bit.ly/BuildADreamWithNikki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFE712] text-sm underline"
            >
              bit.ly/BuildADreamWithNikki
            </a>
          </motion.div>
        </div>

        {/* Socials */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-[#FFE712] mb-4">Follow Us</h3>
          <div className="flex justify-center gap-8 text-3xl">
            <a
              href="https://www.instagram.com/nmcdinc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-[#FFE712] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/nmcd-inc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-[#FFE712] transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
