import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "./AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, Typography } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { firebase } from "@firebase/app";

const styles = (theme) => ({
  title: {
    fontSize: 40,
  },
  placeholder: {
    height: 64,
    [theme.breakpoints.up("sm")]: {
      height: 70,
    },
  },
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    float: "left",
  },
  center: {
    float: "left",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  welcome: {
    color: theme.palette.common.white,
  },
});

function MainAppBar(props) {
  const { classes } = props;

  const history = useHistory();

  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <Typography
              variant="subtitle"
              underline="none"
              className={classes.welcome}
            >
              {"Welcome, "}
              {userName}
            </Typography>
          </div>
          <div className={classes.center}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="./admin"
            >
              {"FriendsZone"}
            </Link>
          </div>
          <div className={classes.right}>
            <Link
              component="button"
              className={classes.rightLink}
              onClick={() => {
                handleLogout();
              }}
            >
              {<ExitToAppIcon fontSize="large" />}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  try {
    return printed.data().username;
  } catch {}
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);
