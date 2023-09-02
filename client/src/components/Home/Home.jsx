import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Chip from "@mui/material/Chip";
import { Container, Grow, Grid, TextField } from '@mui/material';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination/Pagination';

import { getPostsBySearch } from '../../actions/posts';
import { StyledGrid, StyledPaper, PaperSearchBar, SearchButton } from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  useEffect(() => {
    const tags = query.get('tags');

    if (searchQuery && tags) {
      // Perform the search and update the state accordingly
      setSearch(searchQuery);
      setTags(tags.split(',').map(tag => tag.trim()));
      dispatch(getPostsBySearch({ search: searchQuery, tags }));
    }
  }, [setSearch]);

  const searchPost = () => {
    if (search.trim() || tags) {
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

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
  };

  const chipDisplay = tags.map((tag) => (
    <Chip
      key={tag}
      name="tags"
      variant="outlined"
      label={tag}
      onDelete={() => handleDeleteChip(tag)}
    />
  ));


  return (
    <Grow in>
      <Container maxWidth="xl">
        <StyledGrid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PaperSearchBar elevation={6}>
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div style={{ padding: "5px 2px", width: "94%" }}>{chipDisplay}</div>
              <TextField
                name="tags"
                variant="outlined"
                label="Search Tags (coma separated)"
                fullWidth
                value={tags.join(",")} // Join tags to show them as a comma-separated string
                onChange={(e) =>
                  setTags(e.target.value.split(",").map(tag => tag.trim()))

                }
              />
              <SearchButton onClick={searchPost} variant="contained" color="primary" fullWidth>
              Search
            </SearchButton>
            </PaperSearchBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />


            {(!searchQuery && !tags.length) && (
              <StyledPaper elevation={6}>
                <Paginate page={page} />
              </StyledPaper>
            )}
          </Grid>
        </StyledGrid>
      </Container>
    </Grow>
  );
};

export default Home;