import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const HomeMidBodyRecipe = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <Box>
      {data?.map((recipe: any) => {
        return (
          <Box sx={{ padding: { xs: "1rem", md: "2rem" } }} key={recipe.title}>
            <Typography
              variant="h4"
              align="center"
              sx={{ marginBottom: "2rem" }}
            >
              {recipe.title}
            </Typography>
            <Grid container spacing={2}>
              {recipe.data.slice(0, 8).map(
                (
                  recipe: any // Show only 8 recipes
                ) => (
                  <Grid item xs={6} sm={4} md={3} key={recipe._id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s ease", // Smooth transition for scaling
                        cursor: "pointer",
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
                        alt={recipe.title}
                        sx={{ objectFit: "cover" }} // Maintain aspect ratio without distortion
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body1"
                          noWrap
                          sx={{ fontWeight: "bold" }}
                        >
                          {recipe.title}
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
                )
              )}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default HomeMidBodyRecipe;
