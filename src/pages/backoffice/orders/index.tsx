import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utils/generals";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import Image from "next/image";
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
          <ToggleButton value={ORDERSTATUS.PENDING}>
            {ORDERSTATUS.PENDING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COOKING}>
            {ORDERSTATUS.COOKING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COMPLETE}>
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
          <Image
            src={"/load.gif"}
            alt="loading"
            width={100}
            height={100}
            style={{ marginLeft: 10, opacity: "50%" }}
          />
          <Typography variant="h4" fontFamily="poppins">
            No Pending Orders.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
