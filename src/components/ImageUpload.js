import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import firebase from "firebase/app";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import "../styles/ImageUpload.scss";

const ImageUpload = () => {
  const { currentUser } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err.message),
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const id = uuid();
            db.collection("posts").doc().set({
              id,
              image: url,
              caption,
              username: currentUser.displayName,
              profileImage: currentUser.photoURL,
              created: firebase.firestore.FieldValue.serverTimestamp(),
            });
          })
          .catch((err) => console.log(err.message));

        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="ImageUpload">
      {progress ? <progress value={progress} max={100} /> : null}
      <input
        type="text"
        placeholder="Caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
