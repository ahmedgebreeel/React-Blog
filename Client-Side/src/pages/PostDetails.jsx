import axios from "axios";

import { FidgetSpinner } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import CardDetails from "../components/CardDetails";

const PostDetails = () => {
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const params = useParams();
  useEffect(() => {
    async function getPostById() {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/posts/${params.id}`
        );
        setPost(data?.data);
      } catch (err) {
        setError(err);
      }
    }
    getPostById();
    console.log("post", post);
  }, []);
  return (
    <>
      <Navbar />
      <div className="cardDetails mt-28 flex justify-around">
        {post ? (
          <CardDetails
            post={post}
            title={post.title}
            content={post.content}
            photo={post.photo}
            id={post.user._id}
          />
        ) : !post && !error ? (
          <>
            <div className="container mx-auto text-center h-screen flex justify-center items-center">
              <FidgetSpinner />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PostDetails;
