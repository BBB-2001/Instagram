import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import i from "./assets/locke.png";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "./graphql/Mutations";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "./App";

const ResetPassword = () => {
  const [sendResetEmail, { loading, error, data }] =
    useMutation(RESET_PASSWORD);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRpassword = async (e) => {
    e.preventDefault();
    try {
      sendResetEmail({
        variables: {
          token: token,
          newPassword: formData.password,
        },
      }).then((res) => {
        console.log(res);
        navigate("/auth/login");
      });
    } catch (error) {
      console.log("errrrror", error);
    }
  };

  const { token } = useParams();
  console.log("token", token);
  const imageStyle = {
    marginBottom: "30px",
  };

  const customStyles = {
    borderRadius: "0",
    width: "268px",
    height: "50px",

    marginBottom: " 10px",
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  };
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    width: "358px",
    height: "50px",
  };
  const buttonStyle = {
    width: "268px",
    height: "32px",
    marginTop: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 149, 246)",
  };
  const orStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };
  const borderStyle = {
    borderTop: "1px solid",
    width: "100px",
    color: "rgb(219, 219, 219)",
  };
  return (
    <div>
      <Container sx={divStyle}>
        <Box
          sx={{
            width: "358px",
            height: "402px",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={divStyle}>
              <img style={imageStyle} src={i} alt="Resim Açıklaması" />

              <TextField
                onChange={handleChange}
                name="password"
                value={formData.password}
                id="outlined-basic"
                label=" Yeni Şifre"
                variant="outlined"
                InputProps={{
                  sx: customStyles,
                }}
              ></TextField>
              <TextField
                onChange={handleChange}
                name="confirmPassword"
                value={formData.confirmPassword}
                id="outlined-basic"
                label=" Yeni Şifre Tekrar"
                variant="outlined"
                InputProps={{
                  sx: customStyles,
                }}
              ></TextField>

              <Button
                variant="contained"
                disableElevation
                sx={buttonStyle}
                onClick={handleRpassword}
              >
                <Typography sx={{ color: "white" }}>Gönder</Typography>
              </Button>
              <div style={orStyle}>
                <div style={borderStyle}></div>
                <Typography
                  sx={{
                    display: "flex ",
                    flexDirection: "row",
                    paddingX: "10px",
                    color: "rgb(115, 115, 115)",
                    fontSize: ".8125rem",
                  }}
                >
                  YA DA
                </Typography>
                <div style={borderStyle}></div>
              </div>
              <Typography
                align="center"
                justify="center"
                display="flex"
                paddingTop="20px"
              >
                <Link to="http://127.0.0.1:5173/auth/register">
                  Yeni hesap oluştur
                </Link>
              </Typography>
            </div>
          </Paper>
        </Box>
      </Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper sx={boxStyle}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Hesabın var mı ?{" "}
            <Typography marginLeft="5px">
              {" "}
              <Link to="http://127.0.0.1:5173/auth/login">Giriş Yap </Link>
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default ResetPassword;
