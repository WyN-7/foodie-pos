import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { OrderItem } from "@/types/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { AddonCategory, ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleOrderStatuUpdate?: (itemId: string, status: ORDERSTATUS) => void;
}

const OrderCard = ({ orderItem, isAdmin, handleOrderStatuUpdate }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const dispatch = useAppDispatch();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 300,
        height: 300,
        mt: 2,
        mr: 2,
      }}
    >
      <Box
        sx={{
          height: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#4C4C6D",
          color: "white",
          px: 1,
        }}
      >
        <Typography sx={{ color: "#ffe182" }}>
          {orderItem?.menu?.name}
        </Typography>
        <Typography sx={{ color: "#ffe182" }}>
          {orderItem?.table?.name}
        </Typography>
      </Box>
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            height: 250 * 0.15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Item Id: </Typography>
          <Typography>{orderItem.itemId}</Typography>
        </Box>
        <Box sx={{ height: 250 * 0.6, overflow: "scroll" }}>
          {orderItem.orderAddons.length > 0 ? (
            orderItem.orderAddons.map((orderAddon) => {
              const addonCategory = addonCategories.find(
                (item) => item.id === orderAddon.addonCategoryId
              ) as AddonCategory;
              return (
                <Box key={addonCategory.id} sx={{ mb: 2 }}>
                  <Typography>{addonCategory.name}</Typography>
                  {orderAddon.addons.map((addon) => {
                    return (
                      <Typography
                        key={addon.id}
                        sx={{
                          fontSize: 14,
                          ml: 2,
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {addon.name}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography>No addon</Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            height: 250 * 0.23,
            borderTop: "1px solid lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Status: </Typography>
          {isAdmin ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                value={orderItem.status}
                onChange={(evt) =>
                  handleOrderStatuUpdate &&
                  handleOrderStatuUpdate(
                    orderItem.itemId,
                    evt.target.value as ORDERSTATUS
                  )
                }
                sx={{ maxHeight: 30 }}
              >
                <MenuItem
                  value={ORDERSTATUS.PENDING}
                  onClick={() => {
                    dispatch(
                      setOpenSnackbar({
                        message: "Order has moved...",
                        autoHideDuration: 3000,
                        severity: "success",
                      })
                    );
                  }}
                >
                  {ORDERSTATUS.PENDING}
                </MenuItem>
                <MenuItem
                  value={ORDERSTATUS.COOKING}
                  onClick={() => {
                    dispatch(
                      setOpenSnackbar({
                        message: "Order has moved...",
                        autoHideDuration: 3000,
                        severity: "success",
                      })
                    );
                  }}
                >
                  {ORDERSTATUS.COOKING}
                </MenuItem>
                <MenuItem
                  value={ORDERSTATUS.COMPLETE}
                  onClick={() => {
                    dispatch(
                      setOpenSnackbar({
                        message: "Order has moved...",
                        autoHideDuration: 3000,
                        severity: "success",
                      })
                    );
                  }}
                >
                  {ORDERSTATUS.COMPLETE}
                </MenuItem>
              </Select>
            </Box>
          ) : (
            <Typography>{orderItem.status}</Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default OrderCard;
