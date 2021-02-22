import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
import AddComment from "./AddComment";
import Caption from "./Caption";
import Comment from "./Comment";
import { Avatar, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const Post = (props) => {
  const { id, image, caption, username, likes, profileImage } = props;
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(() =>
    likes.includes(currentUser.displayName) ? true : false
  );

  const deletePost = () => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((snapshot) =>
        snapshot.docs.forEach((doc) =>
          db
            .collection("posts")
            .doc(id)
            .collection("comments")
            .doc(doc.id)
            .delete()
        )
      );
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
            <Tooltip title="Delete post" placement="right" arrow>
              <DeleteIcon />
            </Tooltip>
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
        {caption && <Caption {...props} />}
        {comments.map((comment, index) => (
          <Comment key={index} id={id} picUploader={username} {...comment} />
        ))}
      </div>
      <AddComment id={id} />
    </div>
  );
};

export default Post;
