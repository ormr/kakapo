import {Grid} from '@mui/material';
import {RootState} from '@src/app/store';
import {Post, addPost} from '@src/slices/postSlice';
import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {PostPreview} from '../Post';

const author = 'Serafim Gavrilov <seraf.gavrilov@gmail.com>';
const initialValue = {
    id: '',
    title: '',
    description: '',
    createdAt: '',
    author: '',
};

export const Feed: FC = (): ReactElement => {
    const {posts} = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch();
    const [currentPost, setCurrentPost] = useState<Post>(initialValue);

    const handleSubmit = () => {
        dispatch(addPost(currentPost));
        setCurrentPost(initialValue);
    };

    return (
        <Grid container>
            {posts.map((item) => (
                <PostPreview {...item} />
            ))}
        </Grid>
    );
};
