import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  isAvailable?: boolean;
  href?: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: () => void;
}

const ItemCard = ({
  icon,
  title,
  href,
  subtitle,
  isAvailable,
  selected,
  onClick,
}: Props) => {
  const theme = useAppSelector((state) => state.app.theme);

  const dispatch = useAppDispatch();
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
        <Paper
          elevation={2}
          sx={{
            width: 170,
            height: 170,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
            textOverflow: "ellipsis",
            opacity: isAvailable === false ? 0.4 : 1,
            backgroundColor: theme === "dark" ? "info.main" : "info.main",
          }}
        >
          {icon}
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: 20,
              fontFamily: "poppins",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ fontSize: 14 }}>{subtitle}</Typography>
          )}
        </Paper>
      </Link>
    );
  }

  return (
    <Box>
      <Paper
        elevation={2}
        sx={{
          width: 170,
          height: 170,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
          position: "relative",
          cursor: "pointer",
          backgroundColor: theme === "dark" ? "info.main" : "inherit",
        }}
        onClick={() => onClick && onClick()}
      >
        {selected && (
          <CheckCircleOutlineIcon
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: "30px",
              color: "#1B9C85",
            }}
          />
        )}
        {icon}
        <Typography
          sx={{ fontWeight: "500", fontSize: 20, fontFamily: "poppins" }}
        >
          {title}
        </Typography>
        {subtitle && <Typography sx={{ fontSize: 14 }}>{subtitle}</Typography>}
      </Paper>
    </Box>
  );
};

export default ItemCard;
