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
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
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
  },
  commentsInnerContainer: {
    // height: "200px",
    overflowY: 'auto',
    marginRight: "30px",
  }
};

const LoadingPaper = styled(Paper)(styles.loadingPaper);
const RecommendedPosts = styled('div')(styles.recommendedPosts);
const Card = styled('div')(styles.card);
const ImageSection = styled('div')(styles.imageSection);
const StyledImg = styled("img")(styles.media);
const Section = styled('div')(styles.section);

const CommentsInnerContainer = styled("div")(styles.commentsInnerContainer);
const CommentsOuterContainer = styled("div")(styles.commentsInnerContainer);
export { 
    LoadingPaper,
    RecommendedPosts,
    Card,
    StyledImg,
    Section,
    ImageSection,
    CommentsInnerContainer,
    CommentsOuterContainer
 };
