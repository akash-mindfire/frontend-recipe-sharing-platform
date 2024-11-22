import { Box } from "@mui/material";
import CarouselHome from "../components/carousel";
import { useGetHomepageDataQuery } from "../services/api";
import CategoryRecipe from "../components/categoryRecipe";
import HomeMidBodyRecipe from "../components/homeMidBodyRecipe";
import Loader from "../components/loader";

const Homepage = () => {
  const { data, error, isLoading }: any = useGetHomepageDataQuery("");

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading carousel data.</p>;

  return (
    <Box>
      <CarouselHome data={data} />
      <CategoryRecipe />
      <HomeMidBodyRecipe data={data?.data} />
    </Box>
  );
};

export default Homepage;
