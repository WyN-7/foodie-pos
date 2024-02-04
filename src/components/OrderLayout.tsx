import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = (props: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isHome = router.pathname === "/order";
  const isActiveOrderPage = router.pathname.includes("active-order");
  const orders = useAppSelector((state) => state.order.items);
  const showActiveOrderFooterBar =
    !isActiveOrderPage &&
    orders.length &&
    orders.some(
      (item) =>
        item.status === ORDERSTATUS.COOKING ||
        item.status === ORDERSTATUS.PENDING
    );

  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, []); //added dispatch

  return (
    <Box sx={{ bgcolor: "#fffacd" }}>
      <OrderAppHeader cartItemCount={cartItems.length} />
      <Box
        sx={{
          position: "relative",
          top: isHome ? { sm: 240 } : 0,
          bgcolor: "#fffacd",
          mb: 10,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%", lg: "75%" },
            m: "0 auto",
          }}
        >
          {props.children}
        </Box>
      </Box>
      {showActiveOrderFooterBar && (
        <Box
          sx={{
            height: 50,
            width: "500px",
            borderRadius: "10px 0 0 10px",
            bgcolor: "primary.main",
            position: "fixed",
            bottom: 0,
            right: 0,
            color: "secondary.main",
            userSelect: "none",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontFamily: "poppins",
            cursor: "pointer",
            zIndex: 5,
          }}
          onClick={() =>
            router.push({
              pathname: `/order/active-order/${orders[0].orderSeq}`,
              query: router.query,
            })
          }
        >
          You have an active order click to view
        </Box>
      )}
    </Box>
  );
};

export default OrderLayout;
