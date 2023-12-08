import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#2e8b57",
        display: "flex",
        alignItems: "center",
        height: "11rem",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link href={"https://www.facebook.com"}>
          <img
            src="facebook.svg"
            alt="facebook"
            style={{
              backgroundColor: "#004225",
              borderRadius: "5rem",
              padding: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Link>
        <Link href={"https://www.instagram.com"}>
          <img
            src="instagram.svg"
            alt="instagram"
            style={{
              backgroundColor: "#004225",
              borderRadius: "5rem",
              padding: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Link>
        <Link href={"https://www.twitter.com"}>
          <img
            src="twitter.svg"
            alt="twitter"
            style={{
              backgroundColor: "#004225",
              borderRadius: "5rem",
              padding: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontFamily: "merriweather", color: "#fff" }}>
          Info ' Support ' Marketing
        </Typography>
        <Typography sx={{ fontFamily: "merriweather", color: "#fff" }}>
          Terms of Use ' Privacy Policy
        </Typography>
        <Typography sx={{ fontFamily: "merriweather", color: "lightgray" }}>
          © 2024 Clarity Money
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "absolute",
          left: 0,
          ml: "50px",
        }}
      >
        <Image src={"/logo.png"} alt="logo" width={130} height={130} />
      </Box>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "absolute",
          right: 0,
          marginRight: "30px",
          fontSize: "1.5rem",
          fontFamily: "merriweather",
          color: "#FFf",
        }}
      >
        Foodie Pos
      </Typography>
    </Box>
  );
};

export default Footer;
