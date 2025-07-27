import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-t border-gray-800 flex flex-col md:flex-row justify-between items-center px-4 py-6">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ChatSphere. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
