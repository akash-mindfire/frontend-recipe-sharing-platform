import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryRecipeQuery } from "../services/api";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Loader from "../components/loader";

function RecipeList() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCategoryRecipeQuery(id);
  const navigate = useNavigate();
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading recipes</div>;

  return (
    <Box sx={{ mb: 4, px: { xs: 0, md: 4 } }}>
      {/* Display category name at the top center */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: "2rem", fontWeight: "bold", mt: 8 }}
      >
        {data?.data?.category_name}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ px: { md: 6, xs: 2 }, my: { md: 4, xs: 2 } }}
      >
        {data?.data?.recipes.map((recipe: any) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={recipe._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)", // Scale up on hover
                },
              }}
              onClick={() => navigate(`/recipe/${recipe._id}`)}
            >
              <CardMedia
                component="img"
                height="200" // Set a specific height for the image
                image={recipe.image}
                alt={recipe.recipe_title}
                sx={{ objectFit: "cover" }} // Maintain aspect ratio without distortion
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" noWrap sx={{ fontWeight: "bold" }}>
                  {recipe.recipe_title}
                </Typography>
                <Rating
                  name="read-only"
                  value={recipe.rating}
                  readOnly
                  precision={0.5}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecipeList;
