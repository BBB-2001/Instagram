import React, { useContext, useEffect, useState } from "react";
import Story from "./Story";
import {
  LIKE,
  UNLIKE,
  SAVE_POST,
  UNSAVE_POST,
  CREATE_COMMENT,
} from "./graphql/Mutations";
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
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { userContext } from "./App";
import { cloneDeep } from "@apollo/client/utilities";

const MainHome = () => {
  const { user } = useContext(userContext);
  const { loading, error, data } = useQuery(POSTS);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState("");

  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);
  const [savepost] = useMutation(SAVE_POST);
  const [unsavepost] = useMutation(UNSAVE_POST);
  const [createcomment] = useMutation(CREATE_COMMENT);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (e, postId) => {
    console.log("aasdasdasdasdasdas");

    e.preventDefault();
    try {
      await createcomment({
        variables: {
          postId,
          content: comment,
        },
      });
      // post içerisine eklenecek
      // post count + 1
      setComment("");
    } catch (error) {
      console.log("comment error", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const likedPost = await like({
        variables: {
          postId: postId,
        },
      });
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
    if (data && data.posts) {
      setPosts(data.posts);
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

  if (loading || error) return null;

  return (
    <div>
      <Story />
      {posts.map((post, index) => (
        <Card
          elevation={0}
          key={post?.id}
          sx={{
            width: "470px",
            paddingBottom: 0,
            marginBottom: "24px",

            borderBottom: "1px solid #bebebe",
          }}
        >
          <CardHeader
            sx={{ padding: 0, paddingBottom: 0.5 }}
            avatar={
              <Avatar
                src={post.user?.profile_photo}
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
                  {post.user?.name}
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
                <span>{formatTimestamp(post.created_at)}</span>
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
          <CardContent sx={{ padding: 0, paddingTop: 1 }}>
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
                  {post?.is_liked ? (
                    <AiFillHeart
                      onClick={() => handleUnlike(post.id)}
                      size={30}
                      style={{
                        paddingRight: "12px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleLike(post.id)}
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
                  {post?.is_saved ? (
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

                <TextField
                  fullWidth
                  label="Yorum ekle..."
                  multiline
                  rows={1}
                  value={comment}
                  onChange={handleCommentChange}
                ></TextField>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleCommentSubmit(e, post.id)}
                >
                  Gönder
                </Button>
              </div>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainHome;
