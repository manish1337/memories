import { styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

export const MainContainer = styled('div')({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 50px',
});

export const StyledHeading = styled('div')(({ theme }) => ({
  color: 'rgba(0,183,255, 1)',
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const StyledImage = styled('img')(({ theme }) => ({
  marginLeft: '15px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '5px',
  },
}));

export const StyledToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    width: '160px',
  },
}));

export const Profile = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '400px',
});

export const UserName = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const BrandContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const SmMargin = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const Purple = styled('div')(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));

export const StyledAppBar = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px',
  },
}));

export const ActionDiv = styled('div')({
  textAlign: 'center',
});
