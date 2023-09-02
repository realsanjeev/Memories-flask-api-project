import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { Grid, Paper, Button } from "@mui/material";

const theme = createTheme({
    breakpoints: {
      values: {
        'sm': 600,
      },
    },
  });

const styles = {
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'block',
        padding: '16px',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    searchButton: {
        marginTop: '4px',
    },
    gridContainer: {
        [[theme.breakpoints.down('sm')]]: {
            flexDirection: 'column-reverse',
        },
    }
};

const StyledGrid = styled(Grid)(styles.gridContainer);
const StyledPaper = styled(Paper)(styles.pagination);
const SearchButton = styled(Button)(styles.searchButton);
const PaperSearchBar = styled(Paper)(styles.appBarSearch);

export {
    StyledGrid,
    SearchButton,
    StyledPaper,
    PaperSearchBar
}
