import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNetworkContext } from "../contexts/NetworkContext";

function Tx() {
  const { hash } = useParams<{ hash: string }>();
  const { currentNetwork } = useNetworkContext();
  const [result, setResult] = useState<null | { err?: string; data?: object }>(
    null
  );
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (currentNetwork) {
      let cancelled = false;
      setResult(null);
      (async () => {
        try {
          const res = await axios.post(`${currentNetwork}/v0/status/tx`, {
            txHash: hash,
            chainId,
          });
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
  }, [currentNetwork, hash, chainId]);
  const [capabilitiesResult, setCapabilitiesResult] = useState<null | {
    err?: string;
    data?: object;
  }>(null);
  useEffect(() => {
    if (currentNetwork && result?.err) {
      let cancelled = false;
      setCapabilitiesResult(null);
      (async () => {
        try {
          const res = await axios.get(`${currentNetwork}/v0/capabilities`);
          if (!cancelled) {
            setCapabilitiesResult({ data: res.data });
          }
        } catch (e: any) {
          if (!cancelled) {
            setCapabilitiesResult({
              err: e?.message || "An unknown error occurred",
            });
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }
  }, [currentNetwork, result?.err]);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom component="div">
          {hash ? hash : ""}
        </Typography>
        {result ? (
          result.err ? (
            <>
              <Typography color="error">{result.err}</Typography>
              {!chainId && capabilitiesResult?.data ? (
                <>
                  Specify a supported chain:{" "}
                  {Object.keys(capabilitiesResult.data).map((c) => (
                    <Button
                      onClick={() => {
                        setChainId(Number(c));
                      }}
                    >
                      {c}
                    </Button>
                  ))}
                </>
              ) : null}
            </>
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
export default Tx;
