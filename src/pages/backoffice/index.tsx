import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data } = useSession();
  const router = useRouter();
  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            router.push(
              "https://foodie-pos-six.vercel.app//api/auth/signin/github"
            )
          }
        >
          Sign in
        </Button>
      </Box>
    );
  } else {
    router.push("/backoffice/orders");
  }
}
