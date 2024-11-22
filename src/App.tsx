import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateRecipe from "./pages/createrecipe";
import Layout from "./layout";
import RecipeList from "./pages/recipeList";
import RecipeDetail from "./pages/recipeDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/category/:id" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
