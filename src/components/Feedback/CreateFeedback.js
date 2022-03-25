import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";
import TextField from "../FormTemplate/TextField";
import Typography from "../FormTemplate/Typography";
import BoxButton from "../FormTemplate/Button";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#7391C8",
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
});

function MakeFeedback(props) {
  const formValue = useRef();
  const history = useHistory();
  const { classes } = props;

  async function back() {
    try {
      history.push("./");
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const [btnDisabled, setBtnDisabled] = useState(true);

  const createFeedback = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Feedback").add({
      content: formValue.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      userID: userName,
    });
    history.push("./Thankyou");
  };

  return (
    <div style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
      <AppBar />
      <Button
        variant="outlined"
        color="inherit"
        className={classes.backButton}
        onClick={back}
      >
        Back
      </Button>
      <Container className={classes.root} component="section">
        <Grid container alignItems="center" justify="center" m={20}>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <form onSubmit={createFeedback} className={classes.cardContent}>
                <Typography variant="h2" component="h2" gutterBottom>
                  Feedback
                </Typography>
                <Typography variant="h5">
                  How can we improve the app?
                </Typography>
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Type Here"
                  multiline
                  inputRef={formValue}
                  onChange={(text) => setBtnDisabled(!text.target.value)}
                />
                <BoxButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  disabled={btnDisabled}
                >
                  Submit
                </BoxButton>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
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

MakeFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MakeFeedback);
