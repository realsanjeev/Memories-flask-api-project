import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from '@mui/material';

import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
        style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        showFirstButton showLastButton
        renderItem={(item) => (
            <PaginationItem {...item}
            component={Link}
            to={`/posts?page=${item.page}`} />
        )}
        />
    );
};

export default Paginate;
