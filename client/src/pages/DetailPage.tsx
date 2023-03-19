import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../services/api/PostsApi';

const DetailPage: FC = () => {
  const { postId } = useParams();
  const { data } = useGetPostByIdQuery(postId);
  console.log(data);
  return <div>Detail page</div>;
};

export default DetailPage;
