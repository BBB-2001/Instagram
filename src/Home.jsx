import React from "react";

import { Container } from "@mui/material";
import MainHome from "./components/MainHome";
import Suggested from "./components/Suggested";
import Sidebar from "./components/Sidebar";

function Home() {
  return (
    <div>
      <Sidebar />
      <Container sx={{ paddingTop: "22px" }}>
        <MainHome />
        <Suggested />
      </Container>
    </div>
  );
}

export default Home;
