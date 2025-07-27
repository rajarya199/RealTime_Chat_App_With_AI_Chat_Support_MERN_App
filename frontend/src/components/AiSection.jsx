import React from 'react'
import { BrainIcon, SearchIcon, ZapIcon, ChartBarIcon } from 'lucide-react'
const AISection = () => {
  return (
    <section id="ai" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-900 rounded-full text-indigo-300 mb-4">
            <BrainIcon className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Powered by Google Gemini AI
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Get intelligent answers, insights, and assistance right in your chat
            conversations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-indigo-900 text-indigo-300 flex items-center justify-center">
                    <SearchIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    Instant Answers
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Ask questions directly in chat and get intelligent answers
                    from Google Gemini AI without leaving the conversation.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-indigo-900 text-indigo-300 flex items-center justify-center">
                    <ZapIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    Smart Suggestions
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Receive contextual suggestions and insights based on your
                    ongoing conversations to enhance productivity.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-indigo-900 text-indigo-300 flex items-center justify-center">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    Data Analysis
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Analyze data, generate reports, and visualize information
                    right within your chat interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
              <div className="bg-indigo-900 px-4 py-3 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-white font-medium ml-2">
                  Product Development
                </span>
              </div>
              <div className="p-4 bg-gray-700">
                <div className="flex items-start mb-4">
                  <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center text-purple-300 mr-3">
                    S
                  </div>
                  <div className="bg-gray-800 rounded-lg px-4 py-2 shadow-sm max-w-xs">
                    <p className="text-gray-200">
                      @AI Can you analyze our user feedback and summarize the
                      top 3 requested features?
                    </p>
                    <span className="text-xs text-gray-400">11:42 AM</span>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 mr-3">
                    <BrainIcon className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-gray-200 font-medium">
                      User Feedback Analysis:
                    </p>
                    <p className="text-gray-300 mt-2">
                      Based on the 250 feedback entries from the last month, the
                      top 3 requested features are:
                    </p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-300">
                      <li>Dark mode support (mentioned in 42% of feedback)</li>
                      <li>
                        Mobile offline access (mentioned in 38% of feedback)
                      </li>
                      <li>
                        Calendar integration (mentioned in 27% of feedback)
                      </li>
                    </ol>
                    <p className="text-gray-300 mt-2">
                      Would you like me to create a detailed report with
                      implementation recommendations?
                    </p>
                    <span className="text-xs text-gray-400">
                      11:43 AM • AI Assistant
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-indigo-700 rounded-lg px-4 py-2 shadow-sm max-w-xs">
                    <p className="text-white">
                      Yes please! That would be super helpful for our planning
                      meeting tomorrow.
                    </p>
                    <span className="text-xs text-indigo-300">11:45 AM</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center text-purple-300 ml-3">
                    S
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
export default AISection
