import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9)
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5)
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
});

function FeedbackButton(props) {
  const history = useHistory();
  const { classes } = props;

  async function handleFeedback() {
    history.push("./CreateFeedback");
  }

  return (
    <Container className={classes.root} component="section">
      <Button className={classes.button} onClick={handleFeedback}>
        <Typography variant="h6" component="span">
          Feedback
        </Typography>
      </Button>
      <Typography variant="subtitle2" className={classes.link}>
        We appreciate all feedback to improve our application!
      </Typography>
    </Container>
  );
}

FeedbackButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedbackButton);
