import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import FileBase from "react-file-base64";

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
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  const chipDisplay = postData.tags.map((tag) => (
    <Chip
      key={tag}
      name="tags"
      variant="outlined"
      label={tag}
      onDelete={() => handleDeleteChip(tag)}
    />
  ));

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
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <div style={{ padding: "5px 0", width: "94%" }}>{chipDisplay}</div>
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags.join(",")} // Join tags to show them as a comma-separated string
            onChange={(e) =>
              setPostData({ ...postData,
                tags: e.target.value.split(",").map(tag => tag.trim()) })

            }
          />
          <FileInput>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
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
