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
          <Image
            src="/facebook.svg"
            alt="facebook"
            width={24} // Set the desired width
            height={24} // Set the desired height
            style={{
              backgroundColor: "#004225",
              borderRadius: "5rem",
              padding: "0.5rem",
              display: "flex", // Use "display" instead of "alignItems" and "justifyContent"
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Link>
        <Link href={"https://www.instagram.com"}>
          <Image
            src="/instagram.svg"
            alt="instagram"
            width={24} // Set the desired width
            height={24} // Set the desired height
            style={{
              backgroundColor: "#004225",
              borderRadius: "5rem",
              padding: "0.5rem",
              display: "flex", // Use "display" instead of "alignItems" and "justifyContent"
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Link>
        <Link href={"https://www.twitter.com"}>
          <Image
            src="/twitter.svg"
            alt="twitter"
            width={24} // Set the desired width
            height={24} // Set the desired height
            style={{
              backgroundColor: "#004225",
              borderRadius: "5rem",
              padding: "0.5rem",
              display: "flex", // Use "display" instead of "alignItems" and "justifyContent"
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontFamily: "merriweather",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Support & Marketing
        </Typography>
        <Typography
          sx={{
            fontFamily: "merriweather",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Terms of Use & Privacy Policy
        </Typography>
        <Typography
          sx={{
            fontFamily: "merriweather",
            color: "lightgray",
            textAlign: "center",
          }}
        >
          &copy; 2024
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
        <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
      </Box>
    </Box>
  );
};

export default Footer;
