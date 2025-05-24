import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { AppProvider } from "./context/appContext";
import PhraseInput from "./components/PhraseInput";
import PhraseList from "./components/PhraseList";
import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppProvider>
      <Container sx={{ height: "100dvh", mt: "4dvh" }}>
        <Typography variant="h1" align="center" color="text.primary" mb={4}>
          IT Frases
        </Typography>
        <PhraseInput />
        <PhraseList />
      </Container>
    </AppProvider>
  </ThemeProvider>
);

export default App;
