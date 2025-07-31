import React from 'react';

const CollaboratorsPanel = ({ isOpen, users, onClose }) => {
  return (
    <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 transition-all top-0 z-10 absolute ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>
        <h1 className='font-semibold text-lg'>Collaborators</h1>
        <button onClick={onClose} className='p-2'>
          <i className="ri-close-fill"></i>
        </button>
      </header>
      <div className="users flex flex-col gap-2">
        {users && users.map(user => (
          <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
            <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
              <i className="ri-user-fill absolute"></i>
            </div>
            <h1 className='font-semibold text-lg'>{user.username}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorsPanel;
