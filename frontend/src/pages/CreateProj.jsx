import React, { useState, useEffect } from 'react'
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'

const CreateProj = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState([])

  const [loading, setLoading] = useState(false) // for fetch state
  const [error, setError] = useState(null) // for error messaging

  const navigate = useNavigate()

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
    <main className='p-4'>
      <div className='projects flex flex-wrap gap-3 mb-4'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='project p-4 border border-slate-300 rounded-md hover:bg-slate-100'
        >
          New Project <i className='ri-link ml-2'></i>
        </button>

        {loading && !isModalOpen && <p>Loading projects...</p>}

        {!loading && projects.length === 0 && (
          <p className='text-gray-500'>No projects available.</p>
        )}

        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/project`, { state: { project } })}
            className='project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200'
          >
            <h2 className='font-semibold'>{project.name}</h2>
            <div className='flex gap-2'>
              <p>
                <small>
                  <i className='ri-user-line'></i> Collaborators
                </small>{' '}
                : {project.users?.length || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {error && <p className='text-red-500 mb-4'>{error}</p>}

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-md shadow-md w-full max-w-md'>
            <h2 className='text-xl mb-4'>Create New Project</h2>
            <form onSubmit={createProject}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Project Name
                </label>
                <input
                  type='text'
                  className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  autoFocus
                  disabled={loading}
                />
              </div>
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400'
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400'
                  disabled={loading || !projectName.trim()}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
            {error && <p className='text-red-500 mt-2'>{error}</p>}
          </div>
        </div>
      )}
    </main>
  )
}

export default CreateProj
