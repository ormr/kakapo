import React, { FC } from 'react';
import { Post as IPost } from '../../services/api/PostsApi';
import Container from '../Container';
import Layout from '../Layout';
import Post from '../Post';

interface FeedProps {
  posts: IPost[];
};

const Feed: FC<FeedProps> = ({ posts }) => (
  <Container>
    <div className="flex flex-col gap-6">
      {posts.map((postItem: any) => (
        <Post
          id={'dcee576c-8436-4b1e-9482-2a6d15698ab3'}
          content="Lorem ipsum dolor sit amet"
          userName="User"
          createdAt="12/12/2022"
        />
      ))}
    </div>
  </Container>
);

export default Feed;
