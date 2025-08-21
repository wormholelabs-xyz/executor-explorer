import { toChain } from "@wormhole-foundation/sdk-base";
import { CHAIN_ID_CODEX, CHAIN_ID_MEZO, CHAIN_ID_PLUME, CHAIN_ID_XRPLEVM } from "./consts";

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
  try {
    return `${toChain(chainId)} (${chainId})`;
  } catch (e) {
    return `Unknown (${chainId})`;
  }
};
