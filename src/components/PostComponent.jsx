import { useMutation } from "@apollo/client";
import React from "react";
import { GET_SINGLE_POST } from "../graphql/Mutations";

const PostComponent = ({ posts, postId, setPostId }) => {
  const [getsinglepost] = useMutation(GET_SINGLE_POST);

  const handlePostOpen = async (postId) => {
    try {
      await getsinglepost({
        variables: {
          postId,
        },
      });
    } catch (error) {}
  };

  const handlePostClose = async (postId) => {
    try {
      setPostId(null);
    } catch (error) {
      console.log("ıd ", setPostId);
    }
  };
  return <div></div>;
};

export default PostComponent;
