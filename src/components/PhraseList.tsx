import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useApp } from "../context/appContext";
import PhraseCard from "./PhraseCard";

const PhraseList = () => {
  const {
    state: { phrases },
    deletePhrase,
  } = useApp();
  const [search, setSearch] = useState("");

  const filteredPhrases = phrases.filter((phrase) =>
    phrase.text.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box display='flex' justifyContent='end'>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
        />
      </Box>
      <Grid container spacing={2}>
        {filteredPhrases.map(({ id, text }) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={id}>
            <PhraseCard id={id} text={text} deletePhrase={deletePhrase} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PhraseList;
