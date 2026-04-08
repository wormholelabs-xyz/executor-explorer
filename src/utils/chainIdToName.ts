import { toChain } from "@wormhole-foundation/sdk-base";
import {
  CHAIN_ID_CODEX,
  CHAIN_ID_MEZO,
  CHAIN_ID_NEXUS,
  CHAIN_ID_PLUME,
  CHAIN_ID_XRPL,
  CHAIN_ID_XRPLEVM,
  CHAIN_ID_ZEROGRAVITY,
  CHIAN_ID_MEGAETH,
} from "./consts";

export const chainIdToName = (chainId: number) => {
  if (chainId === CHAIN_ID_CODEX) {
    return `Codex (${chainId})`;
  }
  if (chainId === CHAIN_ID_MEZO) {
    return `Mezo (${chainId})`;
  }
  if (chainId === CHAIN_ID_PLUME) {
    return `Plume (${chainId})`;
  }
  if (chainId === CHAIN_ID_XRPLEVM) {
    return `XRPLEVM (${chainId})`;
  }
  if (chainId === CHIAN_ID_MEGAETH) {
    return `MegaETH (${chainId})`;
  }
  if (chainId === CHAIN_ID_XRPL) {
    return `XRPL (${chainId})`;
  }
  if (chainId === CHAIN_ID_ZEROGRAVITY) {
    return `0G (${chainId})`;
  }
  if (chainId === CHAIN_ID_NEXUS) {
    return `Nexus (${chainId})`;
  }
  try {
    return `${toChain(chainId)} (${chainId})`;
  } catch (e) {
    return `Unknown (${chainId})`;
  }
};
