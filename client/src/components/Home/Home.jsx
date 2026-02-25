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
  const [tagInput, setTagInput] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const tagsParam = query.get('tags');

  useEffect(() => {
    if (searchQuery && tagsParam) {
      setSearch(searchQuery);
      const parsedTags = tagsParam.split(',').map(tag => tag.trim());
      setTags(parsedTags);
      setTagInput(parsedTags.join(', '));
      dispatch(getPostsBySearch({ search: searchQuery, tags: tagsParam }));
    }
  }, [searchQuery, tagsParam, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    const updated = tags.filter((tag) => tag !== chipToDelete);
    setTags(updated);
    setTagInput(updated.join(', '));
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTagInput(value);
    setTags(value.split(',').map(tag => tag.trim()).filter(Boolean));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <StyledGrid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid size={{ xs: 12, sm: 6, md: 9 }}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
              <div style={{ padding: '5px 2px', width: '94%', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    variant="outlined"
                    label={tag}
                    onDelete={() => handleDeleteChip(tag)}
                  />
                ))}
              </div>
              <TextField
                name="tags"
                variant="outlined"
                label="Search Tags (comma separated)"
                fullWidth
                value={tagInput}
                onChange={handleTagChange}
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