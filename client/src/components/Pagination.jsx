import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';

import { getPosts } from '../actions/posts';
import { StyledPagination } from './styles';

export default function Pagination({ page }) {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return <StyledPagination count={numberOfPages} page={Number(page) || 1} variant="outlined" color="primary" renderItem={(item) => <PaginationItem component={Link} to={`/posts?page=${item.page}`} selected={item.selected} page={item.page} type={item.type} shape={item.shape} />} />;
}
