import { GitHub, Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data } = useSession();
  const router = useRouter();
  if (!data) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {/* <Button
          variant="contained"
           onClick={() =>
              router.push(
                "https://foodie-pos-six.vercel.app/api/auth/signin/google"
              )
            }
        >
          Sign in with Google
        </Button> */}
          <Button
            variant="contained"
            sx={{
              fontFamily: "poppins",
            }}
            onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
          >
            <Google sx={{ width: 20, height: 30, cursor: "pointer" }} />
          </Button>
          <Button
            variant="contained"
            sx={{ fontFamily: "poppins" }}
            onClick={() => signIn("github", { callbackUrl: "/backoffice" })}
          >
            <GitHub sx={{ width: 20, height: 30, cursor: "pointer" }} />
          </Button>
          {/*  <Button
          variant="contained"
            onClick={() =>
              router.push(
                "https://foodie-pos-six.vercel.app/api/auth/signin/github"
              )
            }
        >
          Sign in with Github
        </Button> */}
        </Box>
      </Box>
    );
  } else {
    router.push("/backoffice/orders");
  }
}
