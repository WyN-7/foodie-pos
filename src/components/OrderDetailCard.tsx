import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menu } from "@prisma/client";
// or
import PaidIcon from "@mui/icons-material/Paid";

interface Props {
  menu: Menu;
}
const OrderDetailCard = ({ menu }: Props) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 270,
        mb: 5,
        pb: 2,
      }}
    >
      <CardMedia
        sx={{ height: 200, objectFit: "contain" }}
        image={menu.assetUrl || "/default-menu.png"}
        component={"div"}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" sx={{ mb: 0 }}>
          {menu.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <PaidIcon color="success" />
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {menu.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderDetailCard;
