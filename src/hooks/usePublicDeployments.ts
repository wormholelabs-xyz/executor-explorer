import axios from "axios";
import { useEffect, useState } from "react";
import { REGISTRY_API_URL } from "../utils/consts";
import prettifyAxiosError from "../utils/prettifyAxiosError";

export type DeploymentEntry = {
  chainKey: string;
  addressFormat: string;
  address: string;
  labels?: string[];
};

export type DeploymentFile = {
  namespace: string;
  description?: string;
  environment: "mainnet" | "testnet" | "devnet";
  deployments: DeploymentEntry[];
};

export type PublicDeployments = {
  version: { registryVersion: string; gitSha: string };
  deployments: DeploymentFile[];
};

export function usePublicDeployments(shouldFire: boolean) {
  const [result, setResult] = useState<null | {
    err?: string;
    data?: PublicDeployments;
  }>(null);
  useEffect(() => {
    if (!shouldFire) return;
    let cancelled = false;
    setResult(null);
    (async () => {
      try {
        const res = await axios.get<PublicDeployments>(
          `${REGISTRY_API_URL}/v1/public/deployments`,
        );
        if (!cancelled) {
          setResult({ data: res.data });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setResult({ err: prettifyAxiosError(e) });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shouldFire]);
  return result;
}
