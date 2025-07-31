import React, { useState } from 'react';
import CollaboratorsPanel from './CollaboratorsPanel.jsx';
import AddCollaboratorsModal from './AddCollaboratorsModal.jsx';

const CollaboratorsSection = ({
  collaborators,        // Array of collaborators (project.users)
  allUsers,             // Array of all users fetched
  selectedUserId,       // Set of selected user ids (in modal)
  onUserClick,          // callback to select/unselect user
  onAddCollaborators    // callback to add collaborators
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  return (
    <>
      <header className='flex items-center justify-between p-2 px-4 w-full bg-slate-100 absolute z-10 top-0'>
        <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
          <i className="ri-add-fill mr-1"></i>
          <p>Add collaborator</p>
        </button>
        <button
          className="p-2 cursor-pointer"
          onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
        >
          <i className="ri-group-fill"></i>
        </button>
      </header>

      <CollaboratorsPanel
        isOpen={isSidePanelOpen}
        users={collaborators}
        onClose={() => setIsSidePanelOpen(false)}
      />

      {isModalOpen && (
        <AddCollaboratorsModal
          users={allUsers}
          selectedUserId={selectedUserId}
          onUserClick={onUserClick}
          onClose={() => setIsModalOpen(false)}
          onAddCollaborators={() => {
            onAddCollaborators();
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default CollaboratorsSection;
