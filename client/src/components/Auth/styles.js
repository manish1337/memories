import { styled } from '@mui/material/styles';
import { Paper, Avatar } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  width: '100%',
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  '& .MuiGrid2-root': {
    margin: 0,
    width: '100% !important',
    padding: theme.spacing(1, 0),
  },
}));

export const SubmitButton = styled('div')(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export const GoogleButton = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
