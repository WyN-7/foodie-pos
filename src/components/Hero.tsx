import { Box, Button, Slide, Typography } from "@mui/material";
import Link from "next/link";

const Hero = () => {
  return (
    <Box
      sx={{
        mt: "250px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25px" },
              fontFamily: "poppins",
              fontWeight: "lighbold",
              color: "#4C4C6D",
            }}
          >
            Manage your menu catelog easily with Foodie POS and entice your
            customers with QR code ordering system.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Link href={`/backoffice`}>
              <Button
                variant="contained"
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                  width: "fit-content",
                  fontFamily: "poppins",
                  mr: 2,
                  backgroundColor: "#4C4C6D",
                }}
              >
                Backoffice Sign In
              </Button>
            </Link>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
