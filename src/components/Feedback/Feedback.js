import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import FBFormat from "./NoLikeNoComment_FB";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  fbButton: {
    margin: theme.spacing(3)
  }
}));

export default function Feedback() {
  const history = useHistory();
  const classes = useStyles();

  async function Home() {
    try {
      history.push("./Admin");
    } catch {}
  }

  return (
    <div style={{ backgroundColor: "#cfe8fc", minHeight: "100vh", maxHeight: "auto" }}>
      <AppBar />
      <Typography
      component="div"
      variant="body1"
      style={{ width: '100%', position: 'relative' }}
    >
      <Box
        bgcolor="grey.700"
        color="white"
        p={2}
        position="static"
        top={0}
        left="47.5%"
        zIndex="tooltip"
      >
        Feedback
      </Box>
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
          <ShowFB />
        </section>
      </div>
    </div>
  );
}

const firestore = firebase.firestore();

function ShowFB() {
  const fbRef = firestore.collection("Feedback");
  const query = fbRef.orderBy("createdAt", "desc");
  const [fbs] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {fbs &&
          fbs.map((text) => (
            <div>
              <FBFormat feedbacks={text} />
            </div>
          ))}
      </main>
    </>
  );
}
