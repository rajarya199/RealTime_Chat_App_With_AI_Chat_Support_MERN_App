import React from 'react'
import {
  MessageCircleIcon,
  UsersIcon,
  FolderIcon,
  ClockIcon,
} from 'lucide-react'
const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircleIcon className="h-6 w-6" />,
      title: 'Real-time Messaging',
      description:
        'Chat with your team members in real-time with instant message delivery and read receipts.',
    },
    {
      icon: <FolderIcon className="h-6 w-6" />,
      title: 'Project Rooms',
      description:
        'Create dedicated spaces for different projects, teams, or topics to keep conversations organized.',
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: 'Team Collaboration',
      description:
        'Invite team members to your projects with different permission levels for seamless collaboration.',
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: 'Message History',
      description:
        'Access your complete message history anytime, with powerful search capabilities.',
    },
  ]
  return (
    <section id="features" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Designed for Productive Teams
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform provides all the tools you need for seamless team
            communication and collaboration.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-600"
            >
              <div className="h-12 w-12 rounded-md bg-indigo-900 text-indigo-300 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Effortless Project Management
              </h3>
              <p className="text-gray-300 mb-6">
                Create custom projects for your team, add relevant members, and
                start collaborating instantly. Organize conversations by topics,
                share files, and keep everything in one place.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-green-900 text-green-300 flex items-center justify-center mr-2 text-xs">
                    ✓
                  </span>
                  Unlimited projects and rooms
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-green-900 text-green-300 flex items-center justify-center mr-2 text-xs">
                    ✓
                  </span>
                  Custom permissions for team members
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-green-900 text-green-300 flex items-center justify-center mr-2 text-xs">
                    ✓
                  </span>
                  File sharing and storage
                </li>
              </ul>
            </div>
            <div className="bg-indigo-900 p-8 md:p-0 flex items-center justify-center">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="font-medium text-white">Your Projects</h4>
                </div>
                <div className="p-2">
                  {[
                    'Marketing Campaign',
                    'Website Redesign',
                    'Product Launch',
                    'Customer Support',
                  ].map((project, idx) => (
                    <div
                      key={idx}
                      className="p-2 hover:bg-gray-700 rounded-md flex items-center"
                    >
                      <div className="h-8 w-8 rounded-md bg-indigo-900 text-indigo-300 flex items-center justify-center mr-3">
                        <FolderIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {project}
                        </p>
                        <p className="text-xs text-gray-400">5 members</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-2 mt-2">
                    <button className="w-full py-2 bg-indigo-800 text-indigo-200 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                      + New Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeaturesSection
