import { SettingsEthernetOutlined } from "@mui/icons-material";
import { Box, Dialog, IconButton, MenuItem, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useNetworkContext } from "../contexts/NetworkContext";

function isValidURL(s: string) {
  try {
    new URL(s);
    return true;
  } catch (e: any) {
    return false;
  }
}

function NetworkContent() {
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
            value={network}
            onChange={handleNetworkChange}
            label="Executor URL"
            margin="dense"
            error={!isValid}
            helperText={isValid ? "" : "Please enter a valid Executor URL"}
            fullWidth
          />
        </Box>
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
      </Box>
    </>
  );
}

function Network() {
  const { currentNetwork } = useNetworkContext();
  const [open, setOpen] = useState(!currentNetwork);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    if (currentNetwork) {
      setOpen(false);
    }
  }, [currentNetwork]);
  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <SettingsEthernetOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <NetworkContent />
      </Dialog>
    </>
  );
}

export default Network;
