import React, { useEffect, useState } from "react";
import AppBar from "./MainAppBar";
import Typography from "../FormTemplate/Typography";
import { Button, Container, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import NotesIcon from "@material-ui/icons/Notes";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(10),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  icons: {
    fontSize: 150,
  },
});

function Admin(props) {
  const { classes } = props;
  const history = useHistory();
  const db = firebase.firestore();

  const assigned = () =>
  firebase.firestore()
      .collection("users")
      .where("groupId", ">", 0)
      .get();
  useEffect(() => {
    assigned();
  });

  const [totalGroups, setTotalGroups] = useState(0);
  
  useEffect(() => {
    const countGroups = () => {
      firebase.firestore().collection("groups")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setTotalGroups(querySnapshot.size);
          });
        });
    };
    countGroups();
  }, []);

  // number of available users for grouping
  const [userCount, setUserCount] = useState(0);

  
  useEffect(() => {
    const countUnassigned = () => {
      firebase.firestore().collection("users")
        .where("groupId", "==", 0)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserCount(querySnapshot.size);
          });
        });
    };
    countUnassigned();
  }, []);

  // data consist of score1, score2, username of all unassigned users
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const getData = () => {
      let score1 = 0;
      let score2 = 0;
      let score3 = 0;
      let score4 = 0;
      let username = "";
      let id;
      let newData;
      firebase.firestore().collection("users")
        .where("groupId", "==", 0)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //console.log(doc.data());
            score1 = doc.data().introvertExtrovert;
            score2 = doc.data().sensingIntuitive;
            score3 = doc.data().thinkingFeeling;
            score4 = doc.data().judgingPerceiving;
            username = doc.data().username;
            id = doc.data().id;
            newData = {
              score1: score1,
              score2: score2,
              score3: score3,
              score4: score4,
              username: username,
              id: id,
            };
            id++;
            setData((data) => [...data, newData]);
          });
        });
    };
    getData();
  }, []);

  function kmeans() {
    const numberOfUsers = userCount - (userCount % 4);
    data.splice(numberOfUsers);
    // desired number of clusters to be set for kmeans
    let group = Math.floor(userCount / 4);

    let centroids = [];
    // generate centroids randomly
    for (let i = 0; i < group; i++) {
      let score1 = Math.floor(Math.random() * 25 + 1);
      let score2 = Math.floor(Math.random() * 25 + 1);
      let score3 = Math.floor(Math.random() * 25 + 1);
      let score4 = Math.floor(Math.random() * 25 + 1);
      centroids.push({
        score1: score1,
        score2: score2,
        score3: score3,
        score4: score4,
        size: 0,
        items: [],
      });
    }

    let distances = [];
    // calculate similarity between all centroids and data points
    let similarity;
    for (let i = 0; i < group; i++) {
      for (let j = 0; j < data.length; j++) {
        similarity =
          (centroids[i].score1 * data[j].score1 +
            centroids[i].score2 * data[j].score2 +
            centroids[i].score3 * data[j].score3 +
            centroids[i].score4 * data[j].score4) /
          (Math.sqrt(
            centroids[i].score1 * centroids[i].score1 +
              centroids[i].score2 * centroids[i].score2 +
              centroids[i].score3 * centroids[i].score3 +
              centroids[i].score4 * centroids[i].score4
          ) *
            Math.sqrt(
              data[i].score1 * data[i].score1 +
                data[j].score2 * data[j].score2 +
                data[i].score3 * data[i].score3 +
                data[j].score4 * data[j].score4
            ));
        distances.push({
          itemId: data[j].id,
          clusterId: i,
          similarity: similarity,
        });
      }
    }
    // sort distances in descending order
    distances.sort((a, b) => (a.similarity > b.similarity ? -1 : 1));

    let seen = [];
    // assign each item to a cluster until it is filled
    for (let i = 0; i < distances.length; i++) {
      if (
        centroids[distances[i].clusterId].size >= 4 ||
        seen.includes(distances[i].itemId)
      ) {
      } else {
        // add item to cluster
        centroids[distances[i].clusterId].items.push(distances[i].itemId);
        seen.push(distances[i].itemId);
        centroids[distances[i].clusterId].size++;
      }
    }

    // do recalculating of groups
    let count = 0;
    while (true) {
      if (count < 1000000) {
        if (recalculate() === true) {
          break;
        }
      } else {
        break;
      }
      count++;
    }

    function recalculate() {
      let newCentroids = [];
      // initialise new centroids with new mean values of data
      for (let i = 0; i < centroids.length; i++) {
        let accum1 = 0;
        let accum2 = 0;
        let accum3 = 0;
        let accum4 = 0;
        for (let j = 0; j < centroids[i].items.length; j++) {
          function sameId(x) {
            return x.id === centroids[i].items[j];
          }
          accum1 += data.find(sameId).score1;
          accum2 += data.find(sameId).score2;
          accum3 += data.find(sameId).score3;
          accum4 += data.find(sameId).score4;
        }
        newCentroids.push({
          score1: accum1 / centroids[i].items.length,
          score2: accum2 / centroids[i].items.length,
          score3: accum3 / centroids[i].items.length,
          score4: accum4 / centroids[i].items.length,
          size: 0,
          items: [],
        });
        accum1 = 0;
        accum2 = 0;
        accum3 = 0;
        accum4 = 0;
      }

      let newDistances = [];
      // calculate similarity between all centroids and data points
      let similarity;
      for (let i = 0; i < group; i++) {
        for (let j = 0; j < data.length; j++) {
          similarity =
            (newCentroids[i].score1 * data[j].score1 +
              newCentroids[i].score2 * data[j].score2 +
              newCentroids[i].score3 * data[j].score3 +
              newCentroids[i].score4 * data[j].score4) /
            (Math.sqrt(
              newCentroids[i].score1 * newCentroids[i].score1 +
                newCentroids[i].score2 * newCentroids[i].score2 +
                newCentroids[i].score3 * newCentroids[i].score3 +
                newCentroids[i].score4 * newCentroids[i].score4
            ) *
              Math.sqrt(
                data[i].score1 * data[i].score1 +
                  data[j].score2 * data[j].score2 +
                  data[i].score3 * data[i].score3 +
                  data[j].score4 * data[j].score4
              ));
          newDistances.push({
            itemId: data[j].id,
            clusterId: i,
            similarity: similarity,
          });
        }
      }
      // sort distances in descending order
      newDistances.sort((a, b) => (a.similarity > b.similarity ? -1 : 1));

      let seen = [];
      // assign each item to a cluster until it is filled
      for (let i = 0; i < newDistances.length; i++) {
        if (
          newCentroids[newDistances[i].clusterId].size >= 4 ||
          seen.includes(newDistances[i].itemId)
        ) {
        } else {
          // add item to cluster
          newCentroids[newDistances[i].clusterId].items.push(
            newDistances[i].itemId
          );
          seen.push(newDistances[i].itemId);
          newCentroids[newDistances[i].clusterId].size++;
        }
      }

      let different = true;
      // compare old and new centroid for difference
      for (let i = 0; i < centroids.length; i++) {
        for (let j = 0; j < centroids[i].items.length; j++) {
          if (newCentroids[i].items.includes(centroids[i].items[j])) {
          } else {
            different = false;
            break;
          }
        }
      }
      centroids = newCentroids;
      return different;
    }


    for (
      let i = totalGroups + 1;
      i < totalGroups + Math.floor(userCount / 4) + 1;
      i++
    ) {
      db.collection("groups").doc(JSON.stringify(i)).set({ members: [] });
    }

    for (let i = 0; i < centroids.length; i++) {
      for (let j = 0; j < centroids[i].items.length; j++) {
        db.collection("users")
          .where("id", "==", centroids[i].items[j])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection("groups")
                .doc(JSON.stringify(i + totalGroups + 1))
                .update({
                  members: firebase.firestore.FieldValue.arrayUnion(doc.id),
                });

              db.collection("users")
                .doc(doc.id)
                .update({ groupId: i + totalGroups + 1 });
            });
          });
      }
    }

    db.collection("groups")
      .get()
      .then((querySnapshot) => {
        let x = querySnapshot.size;
        db.collection("users")
          .where("groupId", "==", 0)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // generate random number from groups
              let rand = Math.floor(Math.random() * x + 1);
              db.collection("groups")
                .doc(JSON.stringify(rand))
                .update({
                  members: firebase.firestore.FieldValue.arrayUnion(doc.id),
                });

              db.collection("users").doc(doc.id).update({ groupId: x });
            });
          });
      });
  }

  function reset() {
    db.collection("users")
      .where("groupId", ">", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({ groupId: 0 });
        });
      });
  }

  async function MakeAnnouncement() {
    try {
      history.push("./MakeAnnouncement");
    } catch {}
  }

  async function ReadFeedback() {
    try {
      history.push("./Feedback");
    } catch {}
  }

  return (
    <>
      <AppBar />
      <div style={{backgroundColor: "#cfe8fc", height: "100vh"}}>
      <section className={classes.root}>
        <Container className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <GroupAddIcon className={classes.icons} />
                <Button
                  onClick={kmeans}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Create Group
                </Button>
                <Button
                  onClick={reset}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Reset groups
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <AnnouncementIcon className={classes.icons} />
                <Button
                  onClick={MakeAnnouncement}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Make Announcement
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <NotesIcon className={classes.icons} />
                <Button
                  onClick={ReadFeedback}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Feedbacks
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Typography variant="h6" className={classes.title}>
        Number of available users:
      </Typography>
      <Typography variant="h5" className={classes.title}>
        {userCount}
      </Typography>
      </div>
    </>
  );
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);