import { Launch } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { useMemo } from "react";
import { DeploymentFile } from "../hooks/usePublicDeployments";
import { getExplorerUrl } from "./chainExplorers";
import {
  GLOSSARY,
  HELPER_NAMESPACES,
  REPO_LINKS,
  firstAddress,
  shortAddress,
} from "./addressesContent";

export function AddressLink({
  chainKey,
  address,
  full,
}: {
  chainKey: string;
  address: string;
  full?: boolean;
}) {
  const href = getExplorerUrl(chainKey, address);
  const text = full ? address : shortAddress(address);
  const sx = {
    fontFamily: "monospace",
    fontSize: "0.8rem",
    wordBreak: "break-all" as const,
  };
  if (!href) {
    return (
      <Typography component="span" sx={sx} title={address}>
        {text}
      </Typography>
    );
  }
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={sx}
      title={address}
      underline="hover"
    >
      {text}
    </Link>
  );
}

export function HelpersSection({ files }: { files: DeploymentFile[] }) {
  const byNs = useMemo(
    () => new Map(files.map((f) => [f.namespace, f])),
    [files],
  );
  const rows = HELPER_NAMESPACES.map((h) => ({
    ...h,
    entry: firstAddress(byNs.get(h.namespace)),
  })).filter((r) => r.entry);
  if (rows.length === 0) return null;
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Helper Packages &amp; Lookup Tables
      </Typography>
      {rows.map((r) => (
        <Typography key={r.namespace} variant="body2" sx={{ mb: 0.75 }}>
          {r.label}:{" "}
          <AddressLink
            chainKey={r.entry!.chainKey}
            address={r.entry!.address}
          />
        </Typography>
      ))}
    </Box>
  );
}

export function GlossarySection() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Glossary
      </Typography>
      {GLOSSARY.map((g) => (
        <Typography key={g.term} variant="body2" sx={{ mb: 0.75 }}>
          <b>{g.term}</b>: {g.def}
        </Typography>
      ))}
    </Box>
  );
}

export function SourceCodeSection() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Source Code
      </Typography>
      {REPO_LINKS.map((r) => (
        <Box key={r} sx={{ mb: 0.5 }}>
          <Link
            href={r}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            {r.replace("https://github.com/wormholelabs-xyz/", "")}
            <Launch fontSize="inherit" sx={{ ml: 0.5 }} />
          </Link>
        </Box>
      ))}
    </Box>
  );
}
