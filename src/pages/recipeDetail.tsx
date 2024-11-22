import { useParams } from "react-router-dom";
import {
  useAddFavMutation,
  useGetFavouriteRecipeQuery,
  useGetRecipeDetailsByIdQuery,
} from "../services/api";
import Loader from "../components/loader";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Rating,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Reviews from "../components/reviews";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function RecipeDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetRecipeDetailsByIdQuery(id);
  const [addFav] = useAddFavMutation();
  const [clickFavButton, setClickFavButton] = useState<Boolean>(false);
  const recipeDetail = data?.data.recipes[0];
  const rateSectionRef = useRef<HTMLDivElement | null>(null);
  const [isFav, setIsFav] = useState<Boolean>(false);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const { data: favouriteRecipe, refetch } = useGetFavouriteRecipeQuery(
    user?._id,
    {
      skip: !user?._id,
    }
  );
  console.log("fav", favouriteRecipe?.recipes);
  useEffect(() => {
    if (favouriteRecipe?.recipes.some((recipe: any) => recipe._id == id)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }

    if (user?._id) {
      refetch();
    }
  }, [clickFavButton, favouriteRecipe, id, refetch]);


  const formatTime = (timestamp: any) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const handleFavRecipe = async () => {
    try {
      const formData = {
        userId: user?._id,
        recipe_id: id,
      };
      await addFav(formData);
      setClickFavButton(!clickFavButton);
      toast.success("Recipe added to your favourite!");
    } catch (error) {
      toast.error("Failed to create recipe. Please try again.");
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;

  if (error) return <div>Error loading recipes</div>;
  console.log(isFav, "isfav");
  return (
    <Box sx={{ px: { md: 8 } }}>
      {/* Recipe Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "900", marginBottom: "1rem", fontFamily: "initial" }}
      >
        {recipeDetail.recipe_title}
      </Typography>

      {/* Rating's Star and Review Count */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating
          name="read-only"
          value={recipeDetail.rating}
          readOnly
          size="small"
          onClick={() =>
            rateSectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          sx={{ cursor: "pointer" }}
          aria-label="Rate Recipe"
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: "900",
            alignItems: "center",
            marginLeft: "1rem",
            fontFamily: "initial",
          }}
        >
          {recipeDetail.rating}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "900",
            alignItems: "center",
            fontFamily: "initial",
          }}
        >
          {"(" + recipeDetail.reviews.length + ")"}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "900",
            alignItems: "center",
            marginLeft: "1rem",
            fontFamily: "initial",
          }}
        >
          {"|"}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "900",
            alignItems: "center",
            marginLeft: "1rem",
            fontFamily: "initial",
            cursor: "pointer",
          }}
          onClick={() =>
            rateSectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {"(" + recipeDetail.reviews.length + ")" + " Reviews"}
        </Typography>
      </Box>

      {/* CreatedBy & Published Date */}
      <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
        <Typography variant="body1">{"By "}</Typography>
        <Typography
          variant="body1"
          sx={{ textDecoration: "underline", fontWeight: "670", mx: 1 }}
        >
          {recipeDetail.createdBy}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "900",
            alignItems: "center",
            fontFamily: "initial",
          }}
        >
          {"|"}
        </Typography>
        <Typography variant="body1" sx={{ mx: 1 }}>
          Published on
        </Typography>
        <Typography variant="body1">
          {formatTime(recipeDetail.createdAt)}
        </Typography>
      </Box>

      {/* Favourite & Rate Box */}
      {isLoggedIn && (
        <Box
          sx={{
            display: "flex",
            p: { md: 3 },
            alignItems: "center",
            bgcolor: "#e1e1e1",
            width: { md: "13rem", xs: "12rem", sm: "12rem" },
            padding: { xs: 2 },
            mt: { md: 2, xs: 1, sm: 1 },
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{ mr: "1px", fontWeight: "900" }}
              aria-label="Save Recipe"
            >
              SAVE
            </Typography>
            <FavoriteIcon
              onClick={handleFavRecipe}
              sx={
                !isFav
                  ? {
                      width: 24,
                      height: 24,
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      transition: "fill 0.3s ease, stroke 0.3s ease",
                      "&:hover": {
                        fill: "red",
                        stroke: "black",
                        cursor: "pointer",
                      },
                    }
                  : {
                      width: 24,
                      height: 24,
                      fill: "red",
                      stroke: "currentcolor",
                      strokeWidth: 2,
                      transition: "fill 0.3s ease, stroke 0.3s ease",
                    }
              }
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", fontWeight: "900" }}
          >
            <Typography variant="body1" sx={{ mx: 1, color: "grey" }}>
              |
            </Typography>
            <Typography
              variant="body1"
              sx={{ mr: "1px", fontWeight: "900", cursor: "pointer" }}
              onClick={() =>
                rateSectionRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              RATE
            </Typography>
            <StarBorderIcon aria-label="Rate Recipe" />
          </Box>
        </Box>
      )}

      {/* recipe Image */}
      <Box sx={{ mt: 2 }}>
        <img
          src={recipeDetail?.image}
          alt={recipeDetail?.recipe_title}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* recipe description */}
      <Box sx={{ mt: 1, width: { md: 750, xs: "100%" } }}>
        <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
          {recipeDetail.recipe_desc}
        </Typography>
      </Box>

      {/* active time, total time & serving Box */}
      <Box
        sx={{
          display: "flex",
          p: { md: 3 },
          alignItems: "center",
          bgcolor: "#e1e1e1",
          width: { md: "55%", xs: "100%", sm: "100%" },
          padding: { xs: 2 },
          justifyContent: "space-around",
          mt: { md: 2, xs: 1, sm: 1 },
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
            }}
            noWrap
          >
            Active Time:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
            }}
          >
            {recipeDetail.activeTime}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
            }}
            noWrap
          >
            Total Time:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
            }}
          >
            {recipeDetail.totalTime}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
            }}
            noWrap
          >
            Servings:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
            }}
          >
            {recipeDetail.servings}
          </Typography>
        </Box>
      </Box>

      {/* Ingredients */}
      <Box sx={{ mt: 2, width: { md: 750, xs: "100%" } }}>
        <Typography variant="h4" sx={{ fontWeight: "900" }}>
          Ingredients
        </Typography>
        <List sx={{ pl: 3 }}>
          {recipeDetail?.ingredients?.map((ingredient: any, index: any) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center", fontSize: "1.2rem" }}
            >
              <ListItemIcon sx={{ minWidth: "0", mr: 2 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8 }} />{" "}
                {/* Bullet icon */}
              </ListItemIcon>
              <Typography variant="body1">{ingredient.desc}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Directions */}
      <Box sx={{ mt: 2, width: { md: 750, xs: "100%" } }}>
        <Typography variant="h4" sx={{ fontWeight: "900" }}>
          Directions
        </Typography>

        {recipeDetail.directions.map((direction: any, index: any) => (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", mr: 2, fontSize: "1.4rem" }}
            >
              {`Step ${index + 1}:`}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
              {direction.desc}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Reviews */}
      <Box ref={rateSectionRef} id="rate-section">
        <Reviews recipeDetail={recipeDetail} recipe_id={id} />
      </Box>
    </Box>
  );
}

export default RecipeDetail;
