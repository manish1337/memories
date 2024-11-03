import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const SearchAppBar = styled(Paper)(({ theme }) => ({
  borderRadius: 4,
  marginBottom: '1rem',
  display: 'flex',
  padding: '16px',
}));

export const PaginationPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 4,
  marginTop: '1rem',
  padding: '16px',
}));

export const CustomGridContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column-reverse',
  },
}));
