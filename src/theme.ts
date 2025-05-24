import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#e8f5e9",
      },
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        marginBottom: "2rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  });

  export default theme;