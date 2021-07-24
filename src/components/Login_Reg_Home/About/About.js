import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Paper } from '@material-ui/core';
import Typography from './Typo';
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import ForumIcon from '@material-ui/icons/Forum';
import { Link, useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#cfe8fc",
    minHeight: "100vh",
    maxHeight: "auto",
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(20),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(10),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 200,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(8),
  },
  icons: {
    fontSize: 150,
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;
  const history = useHistory();
  async function regForm() {
    try {
      history.push("/regform");
    } catch {}
  }

  return (
    <section className={classes.root}>
      <Container className={classes.container}>

        <Typography variant="h3" className={classes.title} component="h2">
          Welcome to FriendsZone!
        </Typography>
        <div style={{marginTop: "5vh"}}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
              <GroupIcon className={classes.icons} />
                <Typography variant="h5" align="center">
                  Get into your assigned group and make new friends!
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <ChatIcon className={classes.icons} />
                <Typography variant="h5" align="center">
                Use the Chat Groups to talk to more people!
                </Typography> 
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                
                <ForumIcon className={classes.icons}  />
                <Typography variant="h5" align="center">
                  The forum is there to provide the answers that you require!
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="primary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          onClick = {() => {regForm()}}
        >
          Get started
        </Button>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);



/*
import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function About() {
  const history = useHistory();
  async function regForm {
    try {
      history.push("/regform");
    } catch {}
  }

  return (
    <>
      <Card style={{ backgroundColor: "lightblue" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{ height: "10vh", fontFamily: "Bradley Hand, cursive" }}
              >
                Welcome to FriendsZone!
              </h1>
              <div
                style={{
                  height: "75vh",
                  width: "70vw",
                  margin: "auto",
                  backgroundColor: "lightgrey",
                  padding: 100,
                  borderRadius: 30,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: 25
                }}
              >
                <p>Creator's note:</p>
                <p>
                  Welcome! This is FriendsZone, a project to bring together
                  like-minded students in NUS to help forge lasting friendships.
                  Our project helps place you with three other like-minded users
                  into groups of four. From there on, you can mingle with your
                  groupmates or visit the forum to get to know even more people!
                </p>
                <p>
                  But firstly, we would need to get to know you a little better
                  :). Whenever you are ready, please click on "Continue" to
                  proceed to the questionnaire where we can assess your
                  compatibality with other users.
                </p>
              </div>
              <div style={{ marginLeft: "auto", marginRight: 0 }}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "purple",
                    borderRadius: 20,
                    height: "10vh",
                    width: "10vw",
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
*/