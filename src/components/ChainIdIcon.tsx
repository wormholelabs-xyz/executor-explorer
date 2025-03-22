import { toChain } from "@wormhole-foundation/sdk-base";
import { chainToIcon } from "@wormhole-foundation/sdk-icons";

function ChainIdIcon({ chainId, size }: { chainId: number; size: string }) {
  try {
    const chain = toChain(chainId);
    const icon = chainToIcon(chain);
    return icon ? (
      <img src={icon} alt={chain} height={size} width={size} />
    ) : null;
  } catch (e) {
    return null;
  }
}

export default ChainIdIcon;
