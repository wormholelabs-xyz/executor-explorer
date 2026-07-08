import { DeploymentEntry, DeploymentFile } from "../hooks/usePublicDeployments";

export const REGISTRY_PUBLIC_FEED_URL =
  "https://registry-api.wormholelabs.xyz/v1/public/deployments";

export const envForNetwork = (currentEnv: string): "mainnet" | "testnet" =>
  currentEnv === "Testnet" ? "testnet" : "mainnet";

export const MATRIX_COLUMNS: { namespace: string; header: string }[] = [
  { namespace: "w7/executor", header: "Executor" },
  { namespace: "w7/executor-with-token", header: "ExecutorWithToken" },
  { namespace: "w7/ntt-manager/with-executor-v1", header: "NTTWithExecutor" },
  { namespace: "w7/ntt-manager/with-executor-v2", header: "NTTWithExecutorV2" },
  {
    namespace: "w7/ntt-manager/with-executor-with-token",
    header: "NttWithExecutorWithToken",
  },
  {
    namespace: "w7/ntt-manager/multi-token-with-executor",
    header: "MultiTokenNttWithExecutor",
  },
  {
    namespace: "w7/executor-token-bridge/token-bridge-relayer",
    header: "TokenBridgeRelayer",
  },
  {
    namespace: "w7/executor-token-bridge/token-bridge-relayer-with-referrer-v1",
    header: "TokenBridgeRelayerWithReferrer",
  },
  {
    namespace: "w7/executor-token-bridge/token-bridge-relayer-with-referrer-v2",
    header: "TokenBridgeRelayerWithReferrerV2",
  },
  { namespace: "w7/cctp-v1/with-executor-v1", header: "CCTPv1WithExecutor" },
  {
    namespace: "w7/cctp-v1/with-executor-v2",
    header: "CCTPv1WithExecutor (v2)",
  },
  {
    namespace: "w7/cctp-v2/with-executor-v1",
    header: "CCTPv2WithExecutor (v1)",
  },
  { namespace: "w7/cctp-v2/with-executor-v2", header: "CCTPv2WithExecutor" },
  {
    namespace: "w7/cctp-v1/receive-with-gas-drop-off",
    header: "CCTPv1ReceiveWithGasDropOff",
  },
  {
    namespace: "w7/cctp-v2/receive-with-gas-drop-off",
    header: "CCTPv2ReceiveWithGasDropOff",
  },
  {
    namespace: "w7/ntt-manager/multi-receive-with-gas-drop-off",
    header: "MultiReceiveWithGasDropOff",
  },
  {
    namespace: "w7/vaa-v1-receiver/vaa-v1-receive-with-gas-drop",
    header: "VAAv1ReceiveWithGasDropOff",
  },
  {
    namespace: "w7/mayan/forwarder-with-referrer",
    header: "MayanForwarderWithReferrer",
  },
  {
    namespace: "w7/mayan/forwarder-with-referrer-v2",
    header: "MayanForwarderWithReferrer (v2)",
  },
  { namespace: "w7/m0-portal/with-executor", header: "M0PortalWithExecutor" },
  {
    namespace: "w7/on-chain-quoter/quoter-router",
    header: "ExecutorQuoterRouter",
  },
];

export const LEGACY_NAMESPACES = new Set<string>([
  "w7/cctp-v1/with-executor-v1",
  "w7/cctp-v2/with-executor-v1",
  "w7/mayan/forwarder-with-referrer",
]);

export const HELPER_NAMESPACES: { namespace: string; label: string }[] = [
  {
    namespace: "w7/solana/cctp-v1-redeem-lookup-table",
    label: "Solana CCTP Redeem lookup table",
  },
  {
    namespace: "w7/solana/cctp-v2-redeem-lookup-table",
    label: "Solana CCTP V2 Redeem lookup table",
  },
  {
    namespace: "w7/solana/ntt-lookup-table-program",
    label: "Solana NTT (prior to v3) Lookup Table Program",
  },
  {
    namespace: "w7/sui/executor-requests-v2",
    label: "Sui executor_requests (VAA v1, NTT v1, CCTP v1 and v2)",
  },
  {
    namespace: "w7/sui/executor-requests",
    label: "Sui executor_requests (VAA v1 and CCTP v1)",
  },
  {
    namespace: "w7/sui/token-bridge-ptb-builder-state",
    label: "Sui token_bridge_ptb_builder (state)",
  },
  {
    namespace: "w7/sui/token-bridge-ptb-builder",
    label: "Sui token_bridge_ptb_builder (package)",
  },
  { namespace: "w7/sui/ptb-types", label: "Sui ptb_types" },
  { namespace: "w7/aptos/executor-requests", label: "Aptos executor_requests" },
  {
    namespace: "w7/solana/balance-protection",
    label: "Solana balance_protection Program (deprecated)",
  },
];

export const REPO_LINKS = [
  "https://github.com/wormholelabs-xyz/example-messaging-executor",
  "https://github.com/wormholelabs-xyz/executor-helpers",
  "https://github.com/wormholelabs-xyz/example-cctp-with-executor",
  "https://github.com/wormholelabs-xyz/example-ntt-with-executor-evm",
  "https://github.com/wormholelabs-xyz/example-ntt-with-executor-svm",
  "https://github.com/wormholelabs-xyz/example-permissionless-token-bridge-executor-shim",
];

export const GLOSSARY: { term: string; def: string }[] = [
  {
    term: "Executor",
    def: "The Executor contracts are used to request execution from a relay Delivery Provider.",
  },
  {
    term: "ExecutorWithToken",
    def: "The Executor contract that accepts Quotes being paid in a token.",
  },
  {
    term: "CCTPv1WithExecutor",
    def: "Used by a front-end to initiate a CCTP v1 transfer and request execution in a single transaction.",
  },
  {
    term: "CCTPv1ReceiveWithGasDropOff",
    def: "Used by a Delivery Provider to receive a CCTP v1 message and transfer native gas tokens in a single transaction.",
  },
  {
    term: "CCTPv2WithExecutor",
    def: "Used by a front-end to initiate a CCTP v2 transfer and request execution in a single transaction.",
  },
  {
    term: "CCTPv2ReceiveWithGasDropOff",
    def: "Used by a Delivery Provider to receive a CCTP v2 message and transfer native gas tokens in a single transaction.",
  },
  {
    term: "TokenBridgeRelayer",
    def: "Responsible for calling Wormhole Token Bridge and dispatching a Request for Execution into Executor at the same time, with the proper payload.",
  },
  {
    term: "TokenBridgeRelayerWithReferrer",
    def: "Used by a front-end to initiate a new Token Bridge (WTT) transfer and request execution.",
  },
  {
    term: "M0PortalWithExecutor",
    def: "Used to call specific Multi-Token NTT deployments from a front-end and request execution through Executor at the same time.",
  },
  {
    term: "NTTWithExecutor",
    def: "Used by a front-end to initiate an NTT transfer and request execution in a single transaction.",
  },
  {
    term: "Solana CCTP Redeem lookup table",
    def: "Allows a CCTP v1 redeem to fit under the transaction limit when a new token account is needed or a gas drop-off is requested.",
  },
  {
    term: "Solana NTT (prior to v3) Lookup Table Program",
    def: "Creates lookup tables for NTT Manager programs deployed before a canonical lookup table was included on the Manager program itself.",
  },
  {
    term: "Sui executor_requests",
    def: "Helper package used in Programmable Transaction Blocks by a front-end to build execution requests.",
  },
  {
    term: "Sui token_bridge_ptb_builder",
    def: "The dynamic PTB resolver for Token Bridge V4 — used to steer the executor relay in how to redeem the bridge transfer.",
  },
  {
    term: "Aptos executor_requests",
    def: "Helper package used by Aptos scripts or by another module to build execution requests.",
  },
];

export function firstAddress(
  file: DeploymentFile | undefined,
): DeploymentEntry | undefined {
  return file?.deployments[0];
}

export function shortAddress(address: string): string {
  return address.length > 14
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : address;
}
