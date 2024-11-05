interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

interface User {
  name: string;
  email: string;
  role: string;
  _id: string;
}

interface LoginRequest {
  email: string;
  password: string;
}
interface RecipeRequest {
  recipe_title: string;
  recipe_desc: string;
  activeTime: string;
  totalTime: string;
  servings: number;
  ingredients: Ingredient[];
  directions: Direction[];
  rating: number;
  image: File | string | null;
}
interface RecipeData {
  recipe_title: string;
  recipe_desc: string;
  activeTime: string;
  totalTime: string;
  servings: number;
  ingredients: Ingredient[];
  directions: Direction[];
  rating: number;
  image: string;
  reviews: [];
}
interface RecipeResponse {
  message: string;
  recipe: RecipeData;
}
