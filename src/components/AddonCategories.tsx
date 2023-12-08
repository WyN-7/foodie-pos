import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Addons from "./Addons";

interface Props {
  addonCategories: AddonCategory[];
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}

const AddonCategories = ({
  addonCategories,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  return (
    <Box>
      {addonCategories.map((item) => {
        return (
          <Box key={item.id} sx={{ mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  userSelect: "none",
                  fontFamily: "poppins",
                  fontWeight: "500",
                  fontSize: 20,
                }}
              >
                {item.name}
              </Typography>
              <Chip
                label={item.isRequired ? "Required" : "Optional"}
                sx={{
                  bgcolor: "red",
                  color: "#fff",
                  fontFamily: "merriweather",
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Addons
                addonCategoryId={item.id}
                selectedAddons={selectedAddons}
                setSelectedAddons={setSelectedAddons}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategories;
