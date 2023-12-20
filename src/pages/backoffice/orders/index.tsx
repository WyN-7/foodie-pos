import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/orderSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utils/generals";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const orders = useAppSelector((state) => state.order.items);
  const addons = useAppSelector((state) => state.addon.items);
  const menus = useAppSelector((state) => state.menu.items);
  const tables = useAppSelector((state) => state.table.items);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<ORDERSTATUS>(ORDERSTATUS.PENDING);
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (orders.length) {
      const filteredOrder = formatOrders(orders, addons, menus, tables).filter(
        (orderItem) => orderItem.status === value
      );
      setFilteredOrders(filteredOrder);
    }
  }, [orders, value]);

  const handleOrderStatuUpdate = (itemId: string, status: ORDERSTATUS) => {
    dispatch(updateOrder({ itemId, status }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          color="success"
          value={value}
          exclusive
          onChange={(evt, value) => setValue(value)}
          sx={{ bgcolor: "primary.main" }}
        >
          <ToggleButton
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
          </ToggleButton>
          <ToggleButton
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
          </ToggleButton>
          <ToggleButton
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
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {orders.length ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          {filteredOrders.map((orderItem) => {
            return (
              <OrderCard
                key={orderItem.itemId}
                orderItem={orderItem}
                isAdmin
                handleOrderStatuUpdate={handleOrderStatuUpdate}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <HourglassEmptyIcon sx={{ fontSize: 90, color: "ActiveCaption" }} />
          <Typography variant="h4" fontFamily="poppins">
            No Pending Orders.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
