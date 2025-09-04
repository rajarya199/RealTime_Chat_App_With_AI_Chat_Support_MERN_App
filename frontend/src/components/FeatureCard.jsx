import React from 'react'

const FeatureCard= ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-purple-600 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
export default FeatureCard