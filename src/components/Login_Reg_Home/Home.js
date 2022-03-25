import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Container, ButtonBase, Typography } from "@material-ui/core";
import AppBar from "./AppBar/MainAppBar";
import FeedbackButton from "./FeedbackButton";
import Chat from "./../Images/nus.jpg";
import Forum from "./../Images/forum.jpg";
import Announcement from "./../Images/nus2.jpg";
import { useHistory } from "react-router-dom";
import "@firebase/auth";
import "@firebase/firestore";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    height: "50vh",
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    fontSize: "1.5rem",
    padding: theme.spacing(2),
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
});

function Home(props) {
  const { classes } = props;
  const history = useHistory();

  const images = [
    {
      image: Chat,
      title: "Chat",
      width: "33%",
    },
    {
      image: Forum,
      title: "Forum",
      width: "33%",
    },
    {
      image: Announcement,
      title: "Announcements",
      width: "33%",
    },
  ];

  function NextEvent(x) {
    if (x === 0) {
      history.push("./ChatGroups");
    } else if (x === 1) {
      history.push("./Forum");
    } else if (x === 2) {
      history.push("./Announcement");
    }
  }

  return (
    <div style={{ backgroundColor: "#cfe8fc" }}>
      <Container className={classes.root}>
        <AppBar />
        <div className={classes.images}>
          {images.map((image, index) => (
            <ButtonBase
              key={image.title}
              className={classes.imageWrapper}
              onClick={() => NextEvent(index)}
              style={{
                width: image.width,
              }}
            >
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.image})`,
                }}
              />
              <div className={classes.imageBackdrop} />
              <div className={classes.imageButton}>
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <div className={classes.imageMarked} />
                </Typography>
              </div>
            </ButtonBase>
          ))}
          <FeedbackButton />
        </div>
      </Container>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
