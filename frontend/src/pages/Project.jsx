import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../config/axios'
const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      const [ users, setUsers ] = useState([])

const[isSidePanelOpen, setIsSidePanelOpen] = useState(false);
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <main className='h-screen w-screen flex'>
      <section className='left relative flex flex-col h-screen min-w-96 bg-slate-300'>
        <header className='flex  items-center justify-between p-2 px-4 w-full  bg-slate-100 absolute z-10 top-0'>
                                   <button className='flex gap-2'>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
  <button
  className="p-2 cursor-pointer"
  onClick={() => {
    // console.log('Side panel open:', !isSidePanelOpen);
    setIsSidePanelOpen(!isSidePanelOpen);
  }}
>
  <i className="ri-group-fill"></i>
</button>

        </header>
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
                            
                            className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                        <button
                            className='px-5 bg-slate-700 text-white'><i className="ri-send-plane-fill"></i></button>
                    </div>
        </div>
<div className={`sidePanel  w-full h-full flex flex-col gap-2 bg-slate-50 transition-all top-0 z-10 absolute ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}  ` }>
  <header className='flex justify-between items-center px-4 p-2 bg-slate-200 '>

                        <h1
                            className='font-semibold text-lg'
                        >Collaborators</h1>

                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </header>
                       <div className="users flex flex-col gap-2">

                        {project.users && project.users.map(user => {


                            return (
                                <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.username}</h1>
                                </div>
                            )


                        })}
                    </div>
</div>
      </section>
<section className='right  bg-red-100 flex-grow h-full flex'>

</section>
    </main>
  );
};

export default Project;
