import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import { StyledAppBar, BrandContainer, Image, StyledToolbar, Profile, StyledAvatar, UserName, LogoutButton } from './styles';

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <StyledAppBar position="static" color="inherit">
      <Link to="/">
        <BrandContainer>
          <img src={memoriesText} alt="icon" height="45px" />
          <Image src={memoriesLogo} alt="icon" height="40px" />
        </BrandContainer>
      </Link>
      <StyledToolbar>
        {user?.result ? (
          <Profile>
            <StyledAvatar alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </StyledAvatar>
            <UserName variant="h6">{user?.result.name}</UserName>
            <LogoutButton>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </LogoutButton>
          </Profile>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}
