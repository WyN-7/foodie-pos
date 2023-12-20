import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const [data, setData] = useState<UpdateMenuCategoryOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const disabledLocationmenuCategories = useAppSelector(
    (state) => state.disabledLocationMenuCategory.items
  );

  useEffect(() => {
    if (menuCategory) {
      const selectedLocationId = Number(
        localStorage.getItem("selectedLocationId")
      );
      const disalbedLocationmenuCategory = disabledLocationmenuCategories.find(
        (item) =>
          item.locationId === selectedLocationId &&
          item.menuCategoryId === menuCategoryId
      );
      setData({
        ...menuCategory,
        locationId: selectedLocationId,
        isAvailable: disalbedLocationmenuCategory ? false : true,
      });
    }
  }, [menuCategory, disabledLocationmenuCategories]);

  if (!menuCategory || !data) return null;

  const onSuccess = () => {
    setOpen(false);
    router.push("/backoffice/menu-categories"),
      dispatch(
        setOpenSnackbar({
          message: "You Have Updated the Menu Category....",
          autoHideDuration: 3000,
          severity: "success",
        })
      );
  };
  const handleUpdateMenuCategory = () => {
    dispatch(
      updateMenuCategory({
        ...data,
        locationId: Number(localStorage.getItem("selectedLocationId")),
        onSuccess,
        onError: () => {
          dispatch(
            setOpenSnackbar({
              message: "Error occurred when updating Menu Category.",
              autoHideDuration: 2000,
              severity: "error",
            })
          );
        },
      })
    );
  };

  const onSuccessDelete = () => {
    setOpen(false);
    router.push("/backoffice/menu-categories"),
      dispatch(
        setOpenSnackbar({
          message: "You Have Deleted the Menu Category....",
          autoHideDuration: 3000,
          severity: "success",
        })
      );
  };
  const handleDeleteMenuCategory = () => {
    dispatch(
      deleteMenuCategory({
        id: menuCategoryId,
        onSuccess: onSuccessDelete,
        onError: () => {
          dispatch(
            setOpenSnackbar({
              message: "Error occurred when Deleting MenuCategory.",
              autoHideDuration: 2000,
              severity: "error",
            })
          );
        },
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={menuCategory.name}
        sx={{ mb: 2, bgcolor: "#fff" }}
        onChange={(evt) =>
          setData({ ...data, id: menuCategoryId, name: evt.target.value })
        }
      />
      <FormControlLabel
        control={
          <Switch
            defaultChecked={data.isAvailable}
            onChange={(evt, value) => setData({ ...data, isAvailable: value })}
          />
        }
        label="Available"
      />
      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateMenuCategory}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm delete menu category</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this menu category?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteMenuCategory}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuCategoryDetail;
