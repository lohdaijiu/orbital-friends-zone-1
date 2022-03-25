import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Feedback: {
    position: "relative",
    backgroundColor: "#7391C8",
    color: theme.palette.common.black,
    marginBottom: theme.spacing(3),
    backgroundSize: "85% 85%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  FeedbackContent: {
    justifyContent: "center",
    align: "center",
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8),
      paddingRight: 0
    }
  },
}));


export default function Feedback(props) {
  const classes = useStyles();
  const { feedbacks } = props;

  return (
    <Paper
      className={classes.Feedback}
    >
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={11}>
          <div className={classes.FeedbackContent}>
            <Typography variant="h6" color="inherit">
              {feedbacks.content}
            </Typography>
            <Typography variant="body1" display="block" color="inherit">
              {"by "}
              {feedbacks.userID}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

Feedback.propTypes = {
  feedbacks: PropTypes.object
};