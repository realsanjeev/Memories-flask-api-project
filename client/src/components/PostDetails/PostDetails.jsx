import React, {useEffect} from "react";
import {useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Paper, Typography, Divider, CircularProgress } from "@mui/material";

import {getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import { LoadingPaper, 
  StyledImg, 
  Card, 
  Section, 
  ImageSection,
  RecommendedPosts } from "./styles";

const Post = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const  openPost = (_id) => navigate(`/posts/${_id}`);

    if (isLoading) {
        return (
            <LoadingPaper elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaper >
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Card>
        <Section>
          <Typography variant="h3" component="h2">
            {post.title}
            </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </Section>
        <ImageSection>
          <StyledImg src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </ImageSection>
      </Card>
      {!!recommendedPosts.length && (
        <Section>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <RecommendedPosts>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes?.length}</Typography>
                <img src={selectedFile} width="200px" alt="selected file"/>
              </div>
            ))}
          </RecommendedPosts>
        </Section>
      )}
    </Paper>
  );
};


export default Post;