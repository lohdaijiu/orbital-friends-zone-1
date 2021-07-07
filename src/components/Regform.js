import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "20vh",
    width: "50vw",
    padding: theme.spacing(3),
    textAlign: "center"
  },
  description: {
    height: "20vh",
    width: "50vw",
    padding: theme.spacing(3),
  },
  radio: {
    justify: "center"
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Regform() {
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
  const countUsers = () =>
    db
      .collection("users")
      .get()
      .then((snap) => {
        setUsers(snap.size); // will return the collection size
      });
  useEffect(() => {
    countUsers();
  }, []);

  function generateScore(e) {
    e.preventDefault();
    const score1 =
      parseInt(value1) +
      parseInt(value2) +
      parseInt(value3) +
      parseInt(value4) +
      parseInt(value5) +
      parseInt(value6) +
      parseInt(value7) +
      parseInt(value8) +
      parseInt(value9) +
      parseInt(value10);
    const score2 =
      parseInt(value11) +
      parseInt(value12) +
      parseInt(value13) +
      parseInt(value14) +
      parseInt(value15) +
      parseInt(value16) +
      parseInt(value17) +
      parseInt(value18) +
      parseInt(value19) +
      parseInt(value20);
      console.log(usernameRef.current.value)
    // save to database here
    const uid = firebase.auth().currentUser?.uid;
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
      db.collection("/users").doc(uid).set(
        {
          id: users,
          username: usernameRef.current.value,
          admin: false,
          score1: score1,
          score2: score2,
          groupId: 0,
        },
        { merge: true }
      );
      history.push("/regform_success");
    } else {
      alert("Please complete all questions!");
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#cfe8fc" }}>
      <Form onSubmit={generateScore}>
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
                <p style={{ width: "40vw" }}>
                {" "}
                Please answer the following questions as truthfully as possible
                to ensure that our matching is accurate. 1 will indicate that
                you cannot relate to the statement at all while 5 means that the
                sentence describes you perfectly.{" "}
              </p>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                <p>Username *</p>
                <TextField id="standard-basic"  placeholder="Enter your username" inputRef={usernameRef}/>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You regularly make new friends.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q1"
                    name="q1"
                    value={value1}
                    onChange={handleChange1}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    At social event, you will try to introduce yourself to new people.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q2"
                    name="q2"
                    value={value2}
                    onChange={handleChange2}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You feel comfortable just walking up to someone you find interesting and striking up a conversation.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q3"
                    name="q3"
                    value={value3}
                    onChange={handleChange3}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    In a group, you are usually the one initiating meetups.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q4"
                    name="q4"
                    value={value4}
                    onChange={handleChange4}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    In your free time, you are more likely to hangout with your friends than to hangout alone.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q5"
                    name="q5"
                    value={value5}
                    onChange={handleChange5}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You cannot stand eating alone.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q6"
                    name="q6"
                    value={value6}
                    onChange={handleChange6}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    Given a choice between partying and spending some alone time, you would prefer the former most of the time.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q7"
                    name="q7"
                    value={value7}
                    onChange={handleChange7}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You cannot be left out in a group discussion.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q8"
                    name="q8"
                    value={value8}
                    onChange={handleChange8}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You are happy to start the conversation in a group setting.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q9"
                    name="q9"
                    value={value9}
                    onChange={handleChange9}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You often take the lead in decision making within a group.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q10"
                    name="q10"
                    value={value10}
                    onChange={handleChange10}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You describe yourself as a rational human being.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q11"
                    name="q11"
                    value={value11}
                    onChange={handleChange11}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    Most of the time, emotions are more important than facts in your opinion.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q12"
                    name="q12"
                    value={value12}
                    onChange={handleChange12}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You usually prefer just doing what you feel like at any given moment instead of planning a particular daily routine.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q13"
                    name="q13"
                    value={value13}
                    onChange={handleChange13}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You will help anyone in need at your own expense.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q14"
                    name="q14"
                    value={value14}
                    onChange={handleChange14}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    In an argument with your friend, you think that the fact is less important than the feelings of your friend.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q15"
                    name="q15"
                    value={value15}
                    onChange={handleChange15}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You will let your emotions of a situation disrupt your workflow.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q16"
                    name="q16"
                    value={value16}
                    onChange={handleChange16}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    When knowing that you have the optimal solution, you will still consult everyone involved to ensure that everyone is agreeable.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q17"
                    name="q17"
                    value={value17}
                    onChange={handleChange17}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You try to avoid conflict at all costs, even when you are in the right.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q18"
                    name="q18"
                    value={value18}
                    onChange={handleChange18}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    You value Harmony the most.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q19"
                    name="q19"
                    value={value19}
                    onChange={handleChange19}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>

              <Grid item>
                <Paper className={classes.description}>
                
                <FormControl component="fieldset">

                  <FormLabel component="legend">
                    {" "}
                    When making an important life decision, you consider your personal feelings first.
                  </FormLabel>
                  <br></br>

                  <RadioGroup
                    row
                    aria-label="q20"
                    name="q20"
                    value={value20}
                    onChange={handleChange20}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="2" control={<Radio />} label="2" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="3" control={<Radio />} label="3" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="4" control={<Radio />} label="4" style={{marginLeft:"4vw"}}/>
                    <FormControlLabel value="5" control={<Radio />} label="5" style={{marginLeft:"4vw"}}/>
                  </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
        <div style={{ marginLeft: "auto", marginRight: 0 }}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "purple",
                  borderRadius: 20,
                  width: "10vw",
                  height: "10vh",
                }}
              >
                Complete
              </Button>
            </div>
        </Form>
      </div>
      
    </>
  );
}
