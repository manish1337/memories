import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
}));

export const FileInputWrapper = styled('div')({
  width: '97%',
  margin: '10px 0',
});

export const SubmitButton = styled('div')({
  marginBottom: '10px',
  width: '100%',
});
