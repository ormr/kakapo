import { FC } from 'react';
import PlusIcon from '../../../assets/PlusIcon';
import AddPostForm from '../AddPostForm';

interface TogglePostFormProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  defaultValues?: any;
}

const TogglePostForm: FC<TogglePostFormProps> = ({ isOpen, defaultValues, onClose, onOpen }) => (
  <div>
    <div className="fixed bottom-3 right-3">
      <button type="button" className="rounded-full bg-neutral-800 text-white p-3" onClick={onOpen}>
        <PlusIcon />
      </button>
    </div>
    {isOpen && <AddPostForm isCreation={!defaultValues} defaultValues={defaultValues} onFormClose={onClose} />}
  </div>
);

TogglePostForm.defaultProps = {
  defaultValues: undefined,
};

export default TogglePostForm;
