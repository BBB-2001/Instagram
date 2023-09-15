import React from "react";
import Sidebar from "./Sidebar";
import { Container } from "@mui/material";
import MainHome from "./MainHome";
import Suggested from "./Suggested";

function Home() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Container sx={{ paddingTop: "22px" }}>
        <MainHome />
        <Suggested />
      </Container>
    </div>
  );
}

export default Home;
