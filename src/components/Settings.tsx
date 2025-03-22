import {
  ContrastOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Theme, useSettingsContext } from "../contexts/SettingsContext";

function SettingsContent() {
  const { settings, updateTheme } = useSettingsContext();
  const handleThemeChange = useCallback(
    (_: any, newTheme: Theme) => {
      updateTheme(newTheme);
    },
    [updateTheme],
  );
  return (
    <>
      <Box m={2} mx={2} textAlign="center">
        <ToggleButtonGroup
          value={settings.theme}
          exclusive
          onChange={handleThemeChange}
        >
          <ToggleButton value="light">
            <LightModeOutlined />
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeOutlined />
          </ToggleButton>
          <ToggleButton value="auto">
            <ContrastOutlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
}

function Settings() {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <SettingsOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <SettingsContent />
      </Dialog>
    </>
  );
}

export default Settings;
