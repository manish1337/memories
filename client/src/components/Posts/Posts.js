import React from 'react';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import { MainContainer } from './styles';

export default function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return 'No posts';

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid component={MainContainer} container alignItems="stretch" spacing={3}>
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
