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
const Sidebar = () => {
  const { user } = useContext(userContext);

  return (
    <div>
      <Drawer variant="permanent">
        <List>
          <ListItem button>
            <GoHomeFill />
            <ListItemText primary="Anasayfa" />
          </ListItem>
          <ListItem button>
            <AiOutlineSearch />
            <ListItemText primary="Ara" />
          </ListItem>
          <ListItem button>
            <FaRegCompass />
            <ListItemText primary="Keşfet" />
          </ListItem>
          <ListItem button>
            <BiMoviePlay />
            <ListItemText primary="Reels" />
          </ListItem>
          <ListItem button>
            <RiMessengerLine />
            <ListItemText primary="Mesajlar" />
          </ListItem>
          <ListItem button>
            <AiOutlineHeart />
            <ListItemText primary="Bildirimler" />
          </ListItem>
          <ListItem button>
            <LuPlusSquare />
            <ListItemText primary="Oluştur" />
          </ListItem>
          <ListItem button>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user?.profile_photo ? (
                <img style={{}} src={user.profile_photo} alt="" />
              ) : (
                <BsPersonCircle />
              )}
            </Avatar>

            <ListItemText primary="Profil" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
