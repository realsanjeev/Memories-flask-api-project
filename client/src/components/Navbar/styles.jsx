import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/system";
import { deepPurple } from '@mui/material/colors';
import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: deepPurple[500],
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
}});
const styles = {
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: "400px",
    "& > *": {
      margin: "0 8px",
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    "& > *": {
      margin: "0 8px",
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: 'white',
    backgroundColor: deepPurple[500],
  },
};

const StyledAppBar = styled(AppBar)(styles.appBar);
const BrandContainerLink = styled(Link)(styles.brandContainer);
const StyledTypography = styled(Typography)(styles.heading);
const PurpleAvatar = styled(Avatar)(styles.purple);
const StyledToolbar = styled(Toolbar)(styles.toolbar);
const Profile = styled("div")(styles.profile);
const StyledImage = styled("img")(styles.image);
const UserName = styled(Typography)(styles.userName);
const LogoutButton = styled(Button)(styles.logout);

export { StyledAppBar,
  BrandContainerLink,
  StyledTypography,
  StyledToolbar,
  StyledImage,
  PurpleAvatar,
  Profile,
  UserName,
  LogoutButton 
};