import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import {
  StyledAppBar,
  StyledToolbar,
  StyledImage,
  PurpleAvatar,
  UserName,
  BrandContainerLink,
  Profile
} from './styles';
import * as actionType from '../../constants/actionTypes';
import memoriesText from '../../images/memoriesText.png';
import memoriesLogo from '../../images/memoriesLogo.png';
// import MyApiComponent from '../../api';

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    navigate("/auth", { replace: true });
    setUser(null);
  }
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
    // eslint-disable-next-line
  }, [location, user?.result?.email]);

  return (
    <StyledAppBar position="static" color="inherit">
      {/* <MyApiComponent /> */}
      <BrandContainerLink to="/">
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <StyledImage src={memoriesLogo} alt="icon" height="40px" />
      </BrandContainerLink>
      <StyledToolbar>
        {user?.result ? (
          <Profile>
            <PurpleAvatar alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0).toUpperCase()}</PurpleAvatar>
            <UserName variant="h6">{user?.result.name}</UserName>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </Profile>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};
