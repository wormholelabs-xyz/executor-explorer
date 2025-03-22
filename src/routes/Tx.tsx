import { CheckCircle, Error, HourglassTop, Launch } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { explorer, toChain } from "@wormhole-foundation/sdk-base";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChainIdIcon from "../components/ChainIdIcon";
import RawView from "../components/RawView";
import { useNetworkContext } from "../contexts/NetworkContext";
import { useCapabilities } from "../hooks/useCapabilities";
import { chainIdToName } from "../utils/chainIdToName";
import prettifyAxiosError from "../utils/prettifyAxiosError";

function ExplorerTx({ txHash, chainId }: { txHash: string; chainId: number }) {
  try {
    // TODO: discern testnet from mainnet somehow?
    const network = "Testnet";
    const chain = toChain(chainId);
    const chainConfig = explorer.explorerConfigs(network, chain);
    const link = explorer.linkToTx(chain, txHash, network);
    return (
      <Button
        sx={{ ml: 1 }}
        size="small"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        endIcon={<Launch />}
      >
        {chainConfig?.name || ""}
      </Button>
    );
  } catch (e) {
    let link = "";
    let name = "";
    // TODO: this is a hack, update the wormhole sdk so that it has these networks
    if (chainId === 10002) {
      link = `https://sepolia.etherscan.io/tx/${txHash}`;
      name = "Etherscan";
    }
    if (chainId === 10004) {
      link = `https://sepolia.basescan.org/tx/${txHash}`;
      name = "BaseScan";
    }
    if (link) {
      return (
        <Button
          sx={{ ml: 1 }}
          size="small"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<Launch />}
        >
          {name}
        </Button>
      );
    }
    return null;
  }
}

function TxAndIcon({ txHash, chainId }: { txHash: string; chainId: number }) {
  return (
    <Typography
      variant="body2"
      sx={{
        wordBreak: "break-all",
        fontFamily: "monospace",
        display: "flex",
        alignItems: "center",
      }}
      component="div"
    >
      <Box sx={{ mr: 0.5, display: "flex" }}>
        <ChainIdIcon chainId={chainId} size="16px" />
      </Box>
      {txHash}
    </Typography>
  );
}

function Tx() {
  const { hash } = useParams<{ hash: string }>();
  const { currentNetwork } = useNetworkContext();
  const [result, setResult] = useState<null | { err?: string; data?: any }>(
    null,
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
        <Typography gutterBottom variant="h5" component="h1">
          Transaction Details
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
                      key={c}
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
            <RawView data={result.data}>
              <Box>
                {result.data.map((d: any) => (
                  <Fragment key={d.id}>
                    <Grid
                      container
                      spacing={2}
                      sx={{ mt: 2 }}
                      display="flex"
                      alignItems="center"
                    >
                      <Grid size={3}>
                        <Typography color="textDisabled" variant="body2">
                          Source Tx:
                        </Typography>
                      </Grid>
                      <Grid
                        size={9}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <TxAndIcon txHash={d.txHash} chainId={d.chainId} />
                        <ExplorerTx txHash={d.txHash} chainId={d.chainId} />
                        <Button
                          sx={{ ml: 1 }}
                          size="small"
                          href={`https://wormholescan.io/#/tx/${d.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<Launch />}
                        >
                          Wormholescan
                        </Button>
                      </Grid>
                      <Grid size={3}>
                        <Typography color="textDisabled" variant="body2">
                          Status:
                        </Typography>
                      </Grid>
                      <Grid size={9}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            display: "flex",
                            alignItems: "center",
                          }}
                          component="div"
                        >
                          <Box sx={{ mr: 0.5, ml: -0.5, display: "flex" }}>
                            {d.status === "submitted" ? (
                              <CheckCircle color="success" />
                            ) : d.status === "pending" ? (
                              <HourglassTop color="disabled" />
                            ) : d.status === "failed" ? (
                              <Error color="error" />
                            ) : null}
                          </Box>
                          {d.status}
                        </Typography>
                      </Grid>
                      <Grid size={3}>
                        <Typography color="textDisabled" variant="body2">
                          Executed Tx(s):
                        </Typography>
                      </Grid>
                      <Grid size={9}>
                        {d.txs.map((tx: any) => (
                          <Box
                            key={tx.txHash}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <TxAndIcon
                              txHash={tx.txHash}
                              chainId={tx.chainId}
                            />
                            <ExplorerTx
                              txHash={tx.txHash}
                              chainId={tx.chainId}
                            />
                          </Box>
                        ))}
                      </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                  </Fragment>
                ))}
              </Box>
            </RawView>
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
