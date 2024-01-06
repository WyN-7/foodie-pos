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
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in with Google
        </Button> */}
        <Button
          variant="contained"
          onClick={() =>
            router.push(
              "https://foodie-pos-six.vercel.app/api/auth/signin/google"
            )
          }
        >
          Sign in with Google
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            router.push(
              "https://foodie-pos-six.vercel.app/api/auth/signin/github"
            )
          }
        >
          Sign in with Github
        </Button>
        {/*  <Button
          variant="contained"
          onClick={() => signIn("github", { callbackUrl: "/backoffice" })}
        >
          Sign in with Github
        </Button> */}
      </Box>
    );
  } else {
    router.push("/backoffice/orders");
  }
}
