import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(5),

    height: "100%",
    align: "center",
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5),
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: "50%",
  },
});

function ThankYou(props) {
  const history = useHistory();
  const { classes } = props;

  async function Home() {
    try {
      history.push("./Game");
    } catch {}
  }

  return (
    <>
    <AppBar />
      <Container className={classes.root} component="section">
        <Typography align="center" color="textPrimary" variant="h2">
        How to play the game?
        </Typography>
        <br></br>
        <Typography align="center" color="textPrimary" variant="body1">
        Answer the question with your answer. We will match you with people with the same exact answer. Get Creative!
        </Typography>
        <br></br>
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => Home()}
        >
          Go back
        </Button>
      </Container>
    </>
  );
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThankYou);

