import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";


const useStyles = makeStyles((theme) => ({
  IndividualPost: {
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
  IndividualPostContent: {
    justifyContent: "center",
    align: "center",
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
      paddingRight: 0
    }
  },
  likebutton: {
    backgroundColor: "#e6e6fa",
    marginRight: theme.spacing(2)
  },
  commentbutton: {
    backgroundColor: "#e6e6fa",
    marginRight: theme.spacing(2)
  },
}));

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function IndividualPost(props) {
  const classes = useStyles();
  const { post } = props;

  const postRef = firestore.collection("Forum");

  const history = useHistory();

  async function giveLike(identity, numOfLikes, likedArray) {
    const currUid = await auth.currentUser.uid;
    console.log(likedArray);
    if (likedArray.includes(currUid)) {
      postRef.doc(identity).update({
        likes: numOfLikes - 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayRemove(currUid)
      });
    } else {
      postRef.doc(identity).update({
        likes: numOfLikes + 1,
        alreadyLiked: firebase.firestore.FieldValue.arrayUnion(currUid)
      });
    }
  }

  async function writeComment(x) {
    try {
      console.log(x);
      history.push("./addComment", { postId: x });
    } catch {}
  }

  function LikeorLikes(x) {
    if (x === 0 || x === 1) {
      return " like";
    } else {
      return " likes";
    }
  }

  return (
    <Paper
      className={classes.IndividualPost}
      elevation={3}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      {/* Increase the priority of the hero background image */}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={11}>
          <div className={classes.IndividualPostContent}>
            <Typography component="h1" variant="h3" color="inherit">
              {post.title}
            </Typography>
            <Typography variant="body1" display="block" color="inherit" style={{marginLeft: "1vw"}}>
              {"by "}
              {post.userID}
            </Typography>
            <Typography variant="h6" color="inherit" style={{marginLeft: "2vw"}}>
              {post.content}
            </Typography>
            <br></br>
            <Typography variant="h6" color="inherit">
              {post.likes}
              {LikeorLikes(post.likes)}
            </Typography>
            <Button
              variant="contained"
              color="black"
              className={classes.likebutton}
              startIcon={<ThumbUpAltIcon />}
              onClick={() => giveLike(post.id, post.likes, post.alreadyLiked)}
            >
              Like
            </Button>

            <Button
              variant="contained"
              color="black"
              className={classes.commentbutton}
              onClick={() => writeComment(post.id)}
            >
              Comment
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

IndividualPost.propTypes = {
  post: PropTypes.object
};