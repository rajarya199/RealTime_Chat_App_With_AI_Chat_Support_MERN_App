import React from 'react'
import FeatureCard from './FeatureCard.jsx'
import {
  FolderPlusIcon,
  UsersIcon,
  MessageSquareIcon,
  BotIcon,
  CodeIcon,
  MonitorIcon,
} from 'lucide-react'
const HowItWorksSection= () => {
  const features = [
    {
      icon: <FolderPlusIcon size={24} />,
      title: 'Create Rooms',
      description:
        'Create dedicated rooms or projects for different topics, teams, or initiatives to keep your work organized.',
    },
    {
      icon: <UsersIcon size={24} />,
      title: 'Collaborate',
      description:
        'Add team members with custom permissions to collaborate on projects and share knowledge efficiently.',
    },
    {
      icon: <MessageSquareIcon size={24} />,
      title: 'Real-time Chat',
      description:
        'Chat in real-time with instant message delivery and read receipts to keep conversations flowing.',
    },
    {
      icon: <BotIcon size={24} />,
      title: 'AI Assistance',
      description:
        'Get instant help on any topic by mentioning @ai in your messages for general questions or coding queries.',
    },
    {
      icon: <CodeIcon size={24} />,
      title: 'Edit & Run Code',
      description:
        'Edit, save, and run code files with WebContainer integration directly in your browser without switching tools.',
    },
    {
      icon: <MonitorIcon size={24} />,
      title: 'Live Preview',
      description:
        'View live previews, console logs, and terminal output for your projects in real-time as you make changes.',
    },
  ]
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Our platform combines chat, collaboration, and AI to create the
          ultimate workspace for teams and developers.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div className="mt-16 text-center">
        <div className="inline-block relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
          <button className="relative bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
            Get Started Now
          </button>
        </div>
        <p className="text-gray-400 mt-4">
          No credit card required • Free to start
        </p>
      </div>
    </section>
  )
}
export default HowItWorksSection
