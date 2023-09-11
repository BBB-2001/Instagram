import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import i from "./assets/insta.png";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./graphql/Mutations";
import f from "./assets/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "./App";

const Login = () => {
  const [showButton, setShowButton] = useState(false);
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const { setUser } = useContext(userContext);
  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    setShowButton(true);
    e.preventDefault();
    try {
      login({
        variables: {
          identifier: formData.identifier,
          password: formData.password,
        },
      }).then((res) => {
        localStorage.setItem("token", res.data.login.token);
        localStorage.setItem("user", JSON.stringify(res.data.login.user));
        setUser(res.data.login.user);
        setShowButton(false);
      });
    } catch (error) {
      console.log("errrrror", error);
    }
  };
  const imageStyle = {
    width: "175px",
    height: "51px",
    marginBottom: "40px",
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
              <TextField
                onChange={handleChange}
                name="identifier"
                value={formData.identifier}
                id="outlined-basic"
                label="Kullanıcı adı veya e-posta"
                variant="outlined"
                InputProps={{
                  sx: customStyles,
                }}
              ></TextField>
              <TextField
                onChange={handleChange}
                name="password"
                type="password"
                value={formData.password}
                id="outlined-basic"
                label="Şifre"
                variant="outlined"
                InputProps={{
                  sx: customStyles,
                }}
              ></TextField>
              <Button
                variant="contained"
                disableElevation
                sx={buttonStyle}
                onClick={handleLogin}
                disabled={showButton}
              >
                <Typography sx={{ color: "white" }}>
                  {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </Typography>
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
                <a
                  href="https://www.example.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  {" "}
                  <img
                    src={f}
                    style={{
                      marginRight: "6px",
                    }}
                  ></img>{" "}
                  Facebook ile Giriş Yap
                </a>
              </Typography>
              <Typography
                color="rgb(0, 55, 107)"
                paddingTop="20px"
                fontSize="13px"
              >
                <Link to="/auth/forgetpassword">
                  <p>Şifreni mi unuttun ?</p>
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
            Hesabın yok mı ?{" "}
            <Typography marginLeft="5px">
              {" "}
              <Link to="http://127.0.0.1:5173/auth/register">Kayıt ol </Link>
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
