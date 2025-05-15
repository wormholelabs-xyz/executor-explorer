import { toChain } from "@wormhole-foundation/sdk-base";
import { CHAIN_ID_SONIC } from "./consts";

export const chainIdToName = (chainId: number) => {
  // TODO: remove once Sonic is included in the Wormhole SDK
  if (chainId === CHAIN_ID_SONIC) {
    return `Sonic (${chainId})`;
  }
  try {
    return `${toChain(chainId)} (${chainId})`;
  } catch (e) {
    return `Unknown (${chainId})`;
  }
};
