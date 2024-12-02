import React, { useState, useEffect, useCallback } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  TextField,
  Drawer,
  useMediaQuery,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  Card,
  CardContent,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { resetTokens } from "../redux/reducers/authReducer";
import { RootState } from "../redux/store"; // import the RootState type
import {
  useAddFavMutation,
  useGetFavouriteRecipeQuery,
  useGetSearchRecipeQuery,
} from "../services/api";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [state, setState] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]); // Store search results
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const { data: searchData, error: apiError } = useGetSearchRecipeQuery(
    searchText,
    {
      skip: !searchText, // Skip the query if no search text
    }
  );

  const [deletedRecipe, setDeletedRecipe] = useState<Boolean>(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  // Access logged-in state and user info from Redux store
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const { data: favouriteRecipe, refetch } = useGetFavouriteRecipeQuery(
    user?._id,
    {
      skip: !user?._id,
    }
  );
  const [addFav] = useAddFavMutation();

  //for open dropdown in mobile view
  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  // For close dropdown in mobile view
  const handleMenuClose = useCallback(
    (page: string) => {
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
    },
    [navigate]
  );

  // Function for toggling search textfield
  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
    setSearchResults([]);
  }, []);

  // Function to clear search textfield value when any recipe get selected
  const handleSearchSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setSearchText("");
  }, []);

  // Function to open favourite drawer from right side
  const toggleDrawer = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  // Fucntion to show dropdown for logout
  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setProfileMenuAnchor(event.currentTarget);
    },
    []
  );

  // Fucntion to close dropdown for logout
  const handleProfileMenuClose = useCallback(() => {
    setProfileMenuAnchor(null);
  }, []);

  // Logout function to clear token
  const handleLogout = useCallback(() => {
    dispatch(resetTokens());
    navigate("/login");
    setAnchorEl(null);
  }, [dispatch, navigate]);

  // Function to delete/add favourite recipe
  const deleteRecipe = useCallback(
    async (_id: string) => {
      try {
        const formData = {
          userId: user?._id,
          recipe_id: _id,
        };
        await addFav(formData); // Assuming addFav performs the deletion operation
        setDeletedRecipe((prevState) => !prevState); // Toggle state based on the previous state
      } catch (error) {
        toast.error("Failed to delete recipe. Please try again.");
        console.log(error);
      }
    },
    [user?._id, setDeletedRecipe]
  );

  // Handle favourite list when save receipe or delete recipe triggered
  useEffect(() => {
    if (user?._id) {
      refetch(); // Manually trigger the API call
    }
  }, [state, user?._id, deletedRecipe]);

  // Search placeholder animation
  useEffect(() => {
    if (showSearch) {
      const placeholderText = "Search Your Recipe";
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setAnimatedPlaceholder(placeholderText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval);
    } else {
      setAnimatedPlaceholder(""); // Clear the placeholder when hiding search
    }
  }, [showSearch]);

  // Debounce search input
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear previous timeout if user is still typing
    }

    if (searchText) {
      setIsLoading(true); // Show loading state

      const timeout = setTimeout(() => {
        // Trigger API call after 500ms of inactivity
        // No need to do anything, as the API will be triggered automatically by the query hook
      }, 500);

      setDebounceTimeout(timeout); // Save timeout reference
    } else {
      setSearchResults([]); // Clear results when searchText is empty
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout); // Clean up timeout on unmount
      }
    };
  }, [searchText]);

  // Update search results after API response
  useEffect(() => {
    if (searchData) {
      setIsLoading(false); // Stop loading state
      setSearchResults(searchData.data || []); // Assuming the API returns an object with 'data'
    }

    if (apiError) {
      setIsLoading(false); // Stop loading state on error
      console.error("Error fetching data:", apiError); // Log error for debugging
    }
  }, [searchData, apiError]);

  return (
    <AppBar position="static">
      <Toolbar sx={{ paddingX: { xs: 2, md: 10 } }}>
        <Typography
          onClick={() => navigate("/")}
          variant="body1"
          sx={{
            flexGrow: 1,
            fontFamily: "cursive",
            fontStyle: "italic",
            cursor: "pointer",
            display: "flex",
            color: "#fff",
            alignItems: "center",
            fontSize: { xs: "16px", md: "20px" },
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

        <form
          onSubmit={handleSearchSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "end",
            width: 445,
          }}
        >
          {showSearch && !isMobile ? (
            <>
              <TextField
                variant="outlined"
                size="small"
                placeholder={animatedPlaceholder}
                value={searchText}
                autoComplete="off"
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                  marginRight: 1,
                  background: "#fff",
                  borderRadius: "8px",
                  width: isMobile ? "150px" : "100%",
                  "& .MuiInputBase-input": {
                    fontSize: isMobile ? "14px" : "16px",
                  },
                }}
              />
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: "12px",
                  color: "#000",
                  width: "1rem",
                  height: "1rem",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={toggleSearch}
              />
            </>
          ) : (
            <IconButton color="inherit" onClick={toggleSearch}>
              <SearchIcon />
            </IconButton>
          )}
          {showSearch && isMobile && (
            <Dialog
              fullScreen
              open={showSearch}
              onClose={toggleSearch}
              // TransitionComponent={Transition}
              PaperProps={{
                sx: {
                  backgroundColor: "rgba(255, 255, 255, 0.8)", // Overlay effect
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder={animatedPlaceholder}
                  value={searchText}
                  autoComplete="off"
                  onChange={(e) => setSearchText(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: {
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "5px 10px",
                      border: "none",
                      outline: "none",
                    },
                  }}
                />
              </Box>
              <IconButton
                color="inherit"
                onClick={toggleSearch}
                sx={{ position: "absolute", top: 12, right: "20px" }}
              >
                <CloseIcon />
              </IconButton>
              {searchResults.length > 0 && showSearch && (
                <List
                  sx={{
                    marginTop: 10,
                    maxHeight: 500,
                    overflow: "overlay",
                    background: "#fff",
                  }}
                >
                  {searchResults.map((result: any) => (
                    <ListItem
                      key={result._id}
                      alignItems="flex-start"
                      onClick={() => {
                        setShowSearch(!showSearch);
                        setSearchText("");
                        setSearchResults([]);
                        navigate(`recipe/${result._id}`);
                      }}
                    >
                      <Avatar
                        alt={result.recipe_title} // Use recipe title for alt text
                        src={result.image} // Use image URL for the avatar
                        sx={{ width: 56, height: 56, marginRight: 2 }} // Avatar styling
                      />
                      <ListItemText
                        primary={result.recipe_title} // Render recipe title
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Dialog>
          )}
          {isLoading && <CircularProgress size={24} sx={{ marginTop: 1 }} />}{" "}
          {/* Loading spinner */}
          {searchResults.length > 0 && showSearch && (
            <List
              sx={{
                marginTop: 1,
                position: "absolute",
                maxHeight: 500,
                zIndex: 9,
                overflow: "overlay",
                background: "#fff",
                top: 50,
              }}
            >
              {searchResults.map((result: any) => (
                <ListItem
                  key={result._id}
                  alignItems="flex-start"
                  onClick={() => {
                    setShowSearch(!showSearch);
                    setSearchText("");
                    setSearchResults([]);
                    navigate(`recipe/${result._id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Avatar
                    alt={result.recipe_title} // Use recipe title for alt text
                    src={result.image} // Use image URL for the avatar
                    sx={{ width: 56, height: 56, marginRight: 2 }} // Avatar styling
                  />
                  <ListItemText
                    primary={result.recipe_title} // Render recipe title
                  />
                </ListItem>
              ))}
            </List>
          )}
          {/* Handle case when no results are found */}
        </form>

        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              color="inherit"
              sx={{ mx: 1 }}
              onClick={() => navigate("/")}
            >
              Recipe
            </Button>
            {isLoggedIn ? (
              <Button
                color="inherit"
                sx={{ mx: 1 }}
                onClick={() => navigate("/createrecipe")}
              >
                Create Recipe
              </Button>
            ) : (
              ""
            )}
            <Button color="inherit" sx={{ mx: 1 }} onClick={toggleDrawer}>
              <FavoriteBorderIcon /> Favourite
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
                {user?.name}
                <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
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
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {isLoggedIn ? (
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Avatar
                    alt="User Avatar"
                    sx={{ bg: "#000", mr: 1 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s"
                  />
                  {user?.name}
                  <hr />
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleMenuClose("login")}>
                  Login
                </MenuItem>
              )}
              <MenuItem onClick={() => handleMenuClose("recipe")}>
                Recipe
              </MenuItem>
              {isLoggedIn && (
                <MenuItem onClick={() => handleMenuClose("createrecipe")}>
                  Create Recipe
                </MenuItem>
              )}
              {isLoggedIn && (
                <MenuItem onClick={toggleDrawer}>Favourite</MenuItem>
              )}
              {isLoggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </Menu>
          </>
        )}

        <Drawer anchor="right" open={state} onClose={toggleDrawer}>
          <Box
            sx={{
              width: { xs: "100vw", sm: 400, md: 500 }, // Full width for small screens, 400px for small devices, 500px for medium and up
              padding: 2,
            }}
          >
            {/* Close Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2, // Add margin below the close button
              }}
            >
              {" "}
              <Typography variant="h6" gutterBottom>
                Favorite Recipes
              </Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                mt: 1,
              }}
            >
              {favouriteRecipe?.recipes.map((recipe: any) => (
                <Card
                  key={recipe._id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on smaller screens
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={recipe.image}
                    alt={recipe.title}
                    sx={{
                      width: { xs: 60, sm: 80 }, // Smaller avatar size on small screens
                      height: { xs: 60, sm: 80 },
                      mr: { xs: 0, sm: 2 }, // Remove margin on small screens
                      mb: { xs: 2, sm: 0 }, // Add bottom margin for vertical layout
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <CardContent
                      sx={{
                        padding: 2,
                        textAlign: { xs: "center", sm: "left" }, // Center text for small screens
                      }}
                    >
                      <Typography variant="body1">
                        {recipe.recipe_title}
                      </Typography>
                      <Rating value={recipe.rating} readOnly precision={0.1} />
                    </CardContent>
                  </Box>

                  {/* Delete button */}
                  <IconButton
                    onClick={() => deleteRecipe(recipe._id)}
                    sx={{
                      color: "red",
                      alignSelf: { xs: "center", sm: "flex-start" }, // Center button on small screens
                      mt: { xs: 1, sm: 0 }, // Add top margin for vertical layout
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))}
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
