import { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import "../styles/Posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
    return () => unsubscribe();
  }, []);

  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
