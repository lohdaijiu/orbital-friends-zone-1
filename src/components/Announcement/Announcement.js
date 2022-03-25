import React from "react";
import AnnounFormat from "./AnnounFormat";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  announButton: {
    margin: theme.spacing(3),
  },
  label: {
    backgroundColor: "grey",
    color: "white",
    padding: "1rem",
    position: "static",
  },
}));

export default function Announcement() {
  const history = useHistory();
  const classes = useStyles();

  async function Home() {
    try {
      history.push("./");
    } catch {}
  }

  return (
    <>
      <AppBar />
      <div style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
        <Typography
          component="div"
          variant="body1"
          style={{ width: "100%", position: "relative" }}
        >
          <Box className={classes.label}>Announcement</Box>
        </Typography>
        <div>
          <header>
            <Button
              variant="outlined"
              color="inherit"
              className={classes.backButton}
              onClick={Home}
            >
              Back
            </Button>
          </header>

          <section>
            <ShowForum />
          </section>
        </div>
      </div>
    </>
  );
}

const firestore = firebase.firestore();

function ShowForum() {
  const announRef = firestore.collection("Announcement");
  const query = announRef.orderBy("createdAt", "desc");
  const [announs] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {announs &&
          announs.map((text) => (
            <div>
              <AnnounFormat announcements={text} />
            </div>
          ))}
      </main>
    </>
  );
}
