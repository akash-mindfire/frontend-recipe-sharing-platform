import { Box } from "@mui/material";
import CarouselHome from "../components/carousel";
import { useGetHomepageDataQuery } from "../services/api";
import CategoryRecipe from "../components/categoryRecipe";
import HomeMidBodyRecipe from "../components/homeMidBodyRecipe";
import Loader from "../components/loader";

const Homepage = () => {
  const { data, error, isLoading }: any = useGetHomepageDataQuery("");
  console.log("Home", data);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading carousel data.</p>;
  // const redirectToLogin = () => {
  //   navigate("/login");
  // };

  // const redirectToRegister = () => {
  //   navigate("/register");
  // };
  // const redirectToCreateRecipe = () => {
  //   navigate("/createrecipe");
  // };
  return (
    <Box>
      {/* <h1>Welcome to HomePage</h1>
      <Button onClick={redirectToCreateRecipe}>Create Recipe</Button>
      <Button onClick={redirectToLogin}>Login</Button>
      <Button onClick={redirectToRegister}>Register</Button>
      <RecipeForm /> */}

      <CarouselHome data={data} />
      <CategoryRecipe />
      <HomeMidBodyRecipe data={data?.data} />
    </Box>
  );
};

export default Homepage;
