import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  const handleFeedbackClick = () => {
    window.location.href = 'mailto:dheerajjha451@gmail.com?subject=Feedback';
  };

  return (
    <footer className="border-t border-gray-200 bg-white p-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left mb-4 md:mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Dheerajjha451/Design2Code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-bold"
          >
            <Github size={30} />
          </a>
          <p
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
            onClick={handleFeedbackClick}
          >
            Feedback
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
