import React from "react";
import { GET_SINGLE_POST } from "../graphql/queries";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useQuery } from "@apollo/client";
import moment from "moment";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FiSend } from "react-icons/fi";
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 1360,
  height: 870,
  borderRadius: "none",
  padding: "none",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
});

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

const PostComponent = ({ postId, handleClose, open }) => {
  const { loading, error, data } = useQuery(GET_SINGLE_POST, {
    variables: {
      postId: postId,
    },
  });
  console.log("postIII", postId);
  let post = data?.getSinglePost;
  console.log("data", post);

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
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <Card elevation={0} key={post?.id}>
            <Grid container>
              <Grid item xs={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
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
                    alt="file"
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
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
                          onClick={() => handleOpen(post.id)}
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

                            outline: "none",
                            width: "400px",
                          }}
                          onChange={(e) => {
                            if (e.target.value.trim() !== "") {
                              // Giriş alanında yazı varsa "Paylaş" düğmesini göster
                              document.getElementById(
                                `submit-button${post?.id}`
                              ).style.display = "block";
                            } else {
                              // Giriş alanı boşsa "Paylaş" düğmesini gizle
                              document.getElementById(
                                `submit-button${post?.id}`
                              ).style.display = "none";
                            }
                          }}
                        />

                        <Button
                          id={`submit-button${post?.id}`}
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
              </Grid>
            </Grid>
          </Card>
        </Box>
      </StyledModal>
    </div>
  );
};

export default PostComponent;
