import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/appSlice";
import { updateCompany } from "@/store/slices/companySlice";
import { UpdateCompanyOptions } from "@/types/company";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const { theme } = useAppSelector((state) => state.app);
  const company = useAppSelector((state) => state.company.item);
  const [data, setData] = useState<UpdateCompanyOptions>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (company) {
      setData({
        id: company.id,
        name: company.name,
        street: company.street,
        township: company.township,
        city: company.city,
      });
    }
  }, [company]);

  if (!company || !data) return null;

  const handleUpdateCompany = () => {
    dispatch(updateCompany(data));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={theme === "dark"}
              onChange={(evt, value) => {
                const theme = value ? "dark" : "light";
                dispatch(setTheme(theme));
                localStorage.setItem("theme", theme);
              }}
            />
          }
          label=""
        />
        <LightModeIcon
          sx={{
            position: "absolute",
            right: 95,
            color: "orange",
            borderRadius: "2rem",
            top: 32,
          }}
        ></LightModeIcon>
        <DarkModeIcon
          sx={{
            position: "absolute",
            right: 15,
            color: "#fff",
            bgcolor: "#000",
            border: "2px solid #001",
            borderRadius: "2rem",
            top: 30,
          }}
        />
      </Box>
      <Typography
        sx={{
          bgcolor: "brown",
          color: "#fff",
          width: 135,
          textAlign: "center",
          borderRadius: 1,
        }}
      >
        Name
      </Typography>
      <TextField
        defaultValue={data.name}
        placeholder="Company's Name"
        sx={{ mb: 2, bgcolor: "ghostwhite" }}
        onChange={(evt) =>
          setData({ ...data, id: company.id, name: evt.target.value })
        }
      />
      <Typography
        sx={{
          bgcolor: "brown",
          color: "#fff",
          width: 135,
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        Street
      </Typography>
      <TextField
        defaultValue={data.street}
        sx={{ mb: 2, bgcolor: "ghostwhite" }}
        placeholder="Company's Street"
        onChange={(evt) =>
          setData({ ...data, id: company.id, street: evt.target.value })
        }
      />
      <Typography
        sx={{
          bgcolor: "brown",
          color: "#fff",
          width: 135,
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        Township
      </Typography>
      <TextField
        defaultValue={data.township}
        sx={{ mb: 2, bgcolor: "ghostwhite" }}
        placeholder="Company's Township"
        onChange={(evt) =>
          setData({ ...data, id: company.id, township: evt.target.value })
        }
      />
      <Typography
        sx={{
          bgcolor: "brown",
          color: "#fff",
          width: 135,
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        City
      </Typography>
      <TextField
        defaultValue={data.city}
        sx={{ mb: 2, bgcolor: "ghostwhite" }}
        placeholder="Company's City"
        onChange={(evt) =>
          setData({ ...data, id: company.id, city: evt.target.value })
        }
      />
      <Button
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
        onClick={handleUpdateCompany}
      >
        Update
      </Button>
    </Box>
  );
};

export default SettingsPage;
