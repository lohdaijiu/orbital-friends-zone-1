import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core/";
import Question from "./Question.js";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dialog: {
    width: "30vw",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  description: {
    width: "50vw",
    padding: theme.spacing(3),
  },
  button: {
    height: "20vh",
    width: "10vw",
    marginLeft: "25vw",
  },
  confirmButton: {
    marginTop: "3vh",
    width: "7vw",
  },
  instruction: {
    width: "40vw",
  }
}));

export default function Regform() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const [value7, setValue7] = useState(0);
  const [value8, setValue8] = useState(0);
  const [value9, setValue9] = useState(0);
  const [value10, setValue10] = useState(0);
  const [value11, setValue11] = useState(0);
  const [value12, setValue12] = useState(0);
  const [value13, setValue13] = useState(0);
  const [value14, setValue14] = useState(0);
  const [value15, setValue15] = useState(0);
  const [value16, setValue16] = useState(0);
  const [value17, setValue17] = useState(0);
  const [value18, setValue18] = useState(0);
  const [value19, setValue19] = useState(0);
  const [value20, setValue20] = useState(0);
  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
  };
  const handleChange4 = (event) => {
    setValue4(event.target.value);
  };
  const handleChange5 = (event) => {
    setValue5(event.target.value);
  };
  const handleChange6 = (event) => {
    setValue6(event.target.value);
  };
  const handleChange7 = (event) => {
    setValue7(event.target.value);
  };
  const handleChange8 = (event) => {
    setValue8(event.target.value);
  };
  const handleChange9 = (event) => {
    setValue9(event.target.value);
  };
  const handleChange10 = (event) => {
    setValue10(event.target.value);
  };
  const handleChange11 = (event) => {
    setValue11(event.target.value);
  };
  const handleChange12 = (event) => {
    setValue12(event.target.value);
  };
  const handleChange13 = (event) => {
    setValue13(event.target.value);
  };
  const handleChange14 = (event) => {
    setValue14(event.target.value);
  };
  const handleChange15 = (event) => {
    setValue15(event.target.value);
  };
  const handleChange16 = (event) => {
    setValue16(event.target.value);
  };
  const handleChange17 = (event) => {
    setValue17(event.target.value);
  };
  const handleChange18 = (event) => {
    setValue18(event.target.value);
  };
  const handleChange19 = (event) => {
    setValue19(event.target.value);
  };
  const handleChange20 = (event) => {
    setValue20(event.target.value);
  };

  const classes = useStyles();

  const history = useHistory();

  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();

  const [users, setUsers] = useState(0);
  useEffect(() => {
    const countUsers = () =>
    firebase.firestore()
      .collection("users")
      .get()
      .then((snap) => {
        setUsers(snap.size); // will return the collection size
      });
    countUsers();
  }, []);

  function InstructionDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <Paper className={classes.dialog}>
          <br></br>
          <Typography align="center" color="textPrimary" variant="h3">
            Everything is done!
          </Typography>
          <br></br>
          <Typography align="center" color="textPrimary" variant="h7">
            Now, you have to wait for the group completion to be complete. Do
            visit the forum and the other chat groups to talk to others while
            waiting!
          </Typography>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            className={classes.confirmButton}
            onClick={generateScore}
          >
            Continue
          </Button>
        </Paper>
      </Dialog>
    );
  }

  function generateScore(e) {
    e.preventDefault();
    const introvertExtrovert =
      parseInt(value1) +
      parseInt(value2) +
      parseInt(value3) +
      parseInt(value4) +
      parseInt(value5);
    const sensingIntuitive =
      parseInt(value6) +
      parseInt(value7) +
      parseInt(value8) +
      parseInt(value9) +
      parseInt(value10);
    const thinkingFeeling =
      parseInt(value11) +
      parseInt(value12) +
      parseInt(value13) +
      parseInt(value14) +
      parseInt(value15);
    const judgingPerceiving =
      parseInt(value16) +
      parseInt(value17) +
      parseInt(value18) +
      parseInt(value19) +
      parseInt(value20);
    db.collection("/users").doc(uid).set(
      {
        id: users,
        username: usernameRef.current.value,
        admin: false,
        introvertExtrovert: introvertExtrovert,
        sensingIntuitive: sensingIntuitive,
        thinkingFeeling: thinkingFeeling,
        judgingPerceiving: judgingPerceiving,
        groupId: 0,
      },
      { merge: true }
    );
    // go to main page if successful
    history.push("./");
  }

  // checks if username is already used
  function confirmSuccess(e) {
    e.preventDefault();
    setError("");
    // save to database here
    const db = firebase.firestore();
    if (
      value1 &&
      value2 &&
      value3 &&
      value4 &&
      value5 &&
      value6 &&
      value7 &&
      value8 &&
      value9 &&
      value10 &&
      value11 &&
      value12 &&
      value13 &&
      value14 &&
      value15 &&
      value16 &&
      value17 &&
      value18 &&
      value19 &&
      value20
    ) {
      db.collection("/users")
        .where("username", "==", usernameRef.current.value)
        .get()
        .then((doc) => {
          if (doc.size > 0) {
            setError("Username exists");
          } else {
            handleClickOpen();
          }
        });
    } else {
      alert("Please complete all questions!");
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#cfe8fc" }}>
        <InstructionDialog open={open} onClose={handleClose} />
        <Form>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <br></br>
                <Grid item>
                  <Paper className={classes.description}>
                    <h3>Welcome </h3>
                    <p className={classes.instruction}>
                      {" "}
                      We would like to get to know you better! Please answer the
                      following questions as truthfully as possible. 1 will
                      indicate that you cannot relate to the statement at all
                      while 5 means that the sentence describes you perfectly.{" "}
                    </p>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.description}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <p>Username *</p>

                    <TextField
                      id="standard-basic"
                      placeholder="Enter your username"
                      inputRef={usernameRef}
                    />
                  </Paper>
                </Grid>
                <Question
                  name="You regularly make new friends."
                  number="q1"
                  value={value1}
                  onChange={handleChange1}
                />
                <Question
                  name="At social event, you will try to introduce yourself to new people."
                  number="q2"
                  value={value2}
                  onChange={handleChange2}
                />
                <Question
                  name="You feel comfortable just walking up to someone you find interesting and striking up a conversation."
                  number="q3"
                  value={value3}
                  onChange={handleChange3}
                />
                <Question
                  name="In a group, you are usually the one initiating meetups."
                  number="q4"
                  value={value4}
                  onChange={handleChange4}
                />
                <Question
                  name="In your free time, you are more likely to hangout with your friends than to hangout alone."
                  number="q5"
                  value={value5}
                  onChange={handleChange5}
                />
                <Question
                  name="You take enjoyment in building far plans."
                  number="q6"
                  value={value6}
                  onChange={handleChange6}
                />
                <Question
                  name="Imagine you’re hiking. You see a path nobody came across before. Can you take a risk to take it?"
                  number="q7"
                  value={value7}
                  onChange={handleChange7}
                />
                <Question
                  name="You often tend to remember events from your past."
                  number="q8"
                  value={value8}
                  onChange={handleChange8}
                />
                <Question
                  name="You prefer not to go with the flow of things."
                  number="q9"
                  value={value9}
                  onChange={handleChange9}
                />
                <Question
                  name="You tend to pay more attention to the big picture than stick to the details."
                  number="q10"
                  value={value10}
                  onChange={handleChange10}
                />
                <Question
                  name="You describe yourself as a rational human being."
                  number="q11"
                  value={value11}
                  onChange={handleChange11}
                />
                <Question
                  name="Most of the time, emotions are more important than facts
                        in your opinion."
                  number="q12"
                  value={value12}
                  onChange={handleChange12}
                />
                <Question
                  name="When knowing that you have the optimal solution, you
                        will still consult everyone involved to ensure that
                        everyone is agreeable."
                  number="q13"
                  value={value13}
                  onChange={handleChange13}
                />
                <Question
                  name="You will help anyone in need at your own expense."
                  number="q14"
                  value={value14}
                  onChange={handleChange14}
                />
                <Question
                  name="In an argument with your friend, you think that the fact
                        is less important than the feelings of your friend."
                  number="q15"
                  value={value15}
                  onChange={handleChange15}
                />
                <Question
                  name="You plan ahead and have no problem following through when doing a project."
                  number="q16"
                  value={value16}
                  onChange={handleChange16}
                />
                <Question
                  name="You tend to separate both work and play."
                  number="q17"
                  value={value17}
                  onChange={handleChange17}
                />
                <Question
                  name="You work on a single task, complete it efficiently, before moving to the next task."
                  number="q18"
                  value={value18}
                  onChange={handleChange18}
                />
                <Question
                  name="Your desk is usually neat and tidy."
                  number="q19"
                  value={value19}
                  onChange={handleChange19}
                />
                <Question
                  name="You like to take time to weigh all your options before deciding on something."
                  number="q20"
                  value={value20}
                  onChange={handleChange20}
                />
              </Grid>
              <br></br>
              <Grid container className={classes.button}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={confirmSuccess}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </div>
    </>
  );
}