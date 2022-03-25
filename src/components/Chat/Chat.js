import React, { useRef, useState } from "react";
import AppBar from "../Login_Reg_Home/AppBar/MainAppBar";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useLocation, useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import styles from "./Chat.css";

const useStyles = makeStyles((theme) => ({
  backButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  label: {
    backgroundColor: "grey",
    color: "white",
    padding: "1rem",
    position: "static",
  },
}));

export default function Chat() {
  return (
    <>
      <AppBar />
      <section>
        <ChatRoom />
      </section>
    </>
  );
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  const dummy = useRef();
  const history = useHistory();
  const classes = useStyles();
  const messagesRef = firestore.collection("Chat");

  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const groupNumber = useLocation().state.gNumber;

  const [formValue, setFormValue] = useState("");

  const [userName, setUserName] = useState("");
  getUserName().then((x) => setUserName(x));

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      chatGroupId: groupNumber,
      userID: userName,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  async function Home() {
    try {
      history.push("./ChatGroups");
    } catch {}
  }

  function displayName(x) {
    if (x === -1) {
      return "Academic Advice";
    } else if (x === -2) {
      return "CCA and Interests";
    } else if (x === -3) {
      return "Personal Life and Relationship";
    } else if (x === -4) {
      return "Memes only!";
    } else if (typeof x === "number") {
      return "Assigned Group";
    } else {
      return x;
    }
  }

  return (
    <div style={{backgroundColor: "#cfe8fc", }}>
      <Typography
        component="div"
        variant="body1"
        style={{ width: "100%", position: "relative" }}
      >
        <Box
          className={classes.label}
        >
          Chat Group ({displayName(groupNumber)})
        </Box>
      </Typography>

      <Button
        variant="outlined"
        color="inherit"
        className={classes.backButton}
        onClick={Home}
      >
        Back
      </Button>

      <div
        className="Chat"
        style={{
          justifyContent: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "71vh",
          maxHeight: "auto",
          marginBottom: "6vh",
          backgroundColor: "#cfe8fc",
          overflow: 'auto'
        }}
      >
        <section>
          <main>
            {messages &&
              messages
                .filter((msg) => msg.chatGroupId === groupNumber)
                .map((msg) => <ChatMessage key={msg.id} message={msg} />)}

            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} style={{backgroundColor: "#cfe8fc"}}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type a message"
            />

            <button type="submit" disabled={!formValue}>
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function ChatMessage(props) {
  const { text, userID, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  if (messageClass === "sent") {
    return (
      <>
        <div className={`message ${messageClass}`} style={{marginRight: "1vw"}}>
          <p>{text}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="displayedName" style={{marginLeft: "1vw"}}>{userID}</div>
        <div className={`message ${messageClass}`} style={{marginLeft: "1vw"}}>
          <p>{text}</p>
        </div>
      </>
    );
  }
}

async function getUserName() {
  const uid = firebase.auth().currentUser?.uid;
  const printed = await firebase.firestore().collection("users").doc(uid).get();
  try {
    return printed.data().username;
  } catch {}
}