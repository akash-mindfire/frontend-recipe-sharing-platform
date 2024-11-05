import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.tsx";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer />
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
