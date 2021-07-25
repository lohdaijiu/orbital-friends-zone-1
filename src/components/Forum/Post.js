import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "../FormTemplate/TextField";
import Typography from "../FormTemplate/Typography";
import BoxButton from "../FormTemplate/Button";
import { Box, Container, Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { blue } from "@material-ui/core/colors";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: 0,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
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

function Post(props) {
  const formValue1 = useRef();
  const formValue2 = useRef();
  const history = useHistory();
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const { currentUser, logout } = useAuth();

  async function back() {
    try {
      history.push("./Forum");
    } catch {}
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnDisabled1, setBtnDisabled1] = useState(true);

  const createPost = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Forum").add({
      title: formValue1.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      likes: 0,
      alreadyLiked: [],
      content: formValue2.current.value,
      userID: userName,
    });

    history.push("./Forum");
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
              <form onSubmit={createPost} className={classes.cardContent}>
                <Typography variant="h2" component="h2" gutterBottom>
                  Create Post
                </Typography>
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Post Title"
                  inputRef={formValue1}
                  onChange={(text) => setBtnDisabled(!text.target.value)}
                />
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Post Content"
                  multiline
                  inputRef={formValue2}
                  onChange={(text) => setBtnDisabled1(!text.target.value)}
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
  } catch {}
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
