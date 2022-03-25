import React from "react";
import PropTypes from "prop-types";
import { Container, Typography, Button } from "@material-ui/core";
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

function NoChat(props) {
  const history = useHistory();
  const { classes } = props;

  async function ChatGroups() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  return (
    <div style={{ backgroundColor: "#cfe8fc", minHeight: "100vh" }}>
      <AppBar />
      <Container className={classes.root} component="section">
        <Typography align="center" color="textPrimary" variant="h2">
          Exit group successful!
        </Typography>
        <br></br>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You will be reassigned a group on the next cycle. Keep a lookout!
        </Typography>
        <br></br>
        <br></br>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => ChatGroups()}
        >
          Go back
        </Button>
      </Container>
    </div>
  );
}

NoChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoChat);
