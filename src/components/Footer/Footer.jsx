import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-cream py-8 border-t-2 border-gray-300">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            {/* Navigation Links */}
            <div className="mb-6 flex flex-wrap justify-center space-x-6 lg:space-x-8 text-base font-medium">
              <Link className="hover:text-gray-600" to="/">
                Company
              </Link>
              <Link className="hover:text-gray-600" to="/">
                About Us
              </Link>
              <Link className="hover:text-gray-600" to="/">
                Team
              </Link>
              <Link className="hover:text-gray-600" to="/">
                Products
              </Link>
              <Link className="hover:text-gray-600" to="/">
                Blog
              </Link>
              <Link className="hover:text-gray-600" to="/">
                License
              </Link>
            </div>
    
            {/* Social Icons */}
            <div className="mb-6 flex justify-center space-x-6 lg:space-x-8">
              <a
                href="https://facebook.com"
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://pinterest.com"
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestP className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
    
            {/* Copyright Text */}
            <div className="text-sm sm:text-base text-gray-600">
              &copy; 2024 All Rights Reserved.
            </div>
          </div>
        </footer>
      );
    
}

export default Footer