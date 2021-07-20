import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  Announcement: {
    position: "relative",
    backgroundColor: red[100],
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
  AnnouncementContent: {
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

export default function Announcement(props) {
  const classes = useStyles();
  const { announcements } = props;

  return (
    <Paper
      className={classes.Announcement}
    >
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={11}>
          <div className={classes.AnnouncementContent}>
            <Typography component="h1" variant="h3" color="inherit">
              {announcements.title}
            </Typography>
            <Typography variant="body1" display="block" color="secondary">
              {"by "}
              {announcements.userID}
            </Typography>
            <Typography variant="h6" color="inherit">
              {announcements.content}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

Announcement.propTypes = {
  announcements: PropTypes.object
};