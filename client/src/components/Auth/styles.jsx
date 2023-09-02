import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/system";
import { Avatar, Button, Paper } from '@mui/material';
import { red } from "@mui/material/colors";

const theme = createTheme({
  spacing: 4,
  palette: {
    secondary: {
      main: red[500],
    },
  },
});
const styles =   {
  paper: {
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
},
root: {
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
},
avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
},
form: {
  width: '100%', 
  marginTop: theme.spacing(3),
},
submit: {
  margin: theme.spacing(3, 0, 2),
},
};

const StyledPaper = styled(Paper)(styles.paper);
const StyledAvatar = styled(Avatar)(styles.avatar);
const StyledForm = styled('form')(styles.form);
const SubmitButton = styled(Button)(styles.submit);

export { StyledPaper, StyledAvatar, StyledForm, SubmitButton }