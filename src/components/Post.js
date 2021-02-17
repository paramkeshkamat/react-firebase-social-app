import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const Post = (props) => {
  const { id, image, caption, username, likes, profileImage } = props;
  const { currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const deletePost = () => {
    db.collection("posts").doc(id).delete();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    db.collection("posts")
      .doc(id)
      .update({
        ...props,
        likes: !isLiked ? likes + 1 : likes - 1,
      });
  };

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
  });

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
          &nbsp;{likes}
        </div>
        <p className="caption">
          <strong>{username}</strong>&nbsp;
          {caption}
        </p>
        {comments.map((data) => {
          return (
            <p>
              <strong>{data.username}</strong>
              {data.comment}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
