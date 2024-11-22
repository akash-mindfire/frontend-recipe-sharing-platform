import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useLoginMutation } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokens } from "../redux/reducers/authReducer";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect path from query parameter
  const redirectPath = new URLSearchParams(location.search).get("redirect");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: any = await loginUser(formData);
      if (res.data?.data) {
        const user = res.data.data.user;
        const token = res.data.data.accessToken;
        dispatch(setTokens({ user, token }));
        toast.success("Login successfully!");
        // Redirect to the original page or home page
        navigate(redirectPath || "/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleRegisterRedirect = () => {
    navigate("/register"); // Replace "/register" with your actual registration page route
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 1 }}>
          or
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 1 }}
          onClick={handleRegisterRedirect}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
