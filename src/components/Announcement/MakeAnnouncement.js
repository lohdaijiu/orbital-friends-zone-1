import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../FormTemplate/TextField";
import Typography from "../FormTemplate/Typography";
import BoxButton from "../FormTemplate/Button";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { Button, Container, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: 0,
    display: "flex",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#c8a2c8",
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

function MakeAnnouncement(props) {
  const formValue1 = useRef();
  const formValue2 = useRef();
  const history = useHistory();
  const { classes } = props;

  async function back() {
    try {
      history.push("./Admin");
    } catch {}
  }

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnDisabled1, setBtnDisabled1] = useState(true);

  const createAnnouncement = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Announcement").add({
      title: formValue1.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      content: formValue2.current.value,
      userID: userName,
    });
    history.push("./Admin");
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
          <Grid item xs={12} md={6}>
            <div className={classes.card}>
              <form
                onSubmit={createAnnouncement}
                className={classes.cardContent}
              >
                <Typography variant="h2" component="h2">
                  Announcement
                </Typography>
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Title"
                  inputRef={formValue1}
                  onChange={(text) => setBtnDisabled(!text.target.value)}
                />
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Content"
                  inputRef={formValue2}
                  onChange={(text) => setBtnDisabled1(!text.target.value)}
                  multiline
                />
                <BoxButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  disabled={btnDisabled || btnDisabled1}
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
  } catch(e) {

  }
}

MakeAnnouncement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MakeAnnouncement);
