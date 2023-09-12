import React, { useEffect, useState } from "react";
import Story from "./Story";

import { POSTS } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography } from "@mui/material";

const MainHome = () => {
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
        <div>
          <div>
            <div>
              <div>
                <img src={post.user?.profile_photo} width={25}></img>
              </div>
              <Typography>{post.user.name}</Typography>
              <span>.</span>
              <div>
                <Typography>{formatTimestamp(post?.created_at)}</Typography>
              </div>
              <div>
                <BiDotsHorizontalRounded />
              </div>
            </div>
            <div>
              <img src={post?.file} key={post?.id}></img>
            </div>
            <div>
              <div>
                <AiOutlineHeart />
                <FaRegComment />
                <FiSend />
              </div>
              <div>
                <GoBookmark />
              </div>
              <div>
                <span></span>
                <span></span>
              </div>
              {post.like_count > 0 ? (
                <div>
                  <Typography>{post?.like_count} begenme</Typography>
                </div>
              ) : (
                <div></div>
              )}

              {post.content != "" ? (
                <div>
                  <Typography>
                    {post.user.name} {post.content}
                  </Typography>
                </div>
              ) : (
                <div>
                  <span></span>
                </div>
              )}

              <div>
                <Typography>{post.comments_count} yorumu gör</Typography>
              </div>
              <div>
                <Typography>Yorum ekle...</Typography>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainHome;
