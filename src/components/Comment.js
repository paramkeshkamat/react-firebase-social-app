import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const Comment = ({ id, commentId, username, comment, picUploader }) => {
  const { currentUser } = useContext(AuthContext);
  const [isCommentHover, setIsCommentHover] = useState(false);

  const deleteComment = () => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .doc(commentId)
      .delete();
  };

  return (
    <div
      className="comment"
      onMouseOver={() => setIsCommentHover(true)}
      onMouseLeave={() => setIsCommentHover(false)}
    >
      <p>
        <strong>{username}</strong>&nbsp;
        {comment}
      </p>
      {isCommentHover &&
        (currentUser.displayName === username ||
          currentUser.displayName === picUploader) && (
          <button className="delete-comment-btn" onClick={deleteComment}>
            <Tooltip title="Delete comment" placement="right" arrow>
              <DeleteIcon />
            </Tooltip>
          </button>
        )}
    </div>
  );
};

export default Comment;
