import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const StyledMedia = styled('img')(({ theme }) => ({
  borderRadius: '20px',
  objectFit: 'cover',
  width: '100%',
  maxHeight: '600px',
}));

export const StyledCard = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
}));

export const Section = styled('div')(({ theme }) => ({
  borderRadius: '20px',
  margin: '10px',
  flex: 1,
}));

export const ImageSection = styled('div')(({ theme }) => ({
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

export const RecommendedPosts = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const LoadingPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '15px',
  height: '39vh',
}));

export const CommentsOuterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const CommentsInnerContainer = styled('div')({
  height: '200px',
  overflowY: 'auto',
  marginRight: '30px',
});
