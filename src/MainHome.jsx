import React, { useContext, useEffect, useState } from "react";
import Story from "./Story";

import { POSTS } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { GoBookmark } from "react-icons/go";
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

const MainHome = () => {
  const { user } = useContext(userContext);
  const { loading, error, data } = useQuery(POSTS);
  const [posts, setPosts] = useState(data?.posts || []);

  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts);
      console.log(data.posts);
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
          key={post.id}
          sx={{
            width: "470px",
            paddingBottom: "16px",
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
                  {post.user.name}
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
              height: "585px",
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
                  <AiOutlineHeart size={30} style={{ paddingRight: "12px" }} />
                  <BsChat size={28} style={{ paddingRight: "12px" }} />
                  <FiSend size={28} />
                </Typography>
                <Typography sx={{ float: "right" }}>
                  <GoBookmark size={30} />
                </Typography>
              </div>
              <div>
                <span></span>
                <span></span>
              </div>
              <div>
                {post.like_count > 0 ? (
                  <div>
                    <Typography sx={{ fontStyle: "#000", fontWeight: "bold" }}>
                      {post?.like_count} beğenme
                    </Typography>
                  </div>
                ) : (
                  <div></div>
                )}

                {post.content !== "" ? (
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
                      {post.user.name}
                    </Typography>
                    <Typography>{post.content}</Typography>
                  </div>
                ) : (
                  <div>
                    <span></span>
                  </div>
                )}

                <Typography>{post.comments_count} yorumu gör</Typography>

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
