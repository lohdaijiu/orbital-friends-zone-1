import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";

export default function Post() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function back() {
    try {
      history.push("./Forum");
    } catch {}
  }

  return (
    <div>
      <header>
        <Button variant="link" onClick={back}>
          Back
        </Button>
      </header>

      <section>
        <AddPost />
      </section>
    </div>
  );
}

function AddPost() {
  const [formValue, setFormValue] = useState("");
  const [formValue2, setFormValue2] = useState("");
  const history = useHistory();

  const createPost = async (e) => {
    e.preventDefault();
    const { uid } = firebase.auth().currentUser;
    await firebase.firestore().collection("Forum").add({
      title: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      likes: 0,
      comments: [],
      alreadyLiked: [],
      content: formValue2
    });

    setFormValue("");
    history.push("./Forum");
  };

  return (
    <>
      <form onSubmit={createPost}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Title"
        />
        <input
          value={formValue2}
          onChange={(e) => setFormValue2(e.target.value)}
          placeholder="Content"
        />

        <button type="submit" disabled={!formValue}>
          -
        </button>
      </form>
    </>
  );
}
