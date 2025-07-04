import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // it's on array as it defined
  //  in the posts code for post posts
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    // we are gonna change the logic here to make the request go to the query port (4002)
    // const res = await axios.get("http://localhost:4000/posts");
    const res = await axios.get("http://localhost:4002/posts");
    // console.log(res.data);
    setPosts(res.data);
  };
  // the empty array is telling to the func to run one time
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments}/>
          <CommentCreate postId={post.id}/>
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flrx-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
