import { styled } from "@mui/material/styles";
import {
    Card,
    CardActions,
    CardMedia,
    Typography,
    ButtonBase
} from "@mui/material";

const styles = {
    media: {
        height: 10,
        paddingTop: "56.25%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
    },
    border: {
        border: "solid",
    },
    fullHeightCard: {
        height: "100%",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        width: "auto",
    },
    overlay: {
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
    },
    ovelay2: {
        position: "absolute",
        top: "20px",
        right: "20px",
        color: "white",
    },
    grid: {
        display: "flex",
    },
    details: {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
    },
    title: {
        padding: "0 16px",
    },
    cardActions: {
        padding: "0 16px 8px 16px",
        display: "flex",
        justifyContent: "spacce-between",
    },
    cardAction: {
        display: "block",
        textAlign: "initial",
    },
}

const StyledCard = styled(Card)(styles.card);
const StyledCardMedia = styled(CardMedia)(styles.media);
const Overlay = styled("div")(styles.overlay);
const Overlay2 = styled("div")(styles.ovelay2);
const Details = styled("div")(styles.details);
const StyledTitle = styled(Typography)(styles.title);
const StyledCardActions = styled(CardActions)(styles.cardActions);
const StyledButtonBase = styled(ButtonBase)(styles.cardAction);

export {
    StyledCard,
    StyledCardMedia,
    Overlay,
    Overlay2,
    Details,
    StyledTitle,
    StyledCardActions,
    StyledButtonBase
};