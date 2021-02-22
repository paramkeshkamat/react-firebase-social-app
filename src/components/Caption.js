import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
import { Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

const Caption = (props) => {
  const { id, username, caption } = props;
  const { currentUser } = useContext(AuthContext);
  const [isCaptionHover, setIsCaptionHover] = useState(false);
  const [isCaptionEditing, setIsCaptionEditing] = useState(false);
  const [updatedCaption, setUpdatedCaption] = useState(caption);
  const inputRef = useRef(null);

  const updateCaption = () => {
    db.collection("posts")
      .doc(id)
      .update({
        ...props,
        caption: updatedCaption,
      });
  };

  useEffect(() => {
    if (isCaptionEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCaptionEditing]);

  return (
    <div
      className="caption"
      onMouseOver={() => setIsCaptionHover(true)}
      onMouseLeave={() => setIsCaptionHover(false)}
    >
      <p>
        <strong>{username}</strong>&nbsp;
        {isCaptionEditing ? (
          <input
            type="text"
            placeholder="update caption..."
            value={updatedCaption}
            onChange={(e) => setUpdatedCaption(e.target.value)}
            ref={inputRef}
          />
        ) : (
          caption
        )}
      </p>
      {isCaptionHover && currentUser.displayName === username && (
        <button
          className="edit-caption-btn"
          onClick={() => setIsCaptionEditing(!isCaptionEditing)}
        >
          {isCaptionEditing ? (
            <DoneIcon onClick={updateCaption} />
          ) : (
            <Tooltip title="Edit caption" placement="right" arrow>
              <EditIcon />
            </Tooltip>
          )}
        </button>
      )}
    </div>
  );
};

export default Caption;
