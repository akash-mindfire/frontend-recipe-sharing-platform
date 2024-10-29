import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <Box>
      <h1>Welcome to HomePage</h1>
      <Button onClick={redirectToLogin}>Login</Button>
      <Button onClick={redirectToRegister}>Register</Button>
    </Box>
  );
};

export default Homepage;
