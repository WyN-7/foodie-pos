import { useAppSelector } from "@/store/hooks";
import { Home } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import SideBar from "./Sidebar";

const Topbar = () => {
  const { data } = useSession();
  const router = useRouter();

  const { theme } = useAppSelector((state) => state.app);
  const { selectedLocation } = useAppSelector((state) => state.location);
  const [openDrawer, setOpenDrawer] = useState(false);
  const showLocation = data && selectedLocation;
  const IsOk = useAppSelector((state) => state.app.init === true);
  return (
    <Box
      sx={{
        bgcolor: theme === "dark" ? "primary.dark" : "success.dark",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Box sx={{ height: 70, display: { xs: "none", sm: "block" } }}>
        {IsOk && (
          <FastfoodIcon sx={{ fontSize: 60, color: "secondary.main", ml: 2 }} />
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography
          variant="h5"
          color={"secondary"}
          sx={{ fontFamily: "poppins", ml: 5 }}
        >
          Foodie POS
        </Typography>
        {showLocation && (
          <Typography
            color={"secondary"}
            sx={{ fontSize: 12, fontFamily: "poppins", ml: 5 }}
          >
            {`Current Location | ${selectedLocation?.name}`}
          </Typography>
        )}
      </Box>
      {data ? (
        <Box>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "30px", color: "#E8F6EF" }} />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2.5 }}>
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: { xs: "12px", md: "16px" },
                color: "#fff",
                cursor: "pointer",
                borderRadius: 2,
                bgcolor: theme === "dark" ? "primary.light" : "success.light",
                p: 1,
                fontFamily: "poppins",
              }}
              onClick={() => router.push("/")}
            >
              Home
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "16px" },
                color: "#fff",
                bgcolor: theme === "dark" ? "primary.light" : "success.light",
                p: 1,
                fontFamily: "poppins",
                borderRadius: 2,
                display: { xs: "none", sm: "block" },
              }}
              onClick={() => {
                router.push(`/order?tableId=1`);
              }}
            >
              Order App
            </Typography>

            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: { xs: "12px", md: "16px" },
                color: "#fff",
                bgcolor: theme === "dark" ? "primary.light" : "success.light",
                p: 1,
                borderRadius: 2,
                justifyContent: "center",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              onClick={() => signOut({ callbackUrl: "/backoffice" })}
            >
              Sign out
            </Typography>
          </Box>
          <Home
            sx={{
              cursor: "pointer",
              color: "#fff",
              display: {
                xs: "block",
                sm: "none",
                position: "absolute",
                top: 8,
                fontSize: "2rem",
                alignItems: "center",
                right: 105,
              },
            }}
            onClick={() => router.push("/")}
          ></Home>
          <ExitToAppIcon
            sx={{
              cursor: "pointer",
              color: "#fff",
              display: {
                xs: "block",
                sm: "none",
                position: "absolute",
                top: 8,
                fontSize: "2rem",
                alignItems: "center",
                right: 65,
              },
            }}
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
          />
        </Box>
      ) : (
        <span />
      )}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <SideBar />
      </Drawer>
    </Box>
  );
};

export default Topbar;
