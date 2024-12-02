import { useCallback, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

import { useLoginMutation } from "../services/api";
import { setTokens } from "../redux/reducers/authReducer";
import Loader from "../components/loader";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect path from query parameter
  const redirectPath = new URLSearchParams(location.search).get("redirect");

  // Function for handlechange of input field
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [] // No dependencies, because it's only using setFormData which should be stable.
  );
  // Function to call api to submit data
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const res: any = await loginUser(formData);
        if (res.data?.data) {
          const user = res.data.data.user;
          const token = res.data.data.accessToken;

          dispatch(setTokens({ user, token }));
          toast.success("Login successfully!");
          setIsLoading(false);
          // Redirect to the original page or home page
          navigate(redirectPath || "/");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [formData, dispatch, navigate, redirectPath] // Dependencies, only re-creates the function if these change
  );

  // Function to redirect to register page
  const handleRegisterRedirect = useCallback(() => {
    navigate("/register"); // Redirect to register page
  }, [navigate]);

  if (isLoading) return <Loader />;
  
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
