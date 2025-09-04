import React from 'react'
import { MessageSquareTextIcon, UsersIcon, BrainIcon } from 'lucide-react'
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Collaborate Smarter with AI-Powered Chat
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Create project rooms, chat in real-time, and get intelligent
              answers from Google Gemini AI - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-indigo-900 hover:bg-indigo-100 px-6 py-3 rounded-md text-lg font-medium">
                Get Started Free
              </button>
              <button className="bg-indigo-800 bg-opacity-50 hover:bg-opacity-70 px-6 py-3 rounded-md text-lg font-medium border border-indigo-400">
                See How It Works
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="bg-indigo-900 px-4 py-3 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-white font-medium ml-2">
                  Project: Marketing Campaign
                </span>
              </div>
              <div className="p-4 bg-gray-700">
                <div className="flex items-start mb-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-200 mr-3">
                    A
                  </div>
                  <div className="bg-gray-800 rounded-lg px-4 py-2 shadow-sm max-w-xs">
                    <p className="text-gray-200">
                     @ai What is a Marketing Campaign?
                    </p>
                    <span className="text-xs text-gray-400">10:24 AM</span>
                  </div>
                </div>
                <div className="flex items-start mb-4 justify-end">
                  <div className="bg-indigo-700 rounded-lg px-4 py-2 shadow-sm max-w-xs">
  <p className="leading-relaxed">
            A marketing campaign is a coordinated series of actions, strategies, and messages designed to promote a product, service, or brand.
            <ul className="list-disc list-inside mt-2 space-y-1 text-indigo-100">
              <li>Runs for a specific timeframe.</li>
              <li>Targets a specific audience.</li>
              <li>Uses one or multiple channels (social media, TV, email, events, etc.)</li>
              <li>Has a clear objective (e.g., increase awareness, drive sales).</li>
            </ul>
          </p>
                    <span className="text-xs text-indigo-300">10:26 AM</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-purple-200 ml-3">
                                        <BrainIcon className="h-4 w-4" />

                  </div>
                </div>
             
              </div>
            </div>
  <div className="absolute -bottom-8 -right-8 h-28 w-28 bg-yellow-400 rounded-full opacity-15 animate-pulse z-0"></div>
  <div className="absolute -top-8 -left-8 h-20 w-20 bg-purple-600 rounded-full opacity-15 animate-pulse delay-200 z-0"></div>

          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
