export type ChainExplorer = { url: string; account: string };

export const CHAIN_EXPLORERS: Record<string, ChainExplorer> = {
  aptos: { url: "https://explorer.aptoslabs.com", account: "account/" },
  "aptos-testnet": {
    url: "https://explorer.aptoslabs.com/?network=testnet",
    account: "account/",
  },
  arbitrum: { url: "https://arbiscan.io", account: "address/" },
  "arbitrum-sepolia": {
    url: "https://sepolia.arbiscan.io",
    account: "address/",
  },
  arc: { url: "https://arcscan.app", account: "address/" },
  "arc-testnet": { url: "https://testnet.arcscan.app", account: "address/" },
  avalanche: { url: "https://snowtrace.io", account: "address/" },
  "avalanche-testnet": {
    url: "https://testnet.snowtrace.io",
    account: "address/",
  },
  base: { url: "https://basescan.org", account: "address/" },
  "base-sepolia": { url: "https://sepolia.basescan.org", account: "address/" },
  berachain: { url: "https://beratrail.io", account: "address/" },
  bsc: { url: "https://bscscan.com", account: "address/" },
  "bsc-testnet": { url: "https://testnet.bscscan.com", account: "address/" },
  celo: { url: "https://celoscan.io", account: "address/" },
  "celo-testnet": { url: "https://alfajores.celoscan.io", account: "address/" },
  codex: { url: "https://explorer.codex.xyz", account: "address/" },
  "converge-testnet": {
    url: "https://explorer.testnet.converge.io",
    account: "address/",
  },
  creditcoin: { url: "https://creditcoin.blockscout.com", account: "address/" },
  ethereum: { url: "https://etherscan.io", account: "address/" },
  fogo: { url: "https://explorer.fogo.io", account: "account/" },
  "fogo-testnet": { url: "https://testnet.fogo.io", account: "account/" },
  hyperevm: { url: "https://hyperevmscan.io", account: "address/" },
  ink: { url: "https://explorer.inkonchain.com", account: "address/" },
  "ink-testnet": {
    url: "https://explorer-sepolia.inkonchain.com",
    account: "address/",
  },
  linea: { url: "https://lineascan.build", account: "address/" },
  "linea-testnet": {
    url: "https://sepolia.lineascan.build",
    account: "address/",
  },
  megaeth: { url: "https://megaeth.blockscout.com", account: "address/" },
  mezo: { url: "https://explorer.mezo.org", account: "address/" },
  "mezo-testnet": {
    url: "https://explorer.test.mezo.org",
    account: "address/",
  },
  moca: { url: "https://scan.mocachain.org", account: "address/" },
  "moca-testnet": {
    url: "https://testnet-scan.mocachain.org",
    account: "address/",
  },
  monad: { url: "https://monadscan.com", account: "address/" },
  "monad-testnet": {
    url: "https://testnet.monadscan.com",
    account: "address/",
  },
  moonbeam: { url: "https://moonbeam.moonscan.io", account: "address/" },
  nexus: { url: "https://explorer.nexus.xyz", account: "address/" },
  "nexus-testnet": {
    url: "https://testnet.explorer.nexus.xyz",
    account: "address/",
  },
  optimism: { url: "https://optimistic.etherscan.io", account: "address/" },
  "optimism-sepolia": {
    url: "https://sepolia-optimism.etherscan.io",
    account: "address/",
  },
  plume: { url: "https://explorer.plume.org", account: "address/" },
  "plume-testnet": {
    url: "https://testnet-explorer.plume.org",
    account: "address/",
  },
  polygon: { url: "https://polygonscan.com", account: "address/" },
  "polygon-testnet": {
    url: "https://amoy.polygonscan.com",
    account: "address/",
  },
  scroll: { url: "https://scrollscan.com", account: "address/" },
  seievm: { url: "https://seitrace.com", account: "address/" },
  "seievm-testnet": { url: "https://seistream.app", account: "address/" },
  sepolia: { url: "https://sepolia.etherscan.io", account: "address/" },
  solana: { url: "https://solscan.io", account: "account/" },
  "solana-devnet": {
    url: "https://solscan.io/?cluster=devnet",
    account: "account/",
  },
  sonic: { url: "https://sonicscan.org", account: "address/" },
  "stacks-testnet": {
    url: "https://explorer.hiro.so/?chain=testnet",
    account: "address/",
  },
  sui: { url: "https://suiscan.xyz", account: "account/" },
  "sui-testnet": {
    url: "https://explorer.sui.io/?network=testnet",
    account: "account/",
  },
  tempo: { url: "https://explore.tempo.xyz", account: "address/" },
  "tempo-testnet": {
    url: "https://explore.moderato.tempo.xyz",
    account: "address/",
  },
  unichain: { url: "https://uniscan.xyz", account: "address/" },
  "unichain-testnet": {
    url: "https://sepolia.uniscan.xyz",
    account: "address/",
  },
  worldchain: { url: "https://worldscan.org", account: "address/" },
  "xrpl-testnet": { url: "https://testnet.xrpl.org", account: "accounts/" },
  xrplevm: { url: "https://explorer.xrplevm.org", account: "address/" },
  "xrplevm-testnet": {
    url: "https://explorer.testnet.xrplevm.org",
    account: "address/",
  },
  zerogravity: { url: "https://chainscan.0g.ai", account: "address/" },
  "zerogravity-testnet": {
    url: "https://chainscan-galileo.0g.ai",
    account: "address/",
  },
};

export function getExplorerUrl(
  chainKey: string,
  address: string,
): string | null {
  const ex = CHAIN_EXPLORERS[chainKey];
  if (!ex) return null;
  const [base, query] = ex.url.split("?");
  const trimmed = base.replace(/\/+$/, "");
  const path = `${trimmed}/${ex.account}${address}`;
  return query ? `${path}?${query}` : path;
}
