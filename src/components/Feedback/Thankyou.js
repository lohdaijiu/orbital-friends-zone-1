import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
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
      history.push("./");
    } catch {}
  }

  return (
    <div style={{ backgroundColor: "#cfe8fc", minHeight: "100vh" }}>
    <AppBar />
      <Container className={classes.root} component="section">
        <Typography align="center" color="textPrimary" variant="h2">
        Thank you for your feedback!
        </Typography>
        <br></br>
        <Typography align="center" color="textPrimary" variant="subtitle2">
        We have received your feedback and we will work towards improving our application.
        </Typography>
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
    </div>
  );
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThankYou);

