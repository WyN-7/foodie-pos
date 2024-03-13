import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { UpdateTableOptions } from "@/types/table";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const router = useRouter();
  const tableId = Number(router.query.id);
  const tables = useAppSelector((state) => state.table.items);
  const table = tables.find((item) => item.id === tableId);
  const [data, setData] = useState<UpdateTableOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (table) {
      setData({
        id: table.id,
        name: table.name,
        locationId: table.locationId,
      });
    }
  }, [table]);

  if (!table || !data) return null;

  const handleUpdateTable = () => {
    dispatch(updateTable(data));
  };

  const handleDeleteTable = () => {
    dispatch(
      deleteTable({
        id: table.id,
        onSuccess: () => router.push("/backoffice/tables"),
      })
    );
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <TextField
        defaultValue={data.name}
        sx={{ bgcolor: "#fff", width: 345 }}
        onChange={(evt) =>
          setData({ ...data, id: table.id, name: evt.target.value })
        }
      />
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Edit your table
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={handleUpdateTable}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm delete table</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this table?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteTable}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableDetail;
