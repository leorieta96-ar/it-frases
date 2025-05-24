import { useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useApp } from "../context/appContext";

const PhraseInput = () => {
  const { addPhrase } = useApp();
  const [newPhraseText, setNewPhraseText] = useState<string>("");
  const handleAddPhrase = () => {
    if (newPhraseText.trim()) {
      addPhrase(newPhraseText);
      setNewPhraseText("");
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Escribe una nueva frase..."
        value={newPhraseText}
        onChange={(e) => setNewPhraseText(e.target.value)}
        sx={{ flexGrow: 1 }}
        multiline
        rows={2}
      />
      <Button
        variant="contained"
        onClick={handleAddPhrase}
        fullWidth
        sx={{ width: { xs: "100%", sm: "auto" }, py: 1.5 }}
      >
        Añadir Frase
      </Button>
    </Paper>
  );
};

export default PhraseInput;
