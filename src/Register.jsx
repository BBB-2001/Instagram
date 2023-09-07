import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import i from "./assets/insta.png";
import { useMutation } from "@apollo/client";
import { REGISTER } from "./graphql/Mutations";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./App";

const Register = () => {
  const [register, { loading, error, data }] = useMutation(REGISTER);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      register({
        variables: {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      }).then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.register.token);
        localStorage.setItem("user", res.data.register.user);
      });
    } catch (error) {
      console.log("errrrror", error);
    }
  };
  const imageStyle = {
    width: "175px",
    height: "51px",
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
    marginBottom: "1.5rem",
  };
  const orStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  return (
    <>
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
              <Typography textAlign="center" width="70%" marginBottom="20px">
                Arkadaşlarının fotoğraf ve videolarını görmek için kaydol
              </Typography>
              <TextField
                onChange={handleChange}
                name="email"
                value={formData.email}
                id="outlined-basic"
                label="E-posta"
                variant="outlined"
                InputProps={{
                  sx: customStyles,
                }}
              ></TextField>
              <TextField
                onChange={handleChange}
                name="name"
                value={formData.name}
                id="outlined-basic"
                label="Adı Soyadı"
                variant="outlined"
                InputProps={{ sx: customStyles }}
              ></TextField>
              <TextField
                onChange={handleChange}
                name="username"
                value={formData.username}
                id="outlined-basic"
                label="Kullanıcı adı "
                variant="outlined"
                InputProps={{ sx: customStyles }}
              ></TextField>
              <TextField
                onChange={handleChange}
                name="password"
                value={formData.password}
                id="outlined-basic"
                label="Şifre"
                variant="outlined"
                InputProps={{ sx: customStyles }}
              ></TextField>
              <Button
                variant="contained"
                disableElevation
                sx={buttonStyle}
                onClick={handleRegister}
              >
                <Typography sx={{ color: "white" }}>Kaydol</Typography>
              </Button>
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
              <Link to="http://127.0.0.1:5173/auth/login">
                <p>Giriş Yap</p>
              </Link>
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
