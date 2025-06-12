import { chainToChainId } from "@wormhole-foundation/sdk-base";
import { formatUnits } from "viem";
import { SIGNED_QUOTE_DECIMALS } from "../layouts/signedQuote";

export const ScaledMath = {
  normalize(amount: bigint, from: number, to: number) {
    if (from > to) {
      return amount / 10n ** BigInt(from - to);
    } else if (from < to) {
      return amount * 10n ** BigInt(to - from);
    }
    return amount;
  },

  mul(a: bigint, b: bigint, decimals: number) {
    return (a * b) / 10n ** BigInt(decimals);
  },
  div(a: bigint, b: bigint, decimals: number) {
    return (a * 10n ** BigInt(decimals)) / b;
  },
} as const;

const CHAIN_ID_TO_TOKEN_INFO: {
  [chainId: number]: { decimals: number; symbol: string };
} = {
  [chainToChainId("Arbitrum")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Avalanche")]: {
    decimals: 18,
    symbol: "AVAX",
  },
  [chainToChainId("Base")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Berachain")]: {
    decimals: 18,
    symbol: "BERA",
  },
  [chainToChainId("Bsc")]: {
    decimals: 18,
    symbol: "BNB",
  },
  [chainToChainId("Celo")]: {
    decimals: 18,
    symbol: "CELO",
  },
  [chainToChainId("Converge")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Ethereum")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Moonbeam")]: {
    decimals: 18,
    symbol: "GLMR",
  },
  [chainToChainId("Optimism")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Polygon")]: {
    decimals: 18,
    symbol: "POS",
  },
  [chainToChainId("Scroll")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Unichain")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Solana")]: {
    decimals: 9,
    symbol: "SOL",
  },
  [chainToChainId("Sui")]: {
    decimals: 9,
    symbol: "SUI",
  },
  [chainToChainId("Aptos")]: {
    decimals: 8,
    symbol: "APT",
  },
  [chainToChainId("Linea")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("Worldchain")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("HyperEVM")]: {
    decimals: 18,
    symbol: "HYPE",
  },
  [chainToChainId("Sonic")]: {
    decimals: 18,
    symbol: "S",
  },
  [chainToChainId("Sepolia")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("ArbitrumSepolia")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("BaseSepolia")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("OptimismSepolia")]: {
    decimals: 18,
    symbol: "ETH",
  },
  [chainToChainId("PolygonSepolia")]: {
    decimals: 18,
    symbol: "POS",
  },
};

function tokensToUsd(amount: bigint, decimals: number, price: bigint) {
  const r = 18; // decimal resolution
  const nAmount = ScaledMath.normalize(amount, decimals, r);
  const nPrice = ScaledMath.normalize(price, SIGNED_QUOTE_DECIMALS, r);
  const nUsd = ScaledMath.mul(nAmount, nPrice, r);
  return ` ($${Number(formatUnits(nUsd, r)).toFixed(2)})`;
}

export function formatNativeTokens(
  chainId: number,
  amount: bigint,
  srcPrice: bigint,
) {
  const nativeTokenInfo = CHAIN_ID_TO_TOKEN_INFO[chainId];
  const amtStr = formatUnits(amount, nativeTokenInfo?.decimals || 0);
  return `${amtStr} ${nativeTokenInfo?.symbol || "native tokens"}${nativeTokenInfo ? tokensToUsd(amount, nativeTokenInfo.decimals, srcPrice) : ""}`;
}

export function formatBaseFee(
  chainId: number,
  amount: bigint,
  srcPrice: bigint,
) {
  const nativeTokenInfo = CHAIN_ID_TO_TOKEN_INFO[chainId];
  return `${formatUnits(amount, SIGNED_QUOTE_DECIMALS)} ${nativeTokenInfo?.symbol || "native tokens"}${tokensToUsd(amount, SIGNED_QUOTE_DECIMALS, srcPrice)}`;
}

const REQUEST_TYPES: { [prefix: string]: string } = {
  ERC1: "CCTP v1",
  ERV1: "VAA v1",
};

export function formatRequestType(prefix: string) {
  return REQUEST_TYPES[prefix] || prefix;
}
