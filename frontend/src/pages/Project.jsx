import React from 'react';
import Markdown from 'markdown-to-jsx'

import { useParams } from 'react-router-dom';
import { UserContext } from '../context/user.context.jsx'
import CollaboratorsSection from "../components/CollabratorsSection.jsx"
import { useEffect, useState ,useContext,useRef} from 'react';
import axios from '../config/axios'
import hljs from 'highlight.js';

import { initializeSocket,receiveMessage,sendMessage } from '../config/socket.js';



function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}


const Project = () => {

  const { id } = useParams();
      const { user } = useContext(UserContext)
const messageBox = useRef(null);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ message, setMessage ] = useState('')
      const [ users, setUsers ] = useState([])
        const [ selectedUserId, setSelectedUserId ] = useState(new Set()) // Initialized as Set
    const [ messages, setMessages ] = useState([]) // New state variable for messages
// function appendIncomingMessage(messageObject){
//   if (!messageBox.current) return;
//   const message = document.createElement('div');
//   message.classList.add('message','max-w-56','flex','flex-col','p-2','bg-slate-50','w-fit','rounded-md');
//   if (messageObject.sender._id === 'ai') {
// const markdown= (<Markdown>{ messageObject.message}</Markdown>)
// message.innerHTML=`
//     <small class='opacity-65 text-xs'>${messageObject.sender.username}</small>
// <p class='text-sm'>${markdown}</p>
// `
//   }else{
//       message.innerHTML=`
//     <small class='opacity-65 text-xs'>${messageObject.sender.username}</small>
//     <p class='text-sm'>${messageObject.message}</p>
//   `;
//   }

//   messageBox.current.appendChild(message);
//   scrollToBottom()
// }

// function appendOutgoingMessage(messageObject){
//    if (!messageBox.current) return;
//   const message = document.createElement('div');
//   message.classList.add('message','ml-auto','max-w-56','flex','flex-col','p-2','bg-slate-50','w-fit','rounded-md');
//   message.innerHTML=`
//     <small class='opacity-65 text-xs'>${messageObject.sender.username}</small>
//     <p class='text-sm'>${messageObject.message}</p>
//   `;
//   messageBox.current.appendChild(message);
//   scrollToBottom()
// }

useEffect(()=>{
    if (!project?._id) return; // Wait until project is loaded

    initializeSocket(project._id)
    receiveMessage('project-message',data=>{
      console.log("receive-msg",data)
    // appendIncomingMessage(data)
    setMessages(prevMessages=>[...prevMessages,data])
    })
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
    if(!message.trim()) return;  // optional: prevent sending empty messages
 const messageObject = {
    message: message,
    sender: user
  };

  sendMessage('project-message', messageObject);
  // appendOutgoingMessage(messageObject);  
           setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state

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

  function scrollToBottom() {
        messageBox.current.scrollTop = messageBox.current.scrollHeight
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
          <div
          ref={messageBox}
          className="message-box flex-grow flex flex-col gap-1 p-1 py-2 overflow-auto max-h-full scrollbar-hide ">
                       {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender.id === 'ai' ? 'max-w-80' : ' max-w-54'} ${msg.sender.id == user.id.toString() && 'ml-auto'}   message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.username}</small>
                                <div className='text-sm'>
                                    {msg.sender.id === 'ai' ?

                                        <div
                                            className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
                                        >
                                            <Markdown
                                            children={msg.message}
                                            options={{
                                              overrides:{
                                                code:SyntaxHighlightedCode
                                              }
                                            }}
                                            
                                            >{msg.message}</Markdown>
                                        </div>
                                        : msg.message}
                                </div>
                            </div>
                        ))}
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
