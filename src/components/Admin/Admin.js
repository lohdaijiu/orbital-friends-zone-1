import React, { useEffect, useState } from "react";
import logOutIcon from "../Images/Logout_icon.jpg";
import AppBar from "./MainAppBar";
import { Form, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../FormTemplate/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
});

function Admin(props) {
  const { classes } = props;
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }
  const db = firebase.firestore();

  // count total number of assigned users
  const [totalAssigned, setTotalAssigned] = useState(0);
  const assigned = () =>
    db
      .collection("users")
      .where("groupId", ">", 0)
      .get()
      .then((querySnapshot) => {
        setTotalAssigned(querySnapshot.size);
      });
  useEffect(() => {
    assigned();
  });

  // number of available users for grouping
  const [userCount, setUserCount] = useState(0);

  const countUnassigned = () => {
    db.collection("users")
      .where("groupId", "==", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserCount(querySnapshot.size);
        });
      });
  };
  useEffect(() => {
    countUnassigned();
  }, []);

  // data consist of score1, score2, username of all unassigned users
  const [data, setData] = useState([]);
  const getData = () => {
    let score1 = 0;
    let score2 = 0;
    let username = "";
    let id;
    let newData;
    db.collection("users")
      .where("groupId", "==", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());
          score1 = doc.data().score1;
          score2 = doc.data().score2;
          username = doc.data().username;
          id = doc.data().id;
          newData = {
            score1: score1,
            score2: score2,
            username: username,
            id: id
          };
          id++;
          setData((data) => [...data, newData]);
        });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  function kmeans2() {
    const numberOfUsers = userCount - (userCount % 4);
    data.splice(numberOfUsers);
    // desired number of clusters to be set for kmeans
    let group = Math.floor(userCount / 4);

    let centroids = [];
    // generate centroids randomly
    for (let i = 0; i < group; i++) {
      let score1 = Math.floor(Math.random() * 50 + 1);
      let score2 = Math.floor(Math.random() * 50 + 1);
      centroids.push({ score1: score1, score2: score2, size: 0, items: [] });
    }

    let distances = [];
    // calculate distance between all centroids and data points
    let distance;
    for (let i = 0; i < group; i++) {
      for (let j = 0; j < data.length; j++) {
        distance = Math.sqrt(
          (centroids[i].score1 - data[j].score1) *
            (centroids[i].score1 - data[j].score1) +
            (centroids[i].score2 - data[j].score2) *
              (centroids[i].score2 - data[j].score2)
        );
        distances.push({
          itemId: data[j].id,
          clusterId: i,
          distance: distance
        });
      }
    }
    // sort distances in ascending order
    distances.sort((a, b) => (a.distance > b.distance ? 1 : -1));

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
        for (let j = 0; j < centroids[i].items.length; j++) {
          accum1 += data.find((x) => x.id === centroids[i].items[j]).score1;
          accum2 += data.find((x) => x.id === centroids[i].items[j]).score2;
        }
        newCentroids.push({
          score1: accum1 / centroids[i].items.length,
          score2: accum2 / centroids[i].items.length,
          size: 0,
          items: []
        });
        accum1 = 0;
        accum2 = 0;
      }

      let newDistances = [];
      // calculate distance between all centroids and data points
      let distance;
      for (let i = 0; i < group; i++) {
        for (let j = 0; j < data.length; j++) {
          distance = Math.sqrt(
            (newCentroids[i].score1 - data[j].score1) *
              (newCentroids[i].score1 - data[j].score1) +
              (newCentroids[i].score2 - data[j].score2) *
                (newCentroids[i].score2 - data[j].score2)
          );
          newDistances.push({
            itemId: data[j].id,
            clusterId: i,
            distance: distance
          });
        }
      }
      // sort distances in ascending order
      newDistances.sort((a, b) => (a.distance > b.distance ? 1 : -1));

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

    for (let i = 1; i < Math.floor(userCount / 4) + 1; i++) {
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
                .doc(JSON.stringify(i + Math.floor(totalAssigned / 4) + 1))
                .update({
                  members: firebase.firestore.FieldValue.arrayUnion(doc.id)
                });

              db.collection("users")
                .doc(doc.id)
                .update({ groupId: i + Math.ceil(totalAssigned / 4) + 1 });
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
                  members: firebase.firestore.FieldValue.arrayUnion(doc.id)
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
      <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <Button
                    onClick={kmeans2}
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
                
              <Typography variant="h6" className={classes.title}>
                The best luxury hotels
              </Typography>
              <Typography variant="h5">
                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}
                {', go for a mini-vacation just a few subway stops away from your home.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <Button
                    onClick={MakeAnnouncement}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Make Announcement
                  </Button>
              <Typography variant="h6" className={classes.title}>
                New experiences
              </Typography>
              <Typography variant="h5">
                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}
                {'your Sundays will not be alike.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <Button
                    onClick={ReadFeedback}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Feedbacks
                  </Button>
              <Typography variant="h6" className={classes.title}>
                Exclusive rates
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access specially negotiated rates '}
                {'that you will not find anywhere else.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
      
    </>
  );
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
