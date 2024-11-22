import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", padding: "2rem" }}>
      {/* Upper part */}
      <Grid container spacing={2} sx={{ marginY: 2 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "20px",
                flexGrow: 1,
                fontFamily: "cursive",
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            <Typography variant="body2" sx={{ py: 2, px: { xs: 6, md: 18 } }}>
              "On the other hand, we denounce with righteous indignation and
              dislike men who are beguiled and demoralized by the charm of
              pleasure of the moment."
            </Typography>
          </Box>
        </Grid>

        {/* Three-column section */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: "1rem", fontWeight: "900" }}
              >
                Links
              </Typography>
              <Link href="#" color="inherit" display="block" underline="hover">
                About Us
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Carrier
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Contact Us
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Feedback
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: "1rem", fontWeight: "900" }}
              >
                Policies
              </Typography>
              <Link href="#" color="inherit" display="block" underline="hover">
                Terms
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Conditions
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Cookies
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Copyright
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: "1rem", fontWeight: "900" }}
              >
                Follow Us
              </Typography>
              <Link href="#" color="inherit" display="block" underline="hover">
                Facebook
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Twitter
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                Instagram
              </Link>
              <Link href="#" color="inherit" display="block" underline="hover">
                YouTube
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
      {/* Bottom part */}
      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Cookbook Resource. All Rights
          Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
