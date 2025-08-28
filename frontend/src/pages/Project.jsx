import React from "react";
import Markdown from "markdown-to-jsx";

import { useParams } from "react-router-dom";
import { UserContext } from "../context/user.context.jsx";
import CollaboratorsSection from "../components/CollabratorsSection.jsx";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "../config/axios";
import hljs from "highlight.js";
import { getWebContainer } from "../config/webContainer.js";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket.js";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Project = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const messageBox = useRef(null);
  // const [webContainer, setWebContainer] = useState(null);
  const webContainerRef = useRef(null);
const [webContainerLoaded, setWebContainerLoaded] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(new Set()); // Initialized as Set
  const [messages, setMessages] = useState([]); // New state variable for messages

  const [fileTree, setFileTree] = useState({});

  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [runProcess, setRunProcess] = useState(null);
  const [logs, setLogs] = useState([]);

useEffect(() => {
  if (!webContainerRef.current) {
    getWebContainer().then(container => {
      webContainerRef.current = container;
      setWebContainerLoaded(true);  // trigger re-render if needed
    });
  }
}, []);

useEffect(() => {
  if (!project?._id) return;

  initializeSocket(project._id);

  receiveMessage("project-message", async(data) => {
    console.log("receive-msg", data);

    if (data.sender.id === "ai") {
      const aiMessage = data.message;
      console.log("ai message:", aiMessage);

      // Use the ref here - no lint warning

      if (aiMessage.fileTree) {
              webContainerRef.current?.mount(aiMessage.fileTree);

        setFileTree(aiMessage.fileTree || {});
      } 

      setMessages((prevMessages) => [...prevMessages, data]);
      //save Ai message to backend if not already saved
      try{
        await axios.post("/messages/save",{
          projectId:project._id,
            text: aiMessage.text || "",
            aiResponse:{
               text: aiMessage.text || "",
                fileTree: aiMessage.fileTree || null,
              buildCommand: aiMessage.buildCommand || null,
              startCommand: aiMessage.startCommand || null,
            },
            isAI:true,
        })
      }
      catch(error){
          console.error("Error saving AI message:", error);

      }
    } else {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  });
}, [project?._id]);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/projects/get-project/${id}`);
        console.log("Fetched project data:", response.data);
        setProject(response.data.project);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await axios.get("/users/all");
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchusers();
  }, []);
 useEffect(() => {
    const fetchMessages = async () => {
      if (!project?._id) return;

      try {
        const res = await axios.get(`/messages/project/${project._id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, [project?._id]);
  const sendMsg = async() => {
    if (!message.trim()) return; // optional: prevent sending empty messages
    const messageObject = {
      message: message,
      sender: user,
    };

    // Send message via socket for real-time update
    sendMessage("project-message", messageObject);
    
//save user message to backend
try{
  await axios.post("/messages/save",{
     projectId: project._id,
        text: message,
        isAI: false,
  })
}catch(error){
        console.error("Error saving user message:", error);

}
 // Update messages in local state immediately

    setMessages((prevMessages) => [...prevMessages, { sender: user, message }]); // Update messages state

    setMessage("");
  };

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  async function addCollaborators() {
    try {
      const res = await axios.put("/projects/add-user", {
        projectId: project._id,
        users: Array.from(selectedUserId),
      });
      console.log(res.data);
      // Update project collaborators in UI after success
      setProject((prev) => ({
        ...prev,
        users: [
          ...prev.users,
          ...users.filter(
            (u) =>
              selectedUserId.has(u._id) &&
              !prev.users.some((pu) => pu._id === u._id)
          ),
        ],
      }));

      // Clear selected users after adding
      setSelectedUserId(new Set());
    } catch (err) {
      console.log(err);
    }
  }
  function WriteAiMessage(message) {
     const text = typeof message === "string" ? message : message?.text || "";

    // try {
    //   if (typeof message === "string" && message.trim().startsWith("{")) {
    //     messageObject = JSON.parse(message);
    //   }
    // } catch (err) {
    //   console.error("Failed to parse message as JSON:", err);
    //   // fallback: treat message as plain text if parse fails
    //   messageObject = { text: message };
    // }
    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          children={text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }
  async function saveFileTree(ft) {
    try {
      const response = await axios.put("/projects/update-file-tree", {
        projectId: project._id,
        fileTree: ft,
      });
      console.log("File tree saved:", response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // No response from server
        console.error("No response:", error.request);
      } else {
        // Something else happened
        console.error("Error", error.message);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <main className="w-full flex flex-col">
      <div className="flex h-[calc(100vh-64px)] w-full ">
      <section className="left relative flex flex-col h-full w-2/3  bg-slate-300">
        <CollaboratorsSection
        projectName={project.name}
          collaborators={project.users}
          allUsers={users}
          selectedUserId={selectedUserId}
          onUserClick={handleUserClick}
          onAddCollaborators={addCollaborators}
        />
        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative ">
          <div
            ref={messageBox}
            className="message-box flex-grow flex flex-col gap-1 p-2 py-2 pt-10 overflow-auto max-h-full scrollbar-hide "
          >
{messages.map((msg, index) => {
  const isAI = msg.sender.id === "ai";
  const hasFiles = isAI && msg.aiResponse?.fileTree;
// console.log("file tree in msg:",hasFiles)
  return (
    <div
      key={index}
      className={`${
        isAI ? "max-w-80" : "max-w-52"
      } ${
        msg.sender.id == user.id.toString() && "ml-auto"
      } message flex flex-col p-2 mb-2 bg-slate-50 w-fit rounded-md relative`}
    >
      <small className="opacity-65 text-xs">{msg.sender.username}</small>
      
      {/* text block */}
      <div className="text-sm">
        {isAI ? WriteAiMessage(msg.message) : msg.message}
      </div>

     
      {hasFiles && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => {
              setFileTree(msg.aiResponse?.fileTree);
              setOpenFiles([]);
setCurrentFile(null);
setIframeUrl(null)
              webContainerRef.current?.mount(msg.aiResponse?.fileTree);
            }}
              className="flex items-center gap-1 bg-blue-600 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition-all"

            title="View Files"
          >
            <span className="text-xs">📂</span> View
          </button>
        </div>
      )}
    </div>
  );
})}


          </div>
          <div className="inputField w-full flex absolute border border-gray-400 bottom-0 bg-white rounded-b-lg">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none flex-grow"
              type="text"
              placeholder="Enter message"
            />
            <button onClick={sendMsg} className="px-5 bg-slate-700 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </section>

        {/* Middle Section - explorer */}
  <section className="middle bg-slate-200  w-1/3 flex flex-col h-full">
    <div className="file-tree w-full overflow-auto flex-grow">
      {Object.keys(fileTree).map((file, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentFile(file);
            setOpenFiles([...new Set([...openFiles, file])]);
          }}
          className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full"
        >
          <p className="font-semibold text-lg">{file}</p>
        </button>
      ))}
    </div>
  </section>
      </div>
{currentFile &&(
  <section className="right  flex-col bg-red-100 flex-grow h-full flex">
     

        <div className="code-editor flex flex-col flex-grow h-full shrink">
          <div className="top flex justify-between">
            <div className="files flex">
              {openFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFile(file)}
                  className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${
                    currentFile === file ? "bg-slate-400" : ""
                  }`}
                >
                  <p className="font-semibold text-lg">{file}</p>
                </button>
              ))}
            </div>
            <div className="actions flex gap-2">
              <button
                onClick={async () => {
                  await webContainerRef.current.mount(fileTree);
//install dependencies
                  const installProcess = await webContainerRef.current.spawn("npm", [
                    "install",
                  ]);
                  installProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                        setLogs(prev => [...prev, chunk]);

                      },
                    })
                  );
await installProcess.exit; // wait until install finishes

//kill old process if running
                  if (runProcess) {
                    runProcess.kill();
                  }
                  //start app
                  let tempRunProcess = await webContainerRef.current.spawn("npm", [
                    "start",
                  ]);

                  tempRunProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                                    setLogs(prev => [...prev, chunk]);

                      },
                    })
                  );
 tempRunProcess.exit.then(code => {
        setLogs(prev => [...prev, `Process exited with code ${code}`]);
      });

                  setRunProcess(tempRunProcess);

                  //preview the url
                  webContainerRef.current.on("server-ready", (port, url) => {
                    console.log(port, url);
                    setIframeUrl(url);
                  });
                }}
                className="p-2 px-4 bg-slate-300 text-white"
              >
                Run
              </button>
                {runProcess && (
    <button
      onClick={() => {
        runProcess.kill();
        setRunProcess(null);
        setLogs(prev => [...prev, "Process stopped manually"]);
      }}
      className="p-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md"
    >
      Stop
    </button>
  )}
            </div>
          </div>
          <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
            {fileTree[currentFile] && (
              <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                <pre className="hljs h-full">
                  <code
                    className="hljs h-full outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: {
                          file: {
                            contents: updatedContent,
                          },
                        },
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(
                        "javascript",
                        fileTree[currentFile].file.contents
                      ).value,
                    }}
                    style={{
                      whiteSpace: "pre-wrap",
                      paddingBottom: "25rem",
                      counterSet: "line-numbering",
                    }}
                  />
                </pre>
              </div>

              
            )}
          </div>
        </div>
     {iframeUrl && webContainerRef.current && (
  <div className="flex min-w-96 flex-col h-full bg-white rounded-md shadow-md p-4">
    <section className="live-preview flex flex-col mb-4 flex-grow">
      <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">Live Preview</h2>
      <div className="address-bar mb-2">
        <input
          type="text"
          onChange={(e) => setIframeUrl(e.target.value)}
          value={iframeUrl}
          className="w-full p-2 px-4 bg-slate-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter preview URL"
        />
      </div>
      <iframe
        src={iframeUrl}
        className="w-full flex-grow border border-gray-300 rounded-md"
        style={{ minHeight: "300px" }}
        title="Live Preview"
      />
    </section>

 <section className="terminal bg-black text-green-400 text-xs font-mono rounded-md p-2 flex flex-col" style={{ height: "10rem" }}>
  <h2 className="text-green-400 text-lg font-semibold mb-1 border-b border-green-600 pb-1 flex-shrink-0">
    Terminal
  </h2>
  <div className="logs overflow-auto px-2 flex-grow">
    {logs.length === 0 ? (
      <div className="opacity-50">[No logs yet]</div>
    ) : (
      logs.map((log, i) => <div key={i}>{log}</div>)
    )}
  </div>
</section>

  </div>
)}

      </section>
)}
    
    </main>
  );
};

export default Project;
