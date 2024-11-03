import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    const pageNum = parseInt(page, 10);
    if (!pageNum || pageNum < 1) {
      throw new Error('Invalid page number. Page must be a positive integer.');
    }

    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(pageNum);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    throw new Error(error.message);
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    navigate(`/posts/${data._id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    throw new Error(error.message);
  }
};
