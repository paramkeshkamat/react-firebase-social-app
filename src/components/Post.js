import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { db } from "../firebase";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const Post = (props) => {
  const { id, image, caption, username, likes, profileImage } = props;
  const { currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(() => {
    if (likes.includes(currentUser.displayName)) {
      return true;
    } else {
      return false;
    }
  });
  const [comments, setComments] = useState([]);

  const deletePost = () => {
    db.collection("posts").doc(id).delete();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    let likedBy = [];

    if (!likes.includes(currentUser.displayName)) {
      likedBy = [...likes, currentUser.displayName];
    } else {
      likedBy = likes.filter((user) => user !== currentUser.displayName);
    }
    
    db.collection("posts")
      .doc(id)
      .update({
        ...props,
        likes: likedBy,
      });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("addedOn", "asc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    return () => unsubscribe();
  }, [id]);

  return (
    <div className="Post">
      <div className="post-header">
        <Avatar src={profileImage} />
        <h2>{username}</h2>
        {currentUser.displayName === username && (
          <button className="delete-post-btn" onClick={deletePost}>
            <DeleteIcon />
          </button>
        )}
      </div>
      <img src={image} alt={username} />
      <div className="post-footer">
        <div className="likes">
          <button className="like" onClick={handleLike}>
            {isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </button>
          &nbsp;{likes.length}
        </div>
        <p className="caption">
          <strong>{username}</strong>&nbsp;
          {caption}
        </p>
        {comments.map((comment, index) => (
          <Comment key={index} id={id} picUploader={username} {...comment} />
        ))}
      </div>
      <AddComment id={id} />
    </div>
  );
};

export default Post;
