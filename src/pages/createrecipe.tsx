import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCreateRecipeMutation, useGetCategoryQuery } from "../services/api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
interface Ingredient {
  _id: number;
  desc: string;
}

interface Direction {
  _id: number;
  desc: string;
}

interface Category {
  _id: string;
  category_name: string;
}

interface RecipeState {
  recipe_title: string;
  recipe_desc: string;
  activeTime: string;
  totalTime: string;
  servings: number;
  category: string;
  ingredients: Ingredient[];
  directions: Direction[];
  rating: number;
  image: File | null;
  imageUrl: string | null; // Holds the image thumbnail URL
}

const CreateRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeState>({
    recipe_title: "",
    recipe_desc: "",
    activeTime: "",
    totalTime: "",
    servings: 1,
    category: "",
    ingredients: [{ _id: Date.now(), desc: "" }],
    directions: [{ _id: Date.now(), desc: "" }],
    rating: 1,
    image: null,
    imageUrl: null, // Initialize the thumbnail URL
  });

  const [errors, setErrors] = useState<any>({});

  const [createRecipe] = useCreateRecipeMutation();
  const { data } = useGetCategoryQuery({});

  const handleSelectCategory = (e: any) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = () => {
    setRecipe({
      ...recipe,
      image: null,
      imageUrl: null,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setRecipe({
          ...recipe,
          image: selectedFile,
          imageUrl: reader.result as string, // Set the result as the thumbnail URL
        });
      };

      reader.readAsDataURL(selectedFile); // Convert the image to base64 string
    }
  };

  const handleAddIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { _id: Date.now(), desc: "" }],
    }));
  };

  const handleAddDirection = () => {
    setRecipe((prev) => ({
      ...prev,
      directions: [...prev.directions, { _id: Date.now(), desc: "" }],
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!recipe.recipe_title)
      newErrors.recipe_title = "Recipe title is required.";
    if (!recipe.recipe_desc)
      newErrors.recipe_desc = "Recipe description is required.";
    if (!recipe.activeTime) newErrors.activeTime = "Active time is required.";
    if (!recipe.totalTime) newErrors.totalTime = "Total time is required.";
    if (recipe.servings < 1)
      newErrors.servings = "Servings must be at least 1.";
    if (!recipe.category) newErrors.category = "Category is required.";
    if (!recipe.image) newErrors.image = "Image is required.";
    recipe.ingredients.forEach((ingredient, index) => {
      if (!ingredient.desc)
        newErrors[`ingredient_${index}`] = "Ingredient cannot be empty.";
    });
    recipe.directions.forEach((direction, index) => {
      if (!direction.desc)
        newErrors[`direction_${index}`] = "Direction cannot be empty.";
    });
    if (recipe.rating < 0 || recipe.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before proceeding

    const data: any = localStorage.getItem("userData");
    const formData = new FormData();
    formData.append("recipe_title", recipe.recipe_title);
    formData.append("recipe_desc", recipe.recipe_desc);
    formData.append("activeTime", recipe.activeTime);
    formData.append("totalTime", recipe.totalTime);
    formData.append("categoryId", recipe.category);
    formData.append("servings", recipe.servings.toString());
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("directions", JSON.stringify(recipe.directions));
    formData.append("rating", recipe.rating.toString());
    formData.append("createdBy", JSON.parse(data).name);
    formData.append("createrUser_Id", JSON.parse(data)._id);
    if (recipe.image) {
      formData.append("image", recipe.image); // Append the uploaded image
    }

    try {
      await createRecipe(formData);
      toast.success("Recipe created successfully!");
    } catch (error) {
      toast.error("Failed to create recipe. Please try again.");
      console.log(error);
    }
  };
  const handleDeleteIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleDeleteDirection = (index: number) => {
    const newDirections = recipe.directions.filter((_, i) => i !== index);
    setRecipe({ ...recipe, directions: newDirections });
  };
  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" mb={2}>
          Create Recipe
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Recipe Title"
              name="recipe_title"
              variant="outlined"
              fullWidth
              value={recipe.recipe_title}
              onChange={handleInputChange}
              error={!!errors.recipe_title}
              helperText={errors.recipe_title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Recipe Description"
              name="recipe_desc"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={recipe.recipe_desc}
              onChange={handleInputChange}
              error={!!errors.recipe_desc}
              helperText={errors.recipe_desc}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Active Time"
              name="activeTime"
              variant="outlined"
              fullWidth
              value={recipe.activeTime}
              onChange={handleInputChange}
              error={!!errors.activeTime}
              helperText={errors.activeTime}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Time"
              name="totalTime"
              variant="outlined"
              fullWidth
              value={recipe.totalTime}
              onChange={handleInputChange}
              error={!!errors.totalTime}
              helperText={errors.totalTime}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Servings"
              name="servings"
              type="number"
              variant="outlined"
              fullWidth
              value={recipe.servings}
              onChange={handleInputChange}
              error={!!errors.servings}
              helperText={errors.servings}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                id="category-select"
                value={recipe.category}
                label="Category"
                onChange={handleSelectCategory}
                error={!!errors.category}
              >
                {data?.data.map((category: Category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="red">
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: "2px dashed", // Dashed border
                borderRadius: "5px",
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "1rem", // Margin below the box
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  padding: "0.5rem 2rem",
                  borderRadius: "5px",
                  textTransform: "none",
                }}
              >
                <CloudUploadIcon sx={{ mr: 1, color: "white" }} /> Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
            {errors.image && (
              <Typography variant="caption" color="red">
                {errors?.image}
              </Typography>
            )}
          </Grid>
          <Grid item xs={3}>
            {recipe.imageUrl && (
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  marginLeft: 2,
                }}
              >
                <img
                  src={recipe.imageUrl}
                  alt="Recipe"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  onClick={handleDeleteImage}
                  sx={{
                    position: "absolute",
                    top: -1,
                    right: -1,
                    backgroundColor: "transparent",
                    borderRadius: "50%",
                    minWidth: "0",
                    padding: "0.5rem",
                    width: "10px",
                    height: "10px",
                    color: "#000",
                    fontWeight: "bold",
                    p: 2,
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#fff",
                    },
                  }}
                >
                  X
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" mb={1}>
              Ingredients
            </Typography>
            {recipe.ingredients.map((ingredient, index) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  key={ingredient._id}
                  label={`Ingredient ${index + 1}`}
                  name={`ingredient_${index}`}
                  variant="outlined"
                  fullWidth
                  value={ingredient.desc}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients];
                    newIngredients[index].desc = e.target.value;
                    setRecipe({ ...recipe, ingredients: newIngredients });
                  }}
                  sx={{ mt: 1 }}
                  error={!!errors[`ingredient_${index}`]}
                  helperText={errors[`ingredient_${index}`]}
                />
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon
                      sx={{ ml: 1 }}
                      onClick={() => handleDeleteIngredient(index)}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddIngredient}
              sx={{ mt: 2 }}
            >
              <AddIcon />
              Add Ingredient
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" mb={1}>
              Directions
            </Typography>
            {recipe.directions.map((direction, index) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  key={direction._id}
                  label={`Direction ${index + 1}`}
                  name={`direction_${index}`}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1 }}
                  value={direction.desc}
                  onChange={(e) => {
                    const newDirections = [...recipe.directions];
                    newDirections[index].desc = e.target.value;
                    setRecipe({ ...recipe, directions: newDirections });
                  }}
                  error={!!errors[`direction_${index}`]}
                  helperText={errors[`direction_${index}`]}
                />
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon
                      onClick={() => handleDeleteDirection(index)}
                      sx={{ ml: 1 }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddDirection}
              sx={{ mt: 2, display: "flex", alignItems: "center" }}
            >
              <AddIcon /> Add Direction
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Rating (0-5)"
              name="rating"
              type="number"
              variant="outlined"
              fullWidth
              value={recipe.rating}
              onChange={handleInputChange}
              error={!!errors.rating}
              helperText={errors.rating}
              inputProps={{ min: 0, max: 5 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              textAlign: "center",
              alignContent: "center",
            }}
          >
            Create Recipe
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateRecipe;
