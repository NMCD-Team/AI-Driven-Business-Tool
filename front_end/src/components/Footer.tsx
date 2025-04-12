import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <div className="pt-4 mx-4 md:mx-2">
      <footer className="border-2 rounded-tr-xl rounded-tl-xl footer text-base-content p-10 max-w-6xl mx-auto">
        <aside>
          <img className="size-40" src="/assets/logo.png" alt="Logo" />
        </aside>
        <nav>
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              📍 Address: 123 Test Street, Toronto, Ontario, Canada
            </p>
            <p className="text-sm">📧 Email: test@nmcd.com</p>
            <p className="text-sm">📞 Phone: +123-456-7890</p>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Social Media</h6>
          <div className="flex gap-4">
            <a className="link link-hover text-3xl" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a className="link link-hover text-3xl" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a className="link link-hover text-3xl" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </nav>
      </footer>

      <div className="border-x-2 max-w-6xl mx-auto text-center text-base-content p-4 fixed bottom-0 left-0 right-0 bg-white">
        <aside>
          <p>&copy; {currentYear} NMCD.Inc. All rights reserved.</p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
