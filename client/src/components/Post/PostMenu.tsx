import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import DotsIcon from '../../assets/DotsIcon';
import EditIcon from '../../assets/EditIcon';
import ReportIcon from '../../assets/ReportIcon';
import DeleteIcon from '../../assets/DeleteIcon';

interface PostMenuButtonProps {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
}

const PostMenuButton: FC<PostMenuButtonProps> = ({ onEdit, onDelete }) => (
  <div className="w-56 text-right">
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <DotsIcon />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onEdit()}
                  className={`${
                    active ? 'bg-lightgreen text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <EditIcon active={active} className="mr-2 h-5 w-5" aria-hidden="true" />
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onDelete()}
                  className={`${
                    active ? 'bg-lightgreen text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <DeleteIcon active={active} className="mr-2 h-5 w-5 text-green-400" aria-hidden="true" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);

export default PostMenuButton;
