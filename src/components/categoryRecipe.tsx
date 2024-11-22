import React from "react";
import { useGetCategoryQuery } from "../services/api"; // Adjust the import based on your query hook
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

interface CategoryItem {
  _id: string;
  category_name: string;
  image: string;
}

const Categories: React.FC = () => {
  const { data, error, isLoading } = useGetCategoryQuery(""); // Adjust based on your actual query hook
  const navigate = useNavigate();
  if (isLoading) return <Loader />;
  if (error) return <p>Error loading categories.</p>;

  const categoriesData: CategoryItem[] = data?.data || []; // Adjust according to your API response

  return (
    <Box sx={{ padding: { xs: "1rem", md: "2rem" } }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: "2rem" }}>
        Recipe Categories
      </Typography>
      <Grid container spacing={2}>
        {categoriesData.map((category) => (
          <Grid item xs={6} sm={4} md={2} key={category._id}>
            {" "}
            {/* Responsive grid for category items */}
            <Box
              sx={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/category/${category._id}`)}
            >
              <img
                src={category.image}
                alt={category.category_name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0.5rem", // Adjusted padding for smaller title space
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {category.category_name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
