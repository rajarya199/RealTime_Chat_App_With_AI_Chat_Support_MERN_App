import React from 'react'
import {
  FolderPlusIcon,
  UsersIcon,
  MessageSquareIcon,
  BotIcon,
  CodeIcon,
  MonitorIcon,
  ArrowDownIcon,
} from 'lucide-react'
const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FolderPlusIcon size={24} />,
      title: 'Step 1: Create Rooms',
      description:
        'Create dedicated rooms or projects for different topics, teams, or initiatives to keep your work organized.',
    },
    {
      icon: <UsersIcon size={24} />,
      title: 'Step 2: Collaborate',
      description:
        'Add team members with custom permissions to collaborate on projects and share knowledge efficiently.',
    },
    {
      icon: <MessageSquareIcon size={24} />,
      title: 'Step 3: Real-time Chat',
      description:
        'Chat in real-time with instant message delivery and read receipts to keep conversations flowing.',
    },
    {
      icon: <BotIcon size={24} />,
      title: 'Step 4: AI Assistance',
      description:
        'Get instant help on any topic by mentioning @ai in your messages for general questions or coding queries.',
    },
    {
      icon: <CodeIcon size={24} />,
      title: 'Step 5: Edit & Run Code',
      description:
        'Edit, save, and run code files with WebContainer integration directly in your browser without switching tools.',
    },
    {
      icon: <MonitorIcon size={24} />,
      title: 'Step 6: Live Preview',
      description:
        'View live previews, console logs, and terminal output for your projects in real-time as you make changes.',
    },
  ]
  return (
    <div className='w-full min-h-screen bg-gray-900 text-white'>
         <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto bg-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Our platform combines chat, collaboration, and AI to create the
          ultimate workspace for teams and developers.
        </p>
      </div>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex flex-col md:flex-row bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 mb-4 md:mb-0 md:mr-6 rounded-lg bg-purple-600 text-white">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center my-4">
                <ArrowDownIcon
                  className="text-purple-500 animate-bounce"
                  size={24}
                />
              </div>
            )}
          </div>
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

    </div>
   
  )
}
export default HowItWorksSection
