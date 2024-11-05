import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateRecipe from "./pages/createrecipe";
import Layout from "./layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/:id" element={<RecipeList/>}
      </Routes>
    </Layout>
  );
}

export default App;
