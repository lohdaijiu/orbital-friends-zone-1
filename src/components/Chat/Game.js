import React, { useRef, useState } from "react";
import { Button, Container, Dialog, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "../FormTemplate/TextField";
import Typography from "../FormTemplate/Typography";
import BoxButton from "../FormTemplate/Button";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { yellow } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
  helpButton: {
    backgroundColor: yellow[500],
    color: theme.palette.common.black,
  },
  paperTwo: {
    width: "30vw",
    padding: theme.spacing(3),
    textAlign: "center",
  },
}));

export default function Game() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const formValue = useRef();
  const history = useHistory();
  const classes = useStyles();

  async function back() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  async function Help(e) {
    try {
      e.preventDefault();
      handleClickOpen();
    } catch {}
  }

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Paper className={classes.paperTwo}>
      <br></br>
      <Typography align="center" color="textPrimary" variant="body1">
        Answer the question with your answer. We will match you with people with the same exact answer.
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
        Answer is caps-sensitive! Get Creative!
        </Typography>
        </Paper>
      </Dialog>
    );
  }

  const [btnDisabled, setBtnDisabled] = useState(true);

  const createFeedback = async (e) => {
    e.preventDefault();
    history.push("./Chat", { gNumber: formValue.current.value.toLowerCase() });
  };

  return (
    <div style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
      <AppBar />
      <SimpleDialog open={open} onClose={handleClose} />
      <Button
        variant="outlined"
        color="inherit"
        className={classes.backButton}
        onClick={back}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.helpButton}
        onClick={Help}
      >
        How does this work?
      </Button>
      <Container className={classes.root} component="section">
        <Grid container alignItems="center" justify="center" m={20}>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <form onSubmit={createFeedback} className={classes.cardContent}>
                <Typography variant="h2" component="h2" gutterBottom>
                  Game
                </Typography>
                <Typography variant="h5">
                  Which country will you visit once leisure travel is allowed?
                </Typography>
                <TextField
                  noBorder
                  className={classes.textField}
                  placeholder="Answer"
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


