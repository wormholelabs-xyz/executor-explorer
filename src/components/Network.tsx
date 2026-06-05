import {
  CheckOutlined,
  SettingsEthernetOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import {
  MAINNET_EXECUTOR_URL,
  TESTNET_EXECUTOR_URL,
  useNetworkContext,
} from "../contexts/NetworkContext";

function isValidURL(s: string) {
  try {
    new URL(s);
    return true;
  } catch (e: any) {
    return false;
  }
}

function NetworkContent({ onDone }: { onDone: () => void }) {
  const { currentEnv, currentNetwork, setCurrentEnv, setCurrentNetwork } =
    useNetworkContext();
  const [network, setNetwork] = useState(currentNetwork);
  const handleEnvChange = useCallback(
    (e: any) => {
      setCurrentEnv(e.target.value);
    },
    [setCurrentEnv],
  );
  const handleNetworkChange = useCallback(
    (e: any) => {
      setNetwork(e.target.value);
      if (isValidURL(e.target.value)) {
        setCurrentNetwork(e.target.value);
      }
    },
    [setCurrentNetwork],
  );
  const isValid = !!network && isValidURL(network);
  return (
    <>
      <Box m={2} mx={2} textAlign="center">
        <Box m={2}>
          <TextField
            select
            value={currentEnv}
            onChange={handleEnvChange}
            label="Environment"
            margin="dense"
            fullWidth
          >
            <MenuItem value="Mainnet">Mainnet</MenuItem>
            <MenuItem value="Testnet">Testnet</MenuItem>
          </TextField>
        </Box>
        <Box m={2}>
          <TextField
            value={network}
            onChange={handleNetworkChange}
            label="Executor URL"
            margin="dense"
            error={!isValid}
            helperText={isValid ? "" : "Please enter a valid Executor URL"}
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) {
                onDone();
              }
            }}
          />
        </Box>
      </Box>
    </>
  );
}

function Network() {
  const { currentEnv, currentNetwork, setCurrentEnv, setCurrentNetwork } =
    useNetworkContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const isMainnet =
    currentEnv === "Mainnet" && currentNetwork === MAINNET_EXECUTOR_URL;
  const isTestnet =
    currentEnv === "Testnet" && currentNetwork === TESTNET_EXECUTOR_URL;
  const isCustom = !!currentNetwork && !isMainnet && !isTestnet;

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);
  const handleSelectMainnet = useCallback(() => {
    setCurrentEnv("Mainnet");
    setCurrentNetwork(MAINNET_EXECUTOR_URL);
    setMenuOpen(false);
  }, [setCurrentEnv, setCurrentNetwork]);
  const handleSelectTestnet = useCallback(() => {
    setCurrentEnv("Testnet");
    setCurrentNetwork(TESTNET_EXECUTOR_URL);
    setMenuOpen(false);
  }, [setCurrentEnv, setCurrentNetwork]);
  const handleSelectCustom = useCallback(() => {
    setMenuOpen(false);
    setCustomOpen(true);
  }, []);
  const handleCloseCustom = useCallback(() => {
    if (currentNetwork) {
      setCustomOpen(false);
    }
  }, [currentNetwork]);

  return (
    <>
      <IconButton ref={buttonRef} color="inherit" onClick={handleOpenMenu}>
        <SettingsEthernetOutlined />
      </IconButton>
      <Menu
        anchorEl={buttonRef.current}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem selected={isMainnet} onClick={handleSelectMainnet}>
          <ListItemIcon>{isMainnet && <CheckOutlined />}</ListItemIcon>
          <ListItemText primary="Mainnet" secondary={MAINNET_EXECUTOR_URL} />
        </MenuItem>
        <MenuItem selected={isTestnet} onClick={handleSelectTestnet}>
          <ListItemIcon>{isTestnet && <CheckOutlined />}</ListItemIcon>
          <ListItemText primary="Testnet" secondary={TESTNET_EXECUTOR_URL} />
        </MenuItem>
        <MenuItem selected={isCustom} onClick={handleSelectCustom}>
          <ListItemIcon>
            {isCustom ? <CheckOutlined /> : <TuneOutlined />}
          </ListItemIcon>
          <ListItemText
            primary="Custom"
            secondary={isCustom ? currentNetwork : "Choose env and URL"}
          />
        </MenuItem>
      </Menu>
      <Dialog
        open={customOpen}
        onClose={handleCloseCustom}
        maxWidth="xs"
        fullWidth
      >
        <NetworkContent onDone={handleCloseCustom} />
      </Dialog>
    </>
  );
}

export default Network;
