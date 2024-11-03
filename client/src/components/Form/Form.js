import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Chip, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

import { createPost, updatePost } from '../../actions/posts';
import { StyledPaper, StyledForm, FileInputWrapper, SubmitButton } from './styles';

export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });
  const post = useSelector((state) => (currentId ? state?.posts?.posts?.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState('');

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    if (postData.selectedFile.length > 0) {
      if (postData.selectedFile.substring(0, 11) === 'data:image/') {
        console.log('GOOD - selectedFile=' + postData.selectedFile.substring(0, 35) + ' ...');
      } else {
        alert('File type not allowed. Make sure to choose an image for your memory.');
        console.log('BAD - selectedFile NOT AN IMAGE: ' + postData.selectedFile.substring(0, 35) + ' ...');
        setPostData({ ...postData, selectedFile: '' });
      }
    } else {
      console.log('post.selectedFile is blank or was set blank: ' + JSON.stringify(postData));
    }
  }, [postData.selectedFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postData.title || !postData.message) {
      alert('Please fill in both title and message fields');
      return;
    }

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <StyledPaper elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </StyledPaper>
    );
  }

  const handleAddChip = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setPostData({
        ...postData,
        tags: [...postData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <StyledPaper elevation={6}>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (Press Enter to add)" fullWidth value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddChip} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {postData.tags.map((tag, index) => (
            <Chip key={index} label={tag} onDelete={() => handleDeleteChip(tag)} color="primary" variant="outlined" />
          ))}
        </Box>
        <FileInputWrapper>
          <FileBase key={postData.selectedFile} type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </FileInputWrapper>
        <SubmitButton>
          <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
        </SubmitButton>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </StyledForm>
    </StyledPaper>
  );
}
