import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import firebase from "firebase/app";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const AddComment = ({ id }) => {
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    const commentId = uuid();
    db.collection("posts").doc(id).collection("comments").doc(commentId).set({
      commentId,
      username: currentUser.displayName,
      comment: newComment,
      addedOn: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setNewComment("");
  };

  return (
    <form className="AddComment">
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="post-btn"
        type="submit"
        onClick={addComment}
        disabled={!newComment}
      >
        Post
      </button>
    </form>
  );
};

export default AddComment;
