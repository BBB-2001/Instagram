import { Drawer, List, ListItem, ListItemText, Avatar } from "@mui/material";
import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { FaRegCompass } from "react-icons/fa6";
import { BiMoviePlay } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { LuPlusSquare } from "react-icons/lu";
import { userContext } from "./App";
import image from "./assets/insta3.png";
const Sidebar = () => {
  const { user } = useContext(userContext);

  return (
    <div>
      <Drawer variant="permanent" PaperProps={{ sx: { width: 335 } }}>
        <List
          sx={{ paddingBottom: "20px", paddingX: "12px", paddingTop: "8px" }}
        >
          <ListItem button sx={{}}>
            <div
              style={{
                paddingBottom: "16px",
                paddingX: "12px",
                paddingTop: "25px",
                marginBottom: "19px",
                width: "287px",
                height: "36px",
              }}
            >
              <img
                style={{ width: "103px", height: "29px" }}
                src={image}
                alt="Resim Açıklaması"
              />
            </div>
          </ListItem>
          <ListItem button sx={{ padding: "12px" }}>
            <GoHomeFill size={26} />
            <ListItemText
              primary="Anasayfa"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem button sx={{ padding: "12px" }}>
            <AiOutlineSearch size={26} />
            <ListItemText
              primary="Ara"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem button sx={{ padding: "12px" }}>
            <FaRegCompass size={26} />
            <ListItemText
              primary="Keşfet"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem button sx={{ padding: "12px" }}>
            <BiMoviePlay size={26} />
            <ListItemText
              primary="Reels"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem button sx={{ padding: "12px" }} size={50}>
            <RiMessengerLine size={26} />
            <ListItemText
              primary="Mesajlar"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem button sx={{ padding: "12px" }}>
            <AiOutlineHeart size={26} />
            <ListItemText
              primary="Bildirimler"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ padding: "12px", marginBottom: "2px", marginTop: "2px" }}
          >
            <LuPlusSquare size={26} />
            <ListItemText
              primary="Oluştur"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
          <ListItem button sx={{ padding: "12px" }}>
            <Avatar
              sx={{
                width: 25,
                height: 25,
                display: "grid",
                placeItems: "center",
              }}
            >
              {user?.profile_photo ? (
                <img
                  style={{
                    width: "150%",
                    height: "150%",
                    objectFit: "contain",
                  }}
                  src={user.profile_photo}
                  alt=""
                />
              ) : (
                <BsPersonCircle />
              )}
            </Avatar>
            <ListItemText
              primary="Profil"
              sx={{
                paddingLeft: "10px",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
