import { createTheme, ThemeProvider } from '@mui/material/styles';

 const theme = createTheme({
    palette: {
      mode: 'light', // Choose light mode for a clean background
      primary: {
        main: '#000000', // Black for primary elements
      },
      secondary: {
        main: '#FFFFFF', // White for secondary elements
      },
      background: {
        default: '#F5F5F5', // Very light gray for the main background
        paper: '#FFFFFF', // White for paper surfaces (like cards)
      },
      text: {
        primary: '#000000', // Black text for primary content
        secondary: '#555555', // Gray for secondary text
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif', // Clean sans-serif for body text
      h1: {
        fontWeight: 700,
        color: '#000000', // Black for headings
      },
      body1: {
        fontWeight: 400,
        color: '#333333', // Dark gray for body text
      },
      button: {
        textTransform: 'none', // No capitalization for button text
        color: '#FFFFFF',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#000000', // Black background for buttons
            color: '#FFFFFF', // White text for buttons
            '&:hover': {
              backgroundColor: '#333333', // Dark gray on hover
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF', // White background for cards
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          },
        },
      },
    },
  });
export default theme;
// Wrap your application with ThemeProvider in the main file
/*
<ThemeProvider theme={deepTheme}>
  <App />
</ThemeProvider>
*/
