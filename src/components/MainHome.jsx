import React, { useContext, useEffect, useState } from "react";
import Story from "./Story";
import {
  LIKE,
  UNLIKE,
  SAVE_POST,
  UNSAVE_POST,
  CREATE_COMMENT,
  GET_SINGLE_POST,
} from "../graphql/Mutations";
import { POSTS } from "../graphql/queries";
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
  Input,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
  linkClasses,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { userContext } from "../App";
import PostComponent from "./PostComponent";

const MainHome = () => {
  const { user } = useContext(userContext);
  const { loading, error, data } = useQuery(POSTS);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);

  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);
  const [savepost] = useMutation(SAVE_POST);
  const [unsavepost] = useMutation(UNSAVE_POST);
  const [createcomment] = useMutation(CREATE_COMMENT);

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleClosePost = () => {
    setIsPostOpen(false);
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    console.log("comment", comment);

    try {
      await createcomment({
        variables: {
          postId: postId,
          content: comment,
        },
      });
      // post içerisine eklenecek
      // post count + 1
      e.target.reset();
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

  const buttonStyle = {
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none", // Box shadow'ı kaldırmak için
      transition: "none",
      color: "rgba(0, 0, 0, 0.4);", // Transition'ı kaldırmak için // Hover efektini devre dışı bırakmak için arka planı şeffaf yapabilirsiniz
    },
    border: "none", // Düğmenin kenarlığını kaldırmak için
    width: "20%",
    marginTop: "8px",
    float: "right",
    height: "20px",
    backgroundColor: "transparent",
    color: "#0095F6",
    boxShadow: "none", // Box shadow'ı kaldırmak için
    transition: "none", // Transition'ı kaldırmak için
    fontWeight: "600",
    fontSize: "13px",
  };

  return (
    <>
      {postId != null && (
        <PostComponent
          setPostId={setPostId}
          post={posts.find((post) => post.id === postId)}
        />
      )}

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
                      onClick={() => setPostId(postId)}
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
                      <Typography
                        sx={{ fontStyle: "#000", fontWeight: "bold" }}
                      >
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

                  <form
                    style={{
                      display: "flex",
                    }}
                    onSubmit={(e) => handleCommentSubmit(e, post.id)}
                  >
                    <input
                      name="comment"
                      placeholder="Yorum Gir..."
                      style={{
                        border: "none",
                        marginTop: "8px",
                        outline: "none",
                        width: "400px",
                      }}
                      onChange={(e) => {
                        if (e.target.value.trim() !== "") {
                          // Giriş alanında yazı varsa "Paylaş" düğmesini göster
                          document.getElementById(
                            `submit-button${index}`
                          ).style.display = "block";
                        } else {
                          // Giriş alanı boşsa "Paylaş" düğmesini gizle
                          document.getElementById(
                            `submit-button${index}`
                          ).style.display = "none";
                        }
                      }}
                    />

                    <Button
                      id={`submit-button${index}`}
                      style={{
                        display: "none",
                        padding: 0,
                        margin: 0,
                        paddingTop: "6 px",
                      }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={buttonStyle}
                    >
                      Paylaş
                    </Button>
                  </form>
                </div>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MainHome;
