import { useParams } from 'react-router-dom';
import { UserContext } from '../context/user.context.jsx'
import CollaboratorsSection from "../components/CollabratorsSection.jsx"
import { useEffect, useState ,useContext} from 'react';
import axios from '../config/axios'
import { initializeSocket,receiveMessage,sendMessage } from '../config/socket.js';
const Project = () => {

  const { id } = useParams();
      const { user } = useContext(UserContext)

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ message, setMessage ] = useState([])
      const [ users, setUsers ] = useState([])
        const [ selectedUserId, setSelectedUserId ] = useState(new Set()) // Initialized as Set


useEffect(()=>{
    if (!project?._id) return; // Wait until project is loaded

    initializeSocket(project._id)
    receiveMessage('project-message',data=>{console.log("receive-msg",data)})
},[project?._id]);
  useEffect(() => {

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/projects/get-project/${id}`);
       console.log("Fetched project data:", response.data);
setProject(response.data.project);

      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);


  useEffect(()=>{

    const fetchusers=async()=>{
      try{
        const res=await axios.get('/users/all')
                    setUsers(res.data.users)

      }
      catch(error){
        console.log(error)
      }
    }
fetchusers()
  },[])

const sendMsg=()=>{
     sendMessage('project-message', {
            message,
            sender: user
        })
    setMessage('')
}

     const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });


    }

    async function addCollaborators() {
    try {
        const res = await axios.put("/projects/add-user", {
            projectId: project._id,
            users: Array.from(selectedUserId)
        });
        console.log(res.data);
             // Update project collaborators in UI after success
      setProject(prev => ({
        ...prev,
        users: [
          ...prev.users,
          ...users.filter(u => selectedUserId.has(u._id) && !prev.users.some(pu => pu._id === u._id))
        ]
      }));

      // Clear selected users after adding
      setSelectedUserId(new Set());
    } catch (err) {
        console.log(err);
    }
}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <main className='h-screen w-screen flex'>
      <section className='left relative flex flex-col h-screen min-w-96 bg-slate-300'>
        <CollaboratorsSection
          collaborators={project.users}
          allUsers={users}
          selectedUserId={selectedUserId}
          onUserClick={handleUserClick}
          onAddCollaborators={addCollaborators}
        />
        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div className="message-box flex-grow flex flex-col gap-1 p-1 py-2 ">
            <div className='message max-w-52 flex flex-col p-2 bg-slate-50 w-fit rounded-md'>
<small className=' opacity-65 text-xs'>username</small>
<p className='text-sm'> nnnnnnnnnnnnn</p>
            </div>

            <div className=' ml-auto p-2  max-w-52 message flex flex-col bg-slate-50 w-fit rounded-md'>
<small className=' opacity-65 text-xs'>username</small>
<p className='text-sm'> nnnnnnnnnnnnn</p>
            </div>
          </div>
          <div className="inputField w-full flex absolute bottom-0 bg-white rounded-b-lg">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                        <button
                        onClick={sendMsg}
                            className='px-5 bg-slate-700 text-white'><i className="ri-send-plane-fill"></i></button>
                    </div>
        </div>

      </section>
<section className='right  bg-red-100 flex-grow h-full flex'>

</section>


    </main>
  );
};

export default Project;
