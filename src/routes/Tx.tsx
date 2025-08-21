import { CheckCircle, Error, HourglassTop, Launch } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  chainToChainId,
  explorer,
  toChain,
} from "@wormhole-foundation/sdk-base";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChainIdIcon from "../components/ChainIdIcon";
import RawView from "../components/RawView";
import { useNetworkContext } from "../contexts/NetworkContext";
import { useCapabilities } from "../hooks/useCapabilities";
import { chainIdToName } from "../utils/chainIdToName";
import {
  formatBaseFee,
  formatNativeTokens,
  formatRequestType,
} from "../utils/format";
import prettifyAxiosError from "../utils/prettifyAxiosError";
import {
  CHAIN_ID_CODEX,
  CHAIN_ID_MEZO,
  CHAIN_ID_PLUME,
  CHAIN_ID_XRPLEVM,
} from "../utils/consts";

function ExplorerTx({ txHash, chainId }: { txHash: string; chainId: number }) {
  const { currentEnv } = useNetworkContext();
  try {
    const chain = toChain(chainId);
    const chainConfig = explorer.explorerConfigs(currentEnv, chain);
    const link =
      // The SDK returns a testnet link even though Solana devnet is used for Wormhole testnet
      chain === "Solana"
        ? explorer
            .linkToTx(chain, txHash, currentEnv)
            .replace("?cluster=testnet", "?cluster=devnet")
        : explorer.linkToTx(chain, txHash, currentEnv);
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
    if (chainId === chainToChainId("Arbitrum")) {
      link = `https://arbiscan.io/tx/${txHash}`;
      name = "ArbiScan";
    } else if (chainId === chainToChainId("Base")) {
      link = `https://basescan.org/tx/${txHash}`;
      name = "BaseScan";
    } else if (chainId === chainToChainId("Berachain")) {
      if (currentEnv === "Testnet") {
        link = `https://testnet.berascan.com/tx/${txHash}`;
      } else {
        link = `https://berascan.com/tx/${txHash}`;
      }
      name = "Berascan";
    } else if (chainId === chainToChainId("Bsc")) {
      if (currentEnv === "Testnet") {
        link = `https://testnet.bscscan.com/tx/${txHash}`;
      } else {
        link = `https://bscscan.com/tx/${txHash}`;
      }
      name = "BscScan";
    } else if (chainId === chainToChainId("Celo")) {
      if (currentEnv === "Testnet") {
        link = `https://alfajores.celoscan.io/tx/${txHash}`;
      } else {
        link = `https://celoscan.io/tx/${txHash}`;
      }
      name = "CeloScan";
    } else if (chainId === chainToChainId("Converge")) {
      if (currentEnv === "Testnet") {
        link = `https://explorer-converge-testnet-1.t.conduit.xyz/tx/${txHash}`;
      } else {
        // mainnet is not live as of 2025-06-11
      }
      name = "Blockscout";
    } else if (chainId === chainToChainId("Linea")) {
      if (currentEnv === "Testnet") {
        link = `https://sepolia.lineascan.build/tx/${txHash}`;
      } else {
        link = `https://lineascan.build/tx/${txHash}`;
      }
      name = "LineaScan";
    } else if (chainId === chainToChainId("Fogo")) {
      if (currentEnv === "Testnet") {
        link = `https://explorer.fogo.io/tx/${txHash}`;
      } else {
        // mainnet is not live as of 2025-06-24
      }
      name = "Fogo Explorer";
    } else if (chainId === CHAIN_ID_CODEX) {
      if (currentEnv === "Testnet") {
        link = `https://explorer.codex-stg.xyz/tx/${txHash}`;
      } else {
        link = `https://explorer.codex.xyz/tx/${txHash}`;
      }
      name = "Codex Explorer";
    } else if (chainId === chainToChainId("Moonbeam")) {
      if (currentEnv === "Testnet") {
        link = `https://moonriver.moonscan.io/tx/${txHash}`;
      } else {
        link = `https://moonbeam.moonscan.io/tx/${txHash}`;
      }
      name = "MoonScan";
    } else if (chainId === CHAIN_ID_MEZO) {
      if (currentEnv === "Testnet") {
        link = `https://explorer.test.mezo.org/tx/${txHash}`;
      } else {
        link = `https://explorer.mezo.org/tx/${txHash}`;
      }
      name = "Mezo Explorer";
    } else if (chainId === chainToChainId("Optimism")) {
      if (currentEnv === "Testnet") {
        link = `https://sepolia-optimism.etherscan.io/tx/${txHash}`;
      } else {
        link = `https://optimistic.etherscan.io/tx/${txHash}`;
      }
      name = "Optimism Etherscan";
    } else if (chainId === CHAIN_ID_PLUME) {
      if (currentEnv === "Testnet") {
        link = `https://testnet-explorer.plume.org/tx/${txHash}`;
      } else {
        link = `https://explorer.plume.org/tx/${txHash}`;
      }
      name = "Plume Explorer";
    } else if (chainId === CHAIN_ID_XRPLEVM) {
      if (currentEnv === "Testnet") {
        link = `https://explorer.testnet.xrplevm.org/tx/${txHash}`;
      } else {
        link = `https://explorer.xrplevm.org/tx/${txHash}`;
      }
      name = "XRPLEVM Explorer";
    } else if (chainId === chainToChainId("Monad")) {
      if (currentEnv === "Testnet") {
        link = `https://testnet.monadexplorer.com/tx/${txHash}`;
      } else {
        link = `https://monadexplorer.com/tx/${txHash}`;
      }
      name = "Monad Mainnet";
    } else if (chainId === chainToChainId("Seievm")) {
      if (currentEnv === "Testnet") {
        link = `https://seitrace.com/tx/${txHash}?chain=atlantic-2`;
      } else {
        link = `https://seitrace.com/tx/${txHash}?chain=pacific-1`;
      }
      name = "SeiTrace";
    } else if (chainId === chainToChainId("Scroll")) {
      if (currentEnv === "Testnet") {
        link = `https://sepolia.scrollscan.com/tx/${txHash}`;
      } else {
        link = `https://scrollscan.com/tx/${txHash}`;
      }
      name = "Scrollscan";
    } else if (chainId === chainToChainId("Unichain")) {
      if (currentEnv === "Testnet") {
        link = `https://sepolia.uniscan.xyz/tx/${txHash}`;
      } else {
        link = `https://uniscan.xyz/tx/${txHash}`;
      }
      name = "Uniscan";
    } else if (chainId === chainToChainId("Worldchain")) {
      if (currentEnv === "Testnet") {
        link = `https://sepolia.worldscan.org/tx/${txHash}`;
      } else {
        link = `https://worldscan.org/tx/${txHash}`;
      }
      name = "World Scan";
    } else if (chainId === chainToChainId("HyperEVM")) {
      if (currentEnv === "Testnet") {
        link = `https://testnet.purrsec.com/tx/${txHash}`;
      } else {
        link = `https://purrsec.com/tx/${txHash}`;
      }
      name = "Purrsec";
    } else if (chainId === chainToChainId("Sonic")) {
      if (currentEnv === "Testnet") {
        link = `https://testnet.sonicscan.org/tx/${txHash}`;
      } else {
        link = `https://sonicscan.org/tx/${txHash}`;
      }
      name = "SonicScan";
    } else if (chainId === chainToChainId("Sepolia")) {
      link = `https://sepolia.etherscan.io/tx/${txHash}`;
      name = "Etherscan";
    } else if (chainId === chainToChainId("BaseSepolia")) {
      link = `https://sepolia.basescan.org/tx/${txHash}`;
      name = "BaseScan";
    } else if (chainId === chainToChainId("ArbitrumSepolia")) {
      link = `https://sepolia.arbiscan.io/tx/${txHash}`;
      name = "ArbiScan";
    } else if (chainId === chainToChainId("OptimismSepolia")) {
      link = `https://sepolia-optimism.etherscan.io/tx/${txHash}`;
      name = "Optimism Etherscan";
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

function GridEntry({
  label,
  children,
  sx,
}: {
  label: string;
  children: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
}) {
  return (
    <>
      <Grid size={3}>
        <Typography color="textDisabled" variant="body2">
          {label}
        </Typography>
      </Grid>
      <Grid size={9} sx={sx}>
        {children}
      </Grid>
    </>
  );
}

function MonoField({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="body2"
      sx={{
        fontFamily: "monospace",
        display: "flex",
        alignItems: "center",
      }}
      component="div"
    >
      {children}
    </Typography>
  );
}

function Request({ d }: { d: any }) {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2 }}
        display="flex"
        alignItems="center"
      >
        <GridEntry
          label="Source Tx:"
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
        </GridEntry>
        <GridEntry label="Status:">
          <MonoField>
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
          </MonoField>
        </GridEntry>
        {d.failureCause ? (
          <GridEntry label="Cause:">
            <MonoField>{d.failureCause.replaceAll("_", " ")}</MonoField>
          </GridEntry>
        ) : null}
        <GridEntry label="Timestamp:">
          <MonoField>
            {new Date(d.requestForExecution.timestamp).toLocaleString()}
          </MonoField>
        </GridEntry>
        <GridEntry label="Request Type:">
          <MonoField>
            {formatRequestType(d.instruction.request.prefix)}
          </MonoField>
        </GridEntry>
        <GridEntry label="Amount Paid:">
          <MonoField>
            {formatNativeTokens(
              d.chainId,
              BigInt(d.requestForExecution.amtPaid),
              BigInt(d.signedQuote.quote.srcPrice),
            )}
          </MonoField>
        </GridEntry>
        <GridEntry label="Base Fee:">
          <MonoField>
            {formatBaseFee(
              d.chainId,
              BigInt(d.signedQuote.quote.baseFee),
              BigInt(d.signedQuote.quote.srcPrice),
            )}
          </MonoField>
        </GridEntry>
      </Grid>
      {d.txs && d.txs.length ? (
        <>
          <Divider sx={{ mt: 2 }} />
          {d.txs.map((tx: any, idx: number) => (
            <Grid
              key={tx.txHash}
              container
              spacing={2}
              sx={{ mt: 2 }}
              display="flex"
              alignItems="center"
            >
              <GridEntry
                label={`Executed Tx${d.txs.length > 1 ? ` [${idx + 1}/${d.txs.length}]` : ""}:`}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <TxAndIcon txHash={tx.txHash} chainId={tx.chainId} />
                  <ExplorerTx txHash={tx.txHash} chainId={tx.chainId} />
                </Box>
              </GridEntry>
              <GridEntry label="Cost:">
                <MonoField>
                  {formatNativeTokens(
                    tx.chainId,
                    BigInt(tx.cost),
                    BigInt(d.signedQuote.quote.dstPrice),
                  )}
                </MonoField>
              </GridEntry>
            </Grid>
          ))}
        </>
      ) : null}
      <Divider sx={{ mt: 2 }} />
    </>
  );
}

function Tx() {
  const { hash, id } = useParams<{ hash: string; id: string }>();
  const idAsNumber = parseInt(id, 10);
  const defaultChainId = Number.isFinite(idAsNumber) ? idAsNumber : undefined;
  const { currentNetwork } = useNetworkContext();
  const [result, setResult] = useState<null | { err?: string; data?: any }>(
    null,
  );
  const [chainId, setChainId] = useState<number | undefined>(defaultChainId);
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
                  <Request d={d} key={d.id} />
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
