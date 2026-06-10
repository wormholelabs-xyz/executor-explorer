import { toChain } from "@wormhole-foundation/sdk-base";
import { CHAIN_ID_ARC, CHAIN_ID_CODEX, CHIAN_ID_DOGECOIN } from "./consts";

export const chainIdToName = (chainId: number) => {
  if (chainId === CHAIN_ID_CODEX) {
    return `Codex (${chainId})`;
  }
  if (chainId === CHIAN_ID_DOGECOIN) {
    return `Dogecoin (${chainId})`;
  }
  if (chainId === CHAIN_ID_ARC) {
    return `Arc (${chainId})`;
  }
  try {
    return `${toChain(chainId)} (${chainId})`;
  } catch (e) {
    return `Unknown (${chainId})`;
  }
};
