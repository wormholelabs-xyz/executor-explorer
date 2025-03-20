import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNetworkContext } from "../contexts/NetworkContext";

function Capabilities() {
  const { currentNetwork } = useNetworkContext();
  const [result, setResult] = useState<null | { err?: string; data?: object }>(
    null
  );
  useEffect(() => {
    if (currentNetwork) {
      let cancelled = false;
      setResult(null);
      (async () => {
        try {
          const res = await axios.get(`${currentNetwork}/v0/capabilities`);
          if (!cancelled) {
            setResult({ data: res.data });
          }
        } catch (e: any) {
          if (!cancelled) {
            setResult({ err: e?.message || "An unknown error occurred" });
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }
  }, [currentNetwork]);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Capabilities
        </Typography>
        {result ? (
          result.err ? (
            <Typography color="error">{result.err}</Typography>
          ) : (
            <pre>{JSON.stringify(result.data, undefined, 2)}</pre>
          )
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
export default Capabilities;
