import { useAppSelector } from "@/store/hooks";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
          <Image
            src={"/home.gif"}
            alt="home"
            width={70}
            height={70}
            style={{ cursor: "pointer", marginLeft: 30 }}
            onClick={() => router.push("/")}
          />
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
            <Button
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: { xs: "10px", md: "15px" },
                color: "#fff",
                bgcolor: theme === "dark" ? "info.dark" : "info.dark",
                p: 1,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "poppins",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  bgcolor: theme === "dark" ? "secondary.main" : "error.light",
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => signOut({ callbackUrl: "/backoffice" })}
            >
              Sign out
            </Button>
          </Box>

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
