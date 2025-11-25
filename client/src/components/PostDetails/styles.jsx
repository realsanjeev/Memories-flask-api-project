import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/system";
import { Paper } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const styles = {
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    gap: '20px',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    minWidth: 0,
  },
  imageSection: {
    marginLeft: '0',
    flex: '0 1 45%',
    maxWidth: '45%',
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 100%',
      maxWidth: '100%',
      marginTop: '20px',
    },
  },
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  recommendedPost: {
    cursor: 'pointer',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: 'translateY(-4px)',
      borderColor: '#1976d2',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  recommendedPostImage: {
    width: '100%',
    maxWidth: '200px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '10px',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: 'auto',
    marginRight: "30px",
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      height: '150px',
    },
  }
};

const LoadingPaper = styled(Paper)(styles.loadingPaper);
const RecommendedPosts = styled('div')(styles.recommendedPosts);
const RecommendedPost = styled('div')(styles.recommendedPost);
const RecommendedPostImage = styled('img')(styles.recommendedPostImage);
const Card = styled('div')(styles.card);
const ImageSection = styled('div')(styles.imageSection);
const StyledImg = styled("img")(styles.media);
const Section = styled('div')(styles.section);

const CommentsInnerContainer = styled("div")(styles.commentsInnerContainer);
const CommentsOuterContainer = styled("div")(styles.commentsOuterContainer);
export {
  LoadingPaper,
  RecommendedPosts,
  RecommendedPost,
  RecommendedPostImage,
  Card,
  StyledImg,
  Section,
  ImageSection,
  CommentsInnerContainer,
  CommentsOuterContainer
};
