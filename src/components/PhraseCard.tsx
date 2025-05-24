import { Card, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface PhraseCardProps {
  id: number;
  text: string;
  deletePhrase: (id: number) => void;
}

const PhraseCard = ({ id, text, deletePhrase }: PhraseCardProps) => (
  <Card>
    <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
      <p>{text}</p>
      <IconButton onClick={() => deletePhrase(id)}>
        <DeleteIcon />
      </IconButton>
    </CardContent>
  </Card>
);

export default PhraseCard;
