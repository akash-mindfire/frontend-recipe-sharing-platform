import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Align items to the top
        alignItems: "center",
        height: "100vh", // Full height of the viewport
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background
        position: "fixed", // Fixed position to cover the screen
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000, // Ensures it appears on top
      }}
    >
      <Box sx={{ position: "absolute", top: 251 }}>
        <CircularProgress size={200} />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontSize: "20px",
          flexGrow: 1,
          fontFamily: "cursive",
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src="https://thumbs.dreamstime.com/b/chef-logo-icon-isolated-dark-background-simple-vector-214804180.jpg"
          style={{
            width: "40px",
            height: "30px",
            objectFit: "cover",
            background: "transparent",
          }}
        />
        CookBook
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
