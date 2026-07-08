import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useNetworkContext } from "../contexts/NetworkContext";
import {
  DeploymentEntry,
  DeploymentFile,
  usePublicDeployments,
} from "../hooks/usePublicDeployments";
import {
  LEGACY_NAMESPACES,
  MATRIX_COLUMNS,
  envForNetwork,
} from "../utils/addressesContent";
import {
  AddressLink,
  GlossarySection,
  HelpersSection,
  SourceCodeSection,
} from "../utils/addressesSections";

function ContractTable({ entries }: { entries: DeploymentEntry[] }) {
  const sorted = useMemo(
    () => [...entries].sort((a, b) => a.chainKey.localeCompare(b.chainKey)),
    [entries],
  );
  return (
    <Paper variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, width: "22%" }}>
              Chain Name
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Contract Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((e) => (
            <TableRow key={`${e.chainKey}-${e.address}`} hover>
              <TableCell sx={{ whiteSpace: "nowrap" }}>{e.chainKey}</TableCell>
              <TableCell>
                <AddressLink chainKey={e.chainKey} address={e.address} full />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

type Section = {
  namespace: string;
  header: string;
  entries: DeploymentEntry[];
};

function SectionGrid({ sections }: { sections: Section[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 4,
        alignItems: "start",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "repeat(auto-fit, minmax(620px, 1fr))",
        },
      }}
    >
      {sections.map((s) => (
        <Box key={s.header}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
            {s.header}
          </Typography>
          <ContractTable entries={s.entries} />
        </Box>
      ))}
    </Box>
  );
}

function Addresses() {
  const { currentEnv, setCurrentEnv } = useNetworkContext();
  const result = usePublicDeployments(true);
  const env = envForNetwork(currentEnv);

  const files = useMemo(
    () =>
      (result?.data?.deployments ?? []).filter((f) => f.environment === env),
    [result, env],
  );

  const { current, legacy } = useMemo(() => {
    const byNs = new Map<string, DeploymentFile>(
      files.map((f) => [f.namespace, f]),
    );
    const all = MATRIX_COLUMNS.map((col) => ({
      namespace: col.namespace,
      header: col.header,
      entries: byNs.get(col.namespace)?.deployments ?? [],
    })).filter((s) => s.entries.length > 0);
    return {
      current: all.filter((s) => !LEGACY_NAMESPACES.has(s.namespace)),
      legacy: all.filter((s) => LEGACY_NAMESPACES.has(s.namespace)),
    };
  }, [files]);

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
        Contract Addresses
      </Typography>

      <Tabs
        value={currentEnv}
        onChange={(_, v) => setCurrentEnv(v as "Mainnet" | "Testnet")}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Mainnet" value="Mainnet" />
        <Tab label="Testnet" value="Testnet" />
      </Tabs>

      {result ? (
        result.err ? (
          <Typography color="error">{result.err}</Typography>
        ) : current.length === 0 && legacy.length === 0 ? (
          <Typography color="text.secondary">
            No public deployments for {env}.
          </Typography>
        ) : (
          <>
            <SectionGrid sections={current} />
            {legacy.length > 0 ? (
              <Box sx={{ mt: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Legacy Contracts
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Older contract versions, superseded by the current ones above.
                </Typography>
                <SectionGrid sections={legacy} />
              </Box>
            ) : null}
            <HelpersSection files={files} />
            <GlossarySection />
            <SourceCodeSection />
          </>
        )
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default Addresses;
