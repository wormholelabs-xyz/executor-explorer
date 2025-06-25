import { toChain } from "@wormhole-foundation/sdk-base";
import { CHAIN_ID_CODEX, CHAIN_ID_FOGO } from "./consts";

export const chainIdToName = (chainId: number) => {
  if (chainId === CHAIN_ID_FOGO) {
    return `Fogo (${chainId})`;
  }
  if (chainId === CHAIN_ID_CODEX) {
    return `Codex (${chainId})`;
  }
  try {
    return `${toChain(chainId)} (${chainId})`;
  } catch (e) {
    return `Unknown (${chainId})`;
  }
};
