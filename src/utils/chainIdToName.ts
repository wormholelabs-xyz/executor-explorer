import { toChain } from "@wormhole-foundation/sdk-base";
import {
  CHAIN_ID_CODEX,
  CHAIN_ID_MEZO,
  CHAIN_ID_PLUME,
  CHAIN_ID_XRPLEVM,
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
  try {
    return `${toChain(chainId)} (${chainId})`;
  } catch (e) {
    return `Unknown (${chainId})`;
  }
};
