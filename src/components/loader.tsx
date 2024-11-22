import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        height: "100vh", // Full viewport height
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background
        position: "fixed", // Cover the entire screen
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000, // Ensure it appears on top
      }}
    >
      <Box
        sx={{
          position: "relative", // Relative to position the logo inside
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Circle Loader */}
        <CircularProgress size={200} />

        {/* Logo and Title inside the loader */}
        <Box
          sx={{
            position: "absolute", // Absolute positioning inside the loader
            display: "flex",
            flexDirection: "row", // Align image and text in a row
            alignItems: "center", // Center vertically
            padding: {
              xs: "0 8px", // Narrow padding for small screens
              sm: "0 16px", // Default padding for medium screens
              md: "0 24px", // Wider padding for larger screens
            },
          }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/chef-logo-icon-isolated-dark-background-simple-vector-214804180.jpg"
            alt="Logo"
            style={{
              width: "60px", // Adjust size as needed
              height: "60px",
              objectFit: "cover",
              marginRight: "8px", // Add space between the image and text
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
