import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Paper, Typography, Divider, CircularProgress, Chip } from "@mui/material";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import {
  LoadingPaper,
  StyledImg,
  Card,
  Section,
  ImageSection,
  RecommendedPosts,
  RecommendedPost,
  RecommendedPostImage,
} from "./styles";

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags?.join(",") })
      );
    }
  }, [post, dispatch]);

 
  if (isLoading) {
    return (
      <LoadingPaper elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaper>
    );
  }

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <Card>
        <Section>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            {post.tags?.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                style={{ marginRight: "8px", marginBottom: "8px" }}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </Section>
        <ImageSection>
          <StyledImg
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </ImageSection>
      </Card>
      {!!recommendedPosts.length && (
        <Section>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <RecommendedPosts>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <RecommendedPost onClick={() => openPost(_id)} key={_id}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontWeight: 600 }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    By {name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="caption" color="primary">
                    ❤️ {likes?.length ?? 0}{" "}
                    {likes?.length === 1 ? "like" : "likes"}
                  </Typography>
                  {selectedFile && (
                    <RecommendedPostImage src={selectedFile} alt={title} />
                  )}
                </RecommendedPost>
              )
            )}
          </RecommendedPosts>
        </Section>
      )}
    </Paper>
  );
};

export default Post;