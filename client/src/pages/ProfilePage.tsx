import React, { FC, useEffect, useState } from 'react';
import BriefcaseIcon from '../assets/BriefcaseIcon';
import LocationIcon from '../assets/LocationIcon';
import UniversityIcon from '../assets/UniversityIcon';
import Container from '../components/Container';
import Post from '../components/Post';
import UploadProfilePicture from '../components/UploadProfilePicture';
import { useGetPostsByUserIdQuery } from '../services/api/PostsApi';
import { useAddProfilePictureMutation, useGetUserByIdQuery, useUpdateUserDataMutation } from '../services/api/UsersApi';
import { useAppSelector } from '../store/hooks';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

const defaultValues = {
  location: '',
  position: '',
  degree: '',
  description: '',
};

const ProfilePage = () => {
  const { user } = useAppSelector((app) => app.auth);
  const [addProfilePicture] = useAddProfilePictureMutation();
  const [updateUserData] = useUpdateUserDataMutation();
  const { data: posts } = useGetPostsByUserIdQuery(user?.id);
  const { data: userData } = useGetUserByIdQuery(user?.id);
  const { register, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(userData);
  }, [userData]);

  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    
  };

  return (
    <main className="profile-page pb-12">
      <section className="relative block h-[500px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
          }}
        >
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <UploadProfilePicture href={user?.avatarId} onChange={async (file) => addProfilePicture(file)} />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className={clsx(
                        'bg-gray-400 active:bg-grey-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150',
                        isEdit ? undefined : 'hidden'
                      )}
                      type="button"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsEdit((prevIsEdit) => !prevIsEdit)}
                    >
                      {isEdit ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {userData?.likesCount}
                      </span>
                      <span className="text-sm text-blueGray-400">Likes</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {userData?.postsCount}
                      </span>
                      <span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {userData?.commentsCount}
                      </span>
                      <span className="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <div className="flex justify-center mt-2">
                  <div className="flex gap-3">
                    <LocationIcon />
                    <input
                      {...register('location')}
                      className="text-sm leading-normal mt-0 text-blueGray-400 font-bold uppercase bg-transparent w-48"
                      disabled={!isEdit}
                      placeholder={isEdit ? "Enter location" : "Location hasn't been added"}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-10 mb-2">
                  <div className="flex gap-3">
                    <BriefcaseIcon />
                    <input
                      {...register('position')}
                      className="text-sm text-gray-600 leading-normal bg-transparent w-48"
                      disabled={!isEdit}
                      placeholder={isEdit ? "Enter position" : "Position hasn't been added"}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-10 mb-2">
                  <div className="flex gap-3">
                    <UniversityIcon />
                    <input
                      {...register('degree')}
                      className="text-sm text-gray-600 leading-normal bg-transparent w-48"
                      disabled={!isEdit}
                      placeholder={isEdit ? "Enter degree" : "Degree hasn't been added"}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12">
                    {isEdit ? (
                      <textarea
                        {...register('description')}
                        className="w-full h-full"
                        placeholder="Enter description"
                      />
                    ) : (
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {userData?.description || 'Description has not been added'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto">
        <h1 className="text-center my-2 text-black">Posts:</h1>
        <div className="flex flex-col gap-6">
          {posts?.items.length
            ? posts?.items.map((post) => (
                <Post
                  key={post.id}
                  onLike={() => console.log('!')}
                  onComment={() => console.log('!')}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  {...post}
                />
              ))
            : 'Постов пока нет'}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
