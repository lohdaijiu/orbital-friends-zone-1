import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, ButtonBase, Container } from "@material-ui/core";
import Typography from "../Typography";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import Acad from "./../Images/academic.jpg";
import Cca from "./../Images/rockwall.jpg";
import Group from "./../Images/group.jpg"
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(6)
  },
  images: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexWrap: "wrap"
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100
    },
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15
    },
    "&:hover $imageMarked": {
      opacity: 0
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor"
    }
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
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  backButton: {
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(3)
  }
});

function ChatGroups(props) {
  const history = useHistory();
  const { classes } = props;

  const images = [
    {
      image: Acad,
      title: "Academic Advice",
      width: "40%"
    },
    {
      image: Cca,
      title: "CCA and Interests",
      width: "20%"
    },
    {
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80",
      title: "Personal Life and Relationship",
      width: "40%"
    },
    {
      image: "https://ardalis.com/static/4fb4ac75fbd03f00f42e4ac3586c8265/c3638/NotSureIfGoodProgrammer.jpg",
      title: "Memes Only!",
      width: "38%"
    },
    {
      image: Group,
      title: "Assigned Group",
      width: "38%"
    },
    {
      image:
        "https://miro.medium.com/max/1000/0*mD7F8b6gIjsq3gsi",
      title: "Game",
      width: "24%"
    }
  ];

  async function Chat(x) {
    try {
      if (groupId === 0) {
        history.push("./NoChat");
      } else {
        history.push("./Chat", { gNumber: x });
      }
    } catch {}
  }

  async function Game() {
    try {
      history.push("./Game");
    } catch {}
  }

  const [groupId, setGroupId] = useState(0);
  getGroupId().then((x) => setGroupId(x));

  const firestore = firebase.firestore();

  function NextEvent(x) {
    if (x === 0) {
      history.push("./Chat", { gNumber: "Academic Advice" });
    } else if (x === 1) {
      history.push("./Chat", { gNumber: "CCA and Interests" });
    } else if (x === 2) {
      history.push("./Chat", { gNumber: "Personal Life and Relationship" });
    } else if (x === 3) {
      history.push("./Chat", { gNumber: "Memes only!" });
    } else if (x === 4) {
      return Chat(groupId);
    } else if (x === 5) {
      return Game();
    }
  }

  async function ExitGroup() {
    firestore.collection("users").doc(firebase.auth().currentUser?.uid).update({
      groupId: 0
    });
    history.push("./ExitGroupCompleted");
  }

  async function Back() {
    try {
      history.push("./");
    } catch {}
  }

  return (
    <div style={{backgroundColor: "#cfe8fc"}}>
    <Container className={classes.root} component="section">
      <AppBar />
      <Button
            variant="outlined"
            color="inherit"
            className={classes.backButton}
            onClick={Back}
          >
            Back
          </Button>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={() => {
          ExitGroup();
        }}
      >
        Leave assigned group chat
      </Button>
      <div className={classes.images}>
        {images.map((image, index) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            onClick={() => NextEvent(index)}
            style={{
              width: image.width
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.image})`
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
      </div>
    </Container>
    </div>
  );
}

ChatGroups.propTypes = {
  classes: PropTypes.object.isRequired
};

async function getGroupId() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  return printed.data().groupId;
}

export default withStyles(styles)(ChatGroups);
