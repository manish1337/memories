import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { signin, signup } from '../../actions/auth';
import { StyledPaper, StyledAvatar, Form, SubmitButton } from './styles';
import Input from './Input';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [error, setError] = useState('');

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await dispatch(signup(form, navigate));
      } else {
        await dispatch(signin(form, navigate));
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <Form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
          {error && (
            <Typography color="error" variant="body2" style={{ marginBottom: '10px' }}>
              {error}
            </Typography>
          )}
          <Grid container spacing={1}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <SubmitButton>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </SubmitButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </Form>
      </StyledPaper>
    </Container>
  );
}
