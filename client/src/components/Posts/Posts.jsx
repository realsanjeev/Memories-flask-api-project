import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

import Post from "./Post/Post";
import { StyledGrid } from "./styles";

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts?.length && !isLoading) return "No Posts";

    return (
        isLoading ? <CircularProgress /> : (
            <StyledGrid container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </StyledGrid>
        )
    );
};

export default Posts;