import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import Container from '../components/Container';
import {
  Post as IPost,
  useDeletePostMutation,
  useGetPostsQuery,
  useToggleLikePostMutation,
} from '../services/api/PostsApi';
import TogglePostForm from '../components/forms/TogglePostForm';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import AnchorProvider from '../components/AnchorProvider';
import Modal from '../components/Modal';
import Button from '../components/Button';

const usePagination = ({ itemsPerPage }: any) => {
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (totalCount >= itemsPerPage) {
      setPageCount(Math.ceil(totalCount / itemsPerPage));
    }
  }, [offset, itemsPerPage, totalCount]);

  const handlePageClick = (event: any) => {
    if (!totalCount) return;

    const newOffset = (event.selected * itemsPerPage) % totalCount;
    setOffset(newOffset);
  };

  return {
    totalCount,
    setTotalCount,
    offset,
    itemsPerPage,
    pageCount,
    handlePageClick,
  };
};

const LIMIT = 10;

const MainPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { offset, pageCount, setTotalCount, handlePageClick } = usePagination({ itemsPerPage: LIMIT });
  const { data, isLoading } = useGetPostsQuery({ offset, limit: LIMIT });
  const [toggleLike] = useToggleLikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [postData, setPostData] = useState<IPost | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDeleteModal = (newPostData: IPost) => {
    setPostData(newPostData);
    setIsOpen(true);
  };

  const handleDeletePost = async (postId?: number) => {
    if (!postId) return;

    try {
      await deletePost(postId).unwrap();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditModal = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (data?.count) {
      setTotalCount(data?.count);
    }
  }, [data?.count]);

  return (
    <>
      <Container className="h-full">
        {isLoading ? (
          <Spinner className="h-full w-full flex items-center justify-center" />
        ) : (
          <div className="flex flex-col gap-6">
            <AnchorProvider>
              {data?.items?.length ? (
                data?.items?.map((post: any) => (
                  <Post
                    key={post.id}
                    onLike={async () => toggleLike({ isLiked: post.isLiked, postId: post.id })}
                    onComment={() => navigate(`/posts/${post.id}`)}
                    onRepost={() => console.log('!')}
                    onDelete={() => handleOpenDeleteModal(post)}
                    onEdit={() => handleOpenEditModal()}
                    {...post}
                  />
                ))
              ) : (
                <NoPosts />
              )}
            </AnchorProvider>
          </div>
        )}
        <div>
          <Pagination
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
          />
        </div>
      </Container>
      <Modal
        isOpen={isOpen}
        title="Are you sure that you want to delete this post?"
        onCloseModal={() => setIsOpen(false)}
      >
        <WarningModal onClose={() => setIsOpen(false)} onSubmit={() => handleDeletePost(postData?.id)} />
      </Modal>
      <TogglePostForm />
    </>
  );
};

interface WarningModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const WarningModal: FC<WarningModalProps> = ({ onClose, onSubmit }) => (
  <div className="flex flex-col gap-3 mt-3">
    <Button outline onClick={onClose}>
      No
    </Button>
    <Button className="bg-red" onClick={onSubmit}>
      Yes
    </Button>
  </div>
);

const NoPosts = () => <div className="">There is no posts yet :(</div>;

export default MainPage;
