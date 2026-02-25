import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

import { createPost, updatePost } from "../../actions/posts";
import {
  RootContainer,
  StyledPaper,
  FormContainer,
  FileInput,
  SubmitButton,
} from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const [tagInput, setTagInput] = useState("");

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
    setTagInput("");
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) {
      setPostData(post);
      setTagInput(post.tags?.join(", ") || "");
    }
  }, [post]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentId) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    clear();
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

  const handleDeleteChip = (chipToDelete) => {
    const updatedTags = postData.tags.filter((tag) => tag !== chipToDelete);
    setPostData({ ...postData, tags: updatedTags });
    setTagInput(updatedTags.join(", "));
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTagInput(value);
    setPostData({
      ...postData,
      tags: value.split(",").map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <RootContainer>
      <StyledPaper elevation={6}>
        <FormContainer autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">
            {currentId ? `Editing "${post.title}"` : "Creating a memory"}
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
          <div style={{ padding: "5px 0", width: "94%", display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {postData.tags.map((tag) => (
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
            label="Tags (comma separated)" 
            fullWidth
            value={tagInput}              
            onChange={handleTagChange}
          />
          <FileInput>
            <input
              type="file"
              multiple={false}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setPostData({ ...postData, selectedFile: reader.result });
                  };
                }
              }}
            />
          </FileInput>
          <SubmitButton
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </SubmitButton>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </FormContainer>
      </StyledPaper>
    </RootContainer>
  );
};

export default Form;
