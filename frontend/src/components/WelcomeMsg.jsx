import React, { useEffect, useState } from 'react'
import {
  XIcon,
  BellIcon,
  FolderIcon,
  ClockIcon,
  SparklesIcon,
} from 'lucide-react'


const WelcomeMessage = ({ user, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  useEffect(() => {
    // Trigger entrance animation
    const timer1 = setTimeout(() => setIsVisible(true), 100)
    // Trigger sparkle animation after entrance
    const timer2 = setTimeout(() => setShowSparkles(true), 800)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])
  const handleClose = () => {
    setIsVisible(false)
    // Allow exit animation to complete before removing from DOM
    setTimeout(onClose, 500)
  }
  return (
    <div
      className={`fixed inset-x-0 top-16 z-40 flex justify-center items-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Background with blur effect and gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md rounded-xl shadow-2xl transform transition-all duration-500 ease-out overflow-hidden"
          style={{
            transform: isVisible
              ? 'translateY(0) scale(1)'
              : 'translateY(-20px) scale(0.95)',
          }}
        >
          {/* Animated particles */}
          {showSparkles &&
            Array.from({
              length: 20,
            }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
                  transform: `scale(${0.5 + Math.random() * 0.5})`,
                }}
              />
            ))}
        </div>
        {/* Content */}
        <div className="relative p-6 sm:p-8 text-white">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close welcome message"
          >
            <XIcon className="h-5 w-5" />
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* User avatar with pulsing effect */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img
                   src={user?.avatar || ''}
  alt={user?.name || 'User Avatar'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse bg-white/20"></div>
              {showSparkles && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1.5 shadow-lg animate-bounce">
                  <SparklesIcon className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            {/* Welcome text with typing animation */}
            <div className="text-center sm:text-left">
              <div className="overflow-hidden">
                <h2
                  className="text-2xl sm:text-3xl font-bold"
                  style={{
                    animation: isVisible ? 'typing 1s steps(40, end)' : 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Welcome back, {user.name}!
                </h2>
              </div>
              <p className="mt-2 text-indigo-100 max-w-xl">
                Great to see you again. You last visited on {user.lastLogin}.
                Your workspace is ready for today's collaboration.
              </p>
              {/* Quick stats with fade-in animation */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div
                  className="flex items-center space-x-2 bg-black/20 rounded-lg p-3 backdrop-blur-sm transform transition-all duration-500 ease-out"
                  style={{
                    animationDelay: '0.3s',
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <FolderIcon className="h-5 w-5 text-indigo-200" />
                  <div>
                    <div className="text-sm font-medium">Projects</div>
                    <div className="text-lg font-bold">{user.projects}</div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2 bg-black/20 rounded-lg p-3 backdrop-blur-sm transform transition-all duration-500 ease-out"
                  style={{
                    animationDelay: '0.5s',
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <BellIcon className="h-5 w-5 text-indigo-200" />
                  <div>
                    <div className="text-sm font-medium">Notifications</div>
                    <div className="text-lg font-bold">
                      {user.notifications}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2 bg-black/20 rounded-lg p-3 backdrop-blur-sm transform transition-all duration-500 ease-out col-span-2 sm:col-span-1"
                  style={{
                    animationDelay: '0.7s',
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <ClockIcon className="h-5 w-5 text-indigo-200" />
                  <div>
                    <div className="text-sm font-medium">Recent Activity</div>
                    <div className="text-lg font-bold">Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Quick action buttons with staggered fade-in */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
            {[
              'Resume last project',
              'Check notifications',
              'Start new chat',
            ].map((action, index) => (
              <button
                key={action}
                className="bg-black/30 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-md text-sm font-medium transition-all transform"
                style={{
                  animationDelay: `${0.8 + index * 0.2}s`,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(20px) scale(0.95)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* CSS for animations */}
      <style >{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scale(0.5);
            opacity: 0.3;
          }
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
export default WelcomeMessage
