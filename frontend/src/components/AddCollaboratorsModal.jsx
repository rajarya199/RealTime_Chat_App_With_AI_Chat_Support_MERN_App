import React from 'react';

const AddCollaboratorsModal = ({ users, selectedUserId, onUserClick, onClose, onAddCollaborators }) => {
  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
        <header className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Select User</h2>
          <button onClick={onClose} className='p-2'>
            <i className="ri-close-fill"></i>
          </button>
        </header>
        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
          {users.map(user => (
            <div
              key={user._id}
              className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.has(user._id) ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`}
              onClick={() => onUserClick(user._id)}
            >
              <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                <i className="ri-user-fill absolute"></i>
              </div>
              <h1 className='font-semibold text-lg'>{user.username}</h1>
            </div>
          ))}
        </div>
        <button
          onClick={onAddCollaborators}
          className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'
        >
          Add Collaborators
        </button>
      </div>
    </div>
  );
};

export default AddCollaboratorsModal;
