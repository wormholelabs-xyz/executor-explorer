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
import ChainIdIcon from "../components/ChainIdIcon";
import { useNetworkContext } from "../contexts/NetworkContext";
import { useCapabilities } from "../hooks/useCapabilities";
import { chainIdToName } from "../utils/chainIdToName";
import prettifyAxiosError from "../utils/prettifyAxiosError";

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
            setResult({
              err: prettifyAxiosError(e),
            });
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }
  }, [currentNetwork, hash, chainId]);
  const capabilitiesResult = useCapabilities(!!result?.err);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom component="div">
          {hash ? hash : ""}
        </Typography>
        {result ? (
          result.err ? (
            <>
              <Typography color="error" gutterBottom>
                {result.err}
              </Typography>
              {!chainId && capabilitiesResult?.data ? (
                <>
                  <Typography gutterBottom>
                    This transaction was not found in the Relay Provider's
                    database.
                  </Typography>
                  <Typography gutterBottom>
                    To look it up on chain, select a supported source chain:
                  </Typography>
                  {Object.keys(capabilitiesResult.data).map((c) => (
                    <Button
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        setChainId(Number(c));
                      }}
                      startIcon={
                        <ChainIdIcon chainId={Number(c)} size="16px" />
                      }
                    >
                      {chainIdToName(Number(c))}
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
