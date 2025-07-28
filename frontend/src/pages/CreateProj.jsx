import React, { useState, useEffect } from 'react'
import axios from '../config/axios'
import { Link} from 'react-router-dom'

const CreateProj = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState([])

  const [loading, setLoading] = useState(false) // for fetch state
  const [error, setError] = useState(null) // for error messaging


  // Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('/projects/all')
        setProjects(res.data.projects)
      } catch (err) {
        setError('Failed to fetch projects.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Create new project
  const createProject = async (e) => {
    e.preventDefault()
    if (!projectName.trim()) return // Guard against empty input
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post('/projects/create', { name: projectName })
      // Assume res.data.project contains created project
      setProjects(prev => [...prev, res.data.project])
      setProjectName('')
      setIsModalOpen(false)
    } catch (err) {
      setError('Failed to create project.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
   <main className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => {
            setError(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white px-5 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </button>
      </div>

      {loading && !isModalOpen && (
        <p className="text-gray-600 text-center py-10">Loading projects...</p>
      )}

      {error && (
        <p className="text-red-600 text-center mb-6 font-medium">{error}</p>
      )}

      {!loading && projects.length === 0 && (
        <p className="text-gray-500 text-center py-10">No projects available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project._id}
            to={`/project/${project._id}`}
            className="cursor-pointer p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
           
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{project.name}</h2>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <small>
                  <i className='ri-user-line'></i> 
                </small>{' '}
              Collaborators: <span className="font-medium">{project.users?.length || 0}</span>
            </p>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>
            <form onSubmit={createProject} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="projectName">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  autoFocus
                  disabled={loading}
                  placeholder="Enter project name"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium -mt-4 mb-4">{error}</p>
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setError(null)
                    setProjectName('')
                  }}
                  disabled={loading}
                  className="px-5 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !projectName.trim()}
                  className={`px-5 py-3 rounded-lg font-semibold text-white transition focus:outline-none focus:ring-4 ${
                    loading || !projectName.trim()
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </main>
  )
}

export default CreateProj
