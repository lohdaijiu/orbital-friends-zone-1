import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import ChatIcon from "@material-ui/icons/Chat";
import ForumIcon from "@material-ui/icons/Forum";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#cfe8fc",
    minHeight: "100vh",
    maxHeight: "auto",
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(20),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(10),
  },
  button: {
    marginTop: theme.spacing(8),
  },
  icons: {
    fontSize: 150,
  },
});

function About(props) {
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
              <ForumIcon className={classes.icons} />
              <Typography variant="h5" align="center">
                The forum is there to provide the answers that you require!
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Button
          color="primary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          onClick={regForm}
        >
          Get started
        </Button>
      </Container>
    </section>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
