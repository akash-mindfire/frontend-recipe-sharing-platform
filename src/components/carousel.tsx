import { Box, Rating, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

interface RecipeItem {
  _id: string; // Assuming string for ObjectId
  image: string;
  title: string;
  rating: number;
}

const CarouselHome = ({ data }: any) => {
  const carouselData = data?.carousel ? data.carousel : [];
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", padding: { xs: "1rem", md: "1rem 5rem" } }}>
      <Carousel indicators={true} animation="slide" navButtonsAlwaysVisible>
        {carouselData.map((item: RecipeItem, index: number) => (
          <Box
            key={index}
            onClick={()=> navigate(`/recipe/${item._id}`)}
            sx={{
              position: "relative",
              height: { xs: "50vh", sm: "60vh", md: "80vh" },
              overflow: "hidden", // Prevent overflow for larger images
              cursor: "pointer",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "10px", sm: "20px", md: "40px" },
                left: { xs: "10px", sm: "20px", md: "30px" },
                width: { xs: "90%", sm: "80%", md: "50%" },
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Enhance contrast for readability
                padding: { xs: "5px", sm: "10px", md: "15px" },
                borderRadius: "5px",
              }}
            >
              <Typography
                variant={window.innerWidth < 600 ? "h6" : "h4"}
                sx={{
                  fontFamily: "fantasy",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                }}
              >
                {item.title}
              </Typography>
              <Rating
                name="read-only"
                value={item.rating}
                readOnly
                size="small"
              />
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselHome;
