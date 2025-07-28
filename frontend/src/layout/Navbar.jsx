import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, XIcon, MessageSquareTextIcon } from 'lucide-react'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <MessageSquareTextIcon className="h-8 w-8 text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-white">
              ChatSphere
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#ai"
              className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium"
            >
              AI Integration
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium"
            >
              Pricing
            </a>
            <Link to='/myProject'
                          className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium"
            > Create Project
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-indigo-400 px-3 py-2 text-sm font-medium">
              Login
            </Link>
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign Up
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-indigo-400"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <a
              href="#features"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-indigo-400"
            >
              Features
            </a>
            <a
              href="#ai"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-indigo-400"
            >
              AI Integration
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-indigo-400"
            >
              Pricing
            </a>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-indigo-400">
              Login
            </button>
            <button className="block w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
export default Navbar
