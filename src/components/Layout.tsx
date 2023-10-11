import { config } from "@/utils/config";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/app`);
    const dataFromServer = await response.json();
    console.log(dataFromServer);
  };

  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        {data && <SideBar />}
        <Box sx={{ p: 3, width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;