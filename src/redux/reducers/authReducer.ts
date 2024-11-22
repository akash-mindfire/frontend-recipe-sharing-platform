import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserData {
  email: string;
  name: string;
  role: string;
  _id: string;
}
// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
  token: string | null;
  error: string | null;
}

// Retrieve 'auth' from localStorage and parse it once
const storedAuth = localStorage.getItem("auth");
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState: AuthState = {
  isLoggedIn: !!parsedAuth,
  user: parsedAuth?.user || null,
  token: parsedAuth?.token || null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ user: UserData; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;

      // Save the user and token in localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
    resetTokens: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;

      // Remove user and token from localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { setTokens, resetTokens } = authSlice.actions;

export default authSlice.reducer;
