import axios from "axios";
import { useEffect, useState } from "react";
import { useNetworkContext } from "../contexts/NetworkContext";

export function useCapabilities(shouldFire: boolean) {
  const { currentNetwork } = useNetworkContext();
  const [result, setResult] = useState<null | { err?: string; data?: object }>(
    null
  );
  useEffect(() => {
    if (shouldFire && currentNetwork) {
      let cancelled = false;
      setResult(null);
      (async () => {
        try {
          const res = await axios.get(`${currentNetwork}/v0/capabilities`);
          if (!cancelled) {
            setResult({ data: res.data });
          }
        } catch (e: any) {
          if (!cancelled) {
            setResult({ err: e?.message || "An unknown error occurred" });
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }
  }, [shouldFire, currentNetwork]);
  return result;
}
