import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Avatar, TextField, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [state, setState] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserName(parsedUserData.name);
      }
    }

    const placeholderText = "Search Your Recipe";
    let currentIndex = 0;

    const typeAnimation = () => {
      const interval = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setAnimatedPlaceholder(placeholderText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            currentIndex = 0; 
            setAnimatedPlaceholder(""); 
            typeAnimation();
          }, 5000); 
        }
      }, 200);

      return () => clearInterval(interval);
    };

    typeAnimation();

    return () => {};
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (page: string) => {
    setAnchorEl(null);
    switch (page) {
      case "recipe":
        navigate("/");
        break;
      case "createrecipe":
        navigate("createrecipe");
        break;
      case "login":
        navigate("login");
        break;
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchText);
    setSearchText("");
  };

  const toggleDrawer = () => {
    setState(!state);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ paddingX: { xs: 2, md: 10 } }}>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "cursive",
            fontStyle: "italic",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "16px", md: "20px" }, // Responsive font size
          }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/chef-logo-icon-isolated-dark-background-simple-vector-214804180.jpg"
            style={{
              width: "40px",
              height: "30px",
              objectFit: "cover",
              marginRight: 1,
            }}
          />
          CookBook
        </Typography>

        <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center" }}>
          {showSearch ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder={animatedPlaceholder || "Search recipes"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={toggleSearch}
              sx={{
                marginRight: 1,
                background: "#fff",
                borderRadius: "8px",
                width: isMobile ? "150px" : "250px", // Responsive width
                "& .MuiInputBase-input": {
                  fontSize: isMobile ? "14px" : "16px",
                },
              }}
            />
          ) : (
            <IconButton color="inherit" onClick={toggleSearch}>
              <SearchIcon />
            </IconButton>
          )}
        </form>

        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/")}>
              Recipe
            </Button>
            <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/createrecipe")}>
              Create Recipe
            </Button>
            <Button color="inherit" sx={{ mx: 1 }} onClick={toggleDrawer}>
              <ShoppingCartIcon /> Cart
            </Button>

            {isLoggedIn ? (
              <Typography
                variant="body1"
                sx={{
                  mx: 1,
                  color: "#fff",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="User Avatar"
                  sx={{ bg: "#000", mr: 1 }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s"
                />
                {userName}
              </Typography>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                <AccountCircleIcon /> Login
              </Button>
            )}
          </Box>
        ) : (
          <>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleMenuClose("recipe")}>Recipe</MenuItem>
              <MenuItem onClick={() => handleMenuClose("createrecipe")}>Create Recipe</MenuItem>
              {isLoggedIn && (
                <MenuItem onClick={toggleDrawer}>
                  <ShoppingCartIcon /> Cart
                </MenuItem>
              )}
              {isLoggedIn ? (
                <MenuItem onClick={() => setAnchorEl(null)}>{userName}</MenuItem>
              ) : (
                <MenuItem onClick={() => handleMenuClose("login")}>Login</MenuItem>
              )}
            </Menu>
          </>
        )}

        <Drawer anchor="right" open={state} onClose={toggleDrawer}>
          <h3 style={{ textAlign: "center" }}>Cart</h3>
          {/* Cart content can go here */}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
