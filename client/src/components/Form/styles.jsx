import { styled } from "@mui/material/styles";
import { Paper, Button } from '@mui/material';

const styles = {
  rootContainer: {
    '& .MuiTextField-root': {
      margin: '8px',
    },
  },
  paper: {
    padding: '16px',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  submitButton: {
    marginBottom: '10px',
  },
};

const RootContainer = styled('div')(styles.rootContainer);
const StyledPaper = styled(Paper)(styles.paper);
const FormContainer = styled('form')(styles.formContainer);
const FileInput = styled('div')(styles.fileInput);
const SubmitButton = styled(Button)(styles.submitButton);

export { RootContainer,
  StyledPaper,
  FormContainer,
  FileInput,
  SubmitButton
};
