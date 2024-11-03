import { styled } from '@mui/material/styles';
import { AppBar, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
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
}));

export const BrandContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const Image = styled('img')({
  marginLeft: '10px',
  marginTop: '5px',
});

export const StyledToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}));

export const Profile = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '400px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    marginTop: 20,
    justifyContent: 'center',
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));

export const UserName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
});

export const LogoutButton = styled('div')({
  marginLeft: '20px',
});
