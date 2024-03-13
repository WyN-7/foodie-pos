import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateAddonOptions } from "@/types/addon";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetail = () => {
  const router = useRouter();
  const addonId = Number(router.query.id);
  const addons = useAppSelector((state) => state.addon.items);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const addon = addons.find((item) => item.id === addonId);
  const [data, setData] = useState<UpdateAddonOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (addon) {
      setData({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        addonCategoryId: addon.addonCategoryId,
      });
    }
  }, [addon]);

  if (!addon || !data) return null;

  const handleOnChange = (evt: SelectChangeEvent<number>) => {
    const selectedId = evt.target.value as number;
    setData({ ...data, id: addon.id, addonCategoryId: selectedId });
  };

  const handleUpdateAddon = () => {
    dispatch(
      updateAddon({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/addons");
          dispatch(
            setOpenSnackbar({
              message: "You Have Updated the Addon....",
              autoHideDuration: 3000,
              severity: "success",
            })
          );
        },
        onError: () => {
          dispatch(
            setOpenSnackbar({
              message: "Error occurred when updating Addon.",
              autoHideDuration: 2000,
              severity: "error",
            })
          );
        },
      })
    );
  };

  const handleDeleteAddon = () => {
    dispatch(
      deleteAddon({
        id: addon.id,
        onSuccess: () => {
          router.push("/backoffice/addons");
          dispatch(
            setOpenSnackbar({
              message: "You Have Deleted the Addon....",
              autoHideDuration: 3000,
              severity: "success",
            })
          );
        },
        onError: () => {
          dispatch(
            setOpenSnackbar({
              message: "Error occurred when Deleting Addon.",
              autoHideDuration: 2000,
              severity: "error",
            })
          );
        },
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        defaultValue={data.name}
        sx={{ width: 345, bgcolor: "#fff" }}
        onChange={(evt) =>
          setData({ ...data, id: addon.id, name: evt.target.value })
        }
      />
      <TextField
        defaultValue={data.price}
        sx={{ width: 345, bgcolor: "#fff" }}
        onChange={(evt) =>
          setData({ ...data, id: addon.id, price: Number(evt.target.value) })
        }
      />
      <FormControl fullWidth>
        <InputLabel>Addon Category</InputLabel>
        <Select
          value={data.addonCategoryId}
          label="Addon Category"
          sx={{ bgcolor: "#fff", width: 345 }}
          onChange={handleOnChange}
          renderValue={(selectedAddonCategoryId) => {
            return (
              addonCategories.find(
                (item) => item.id === selectedAddonCategoryId
              ) as AddonCategory
            ).name;
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {addonCategories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Edit you Addons
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={handleUpdateAddon}
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
        <DialogTitle>Confirm delete addon</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this addon?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteAddon}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddonDetail;
