import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const MainContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));

export const AppBar = styled('div')(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Heading = styled('div')({
  color: 'rgba(0,183,255, 1)',
});

export const Image = styled('img')({
  marginLeft: '15px',
});
