import React, { useState } from 'react';
import { Container, Grow, TextField, Button, Chip, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import { SearchAppBar, PaginationPaper, CustomGridContainer } from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim().length || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} component={CustomGridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={1} md={2} width="30%">
            <SearchAppBar position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <TextField
                fullWidth
                variant="outlined"
                label="Search Tags"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    handleAddChip(e.target.value);
                    e.target.value = '';
                  }
                }}
                // style={{ margin: '10px 0' }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} onDelete={() => handleDeleteChip(tag)} />
                ))}
              </Box>
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </SearchAppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <PaginationPaper elevation={6}>
                <Pagination page={page} />
              </PaginationPaper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
