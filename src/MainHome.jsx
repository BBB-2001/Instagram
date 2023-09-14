import React, { useContext, useEffect, useState } from "react";
import Story from "./Story";
import { LIKE, UNLIKE, SAVE_POST, UNSAVE_POST } from "./graphql/Mutations";
import { POSTS } from "./graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  linkClasses,
} from "@mui/material";
import { userContext } from "./App";
import { cloneDeep } from "@apollo/client/utilities";

const MainHome = () => {
  const { user } = useContext(userContext);
  const { loading, error, data } = useQuery(POSTS);
  const [posts, setPosts] = useState(data?.posts || []);
  const [likes, setLikes] = useState([]);

  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);
  const [savepost] = useMutation(SAVE_POST);
  const [unsavepost] = useMutation(UNSAVE_POST);

  const handleLike = async (postId) => {
    try {
      const likedPost = await like({
        variables: {
          postId: postId,
        },
      });
      // posts arrayinde postid bulup
      const newPosts = posts.map((post) => {
        if (post.id === postId) {
          post = likedPost.data;
        }
      });
      setPosts(newPosts);
    } catch (error) {
      console.log("errrrror", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const unlikedPost = await unlike({
        variables: {
          postId: postId,
        },
      });
      // posts arrayinde postid bulup
      const newPosts = posts.map((post) => {
        if (post.id === postId) {
          post = unlikedPost.data;
        }
      });
      setPosts(newPosts);
    } catch (error) {
      console.log("errrrror", error);
    }
  };
  const handleSave = async (postId) => {
    const savePost = await savepost({
      variables: {
        postId: postId,
      },
    });

    console.log("SAVEPOST", savePost);
  };

  const handleUnsave = async (postId) => {
    const unsavePost = await unsavepost({
      variables: {
        postId: postId,
      },
    });
  };
  console.log("POst", posts);

  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts);
      console.log(data);
      setLikes(
        data.posts.map((post) => {
          return post.likes.find((like) => like.user_id === user.id);
        })
      );
    }
  }, [data]);

  function formatTimestamp(created_at) {
    const timestampInMilliseconds = parseInt(created_at, 10);
    const postDate = moment(timestampInMilliseconds);
    const currentDate = moment();
    const diffInHours = currentDate.diff(postDate, "hours");

    if (diffInHours < 24) {
      if (diffInHours === 0) {
        return `1s `;
      } else {
        return `${diffInHours}s `;
      }
    } else {
      return postDate.format("MMMM Do YYYY");
    }
  }
  return (
    <div>
      <Story />
      {posts.map((post, index) => (
        <Card
          elevation={0}
          key={post?.id}
          sx={{
            width: "470px",
            paddingBottom: "16px",
            marginBottom: "16px",

            borderBottom: "1px solid #bebebe",
          }}
        >
          <CardHeader
            sx={{ padding: 0, paddingBottom: 0.5 }}
            avatar={
              <Avatar
                src={post?.user?.profile_photo}
                aria-label="user-avatar"
              ></Avatar>
            }
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                  {post?.user?.name}
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "8px",
                    alignItems: "center",

                    display: "flex",
                  }}
                >
                  .
                </span>
                <span>{formatTimestamp(post?.created_at)}</span>
              </div>
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "468px",
              height: "auto",
              backgroundColor: "#000",
            }}
          >
            <img
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={post?.file}
              alt={post?.id}
            />
          </div>
          <CardContent sx={{ padding: 0, paddingTop: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ float: "left" }}>
                  {likes[index] ? (
                    <AiFillHeart
                      onClick={() => handleUnlike(post?.id)}
                      size={30}
                      style={{
                        paddingRight: "12px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleLike(post?.id)}
                      size={30}
                      style={{
                        paddingRight: "12px",

                        cursor: "pointer",
                      }}
                    />
                  )}

                  <BsChat
                    size={28}
                    style={{ paddingRight: "12px", cursor: "pointer" }}
                  />
                  <FiSend size={28} style={{ cursor: "pointer" }} />
                </Typography>
                <Typography sx={{ float: "right" }}>
                  {post.saves.find((save) => save.user.id === user.id) ? (
                    <GoBookmarkFill
                      onClick={() => handleUnsave(post?.id)}
                      size={30}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <GoBookmark
                      onClick={() => handleSave(post?.id)}
                      size={30}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Typography>
              </div>
              <div>
                <span></span>
                <span></span>
              </div>
              <div>
                {post?.like_count > 0 ? (
                  <div>
                    <Typography sx={{ fontStyle: "#000", fontWeight: "bold" }}>
                      {post?.like_count} beğenme
                    </Typography>
                  </div>
                ) : (
                  <div></div>
                )}

                {post?.content !== "" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      sx={{
                        fontStyle: "#000",
                        fontWeight: "bold",
                        paddingRight: "5px",
                      }}
                    >
                      {post?.user?.name}
                    </Typography>
                    <Typography>{post?.content}</Typography>
                  </div>
                ) : (
                  <div>
                    <span></span>
                  </div>
                )}

                <Typography>{post?.comments_count} yorumu gör</Typography>

                <Typography>Yorum ekle...</Typography>
              </div>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainHome;
