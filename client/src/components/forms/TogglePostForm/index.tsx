import React, { FC, useState } from 'react';
import PlusIcon from '../../../assets/PlusIcon';
import AddPostForm from '../AddPostForm';

const TogglePostForm: FC = () => {
  const [showPost, setShowPost] = useState(false);
  return (
    <div>
      <div className="fixed bottom-3 right-3">
        <button type="button" className="rounded-full bg-neutral-800 text-white p-3" onClick={() => setShowPost(true)}>
          <PlusIcon />
        </button>
      </div>
      {showPost && <AddPostForm onFormClose={() => setShowPost(false)} />}
    </div>
  );
};

export default TogglePostForm;
