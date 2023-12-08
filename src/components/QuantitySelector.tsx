import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ value, onIncrease, onDecrease }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100px",
        mt: 3,
      }}
    >
      <IconButton color="success" onClick={onDecrease}>
        <RemoveCircle />
      </IconButton>
      <Typography variant="h5">{value}</Typography>
      <IconButton color="success" onClick={onIncrease}>
        <AddCircle />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
