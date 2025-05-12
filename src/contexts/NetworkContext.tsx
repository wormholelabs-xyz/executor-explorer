import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

type Env = "Mainnet" | "Testnet";

type NetworkContextValue = {
  currentEnv: Env;
  currentNetwork: string;
  setCurrentEnv: (env: Env) => void;
  setCurrentNetwork: (network: string) => void;
};

const defaultEnv = "Mainnet";
const defaultNetwork = "";
const urlParamEnvKey = "env";
const urlParamNetworkKey = "endpoint";

const NetworkContext = React.createContext<NetworkContextValue>({
  currentEnv: defaultEnv,
  currentNetwork: defaultNetwork,
  setCurrentEnv: () => {},
  setCurrentNetwork: () => {},
});

const coalesceEnv = (s: string | null): Env =>
  s === "Mainnet" || s === "Testnet" ? s : defaultEnv;

export const NetworkContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { push, replace } = useHistory();
  const { search } = useLocation();
  const { urlParams, urlEnv, urlNetwork, currentEnv, currentNetwork } =
    useMemo(() => {
      const urlParams = new URLSearchParams(search);
      const urlEnv = urlParams.get(urlParamEnvKey);
      const urlNetwork = urlParams.get(urlParamNetworkKey);
      const currentEnv = coalesceEnv(urlEnv);
      const currentNetwork = urlNetwork || defaultNetwork;
      return { urlParams, urlEnv, urlNetwork, currentEnv, currentNetwork };
    }, [search]);
  const setCurrentEnv = useCallback(
    (env: Env, shouldReplace?: boolean) => {
      if (urlEnv !== env) {
        urlParams.set(urlParamEnvKey, env);
        if (shouldReplace) {
          replace({ search: urlParams.toString() });
        } else {
          console.log(urlParams.toString());
          push({ search: urlParams.toString() });
        }
      }
    },
    [urlEnv, urlParams, replace, push],
  );
  const setCurrentNetwork = useCallback(
    (network: string, shouldReplace?: boolean) => {
      if (urlNetwork !== network) {
        urlParams.set(urlParamNetworkKey, network);
        if (shouldReplace) {
          replace({ search: urlParams.toString() });
        } else {
          console.log(urlParams.toString());
          push({ search: urlParams.toString() });
        }
      }
    },
    [urlNetwork, urlParams, replace, push],
  );
  useEffect(() => {
    // sync initial / bad param with drop down, this will do nothing when the current env matches
    setCurrentEnv(currentEnv, true);
  }, [currentEnv, setCurrentEnv]);
  useEffect(() => {
    // sync initial / bad param with drop down, this will do nothing when the current network matches
    setCurrentNetwork(currentNetwork, true);
  }, [currentNetwork, setCurrentNetwork]);
  const value = useMemo(
    () => ({ currentEnv, currentNetwork, setCurrentEnv, setCurrentNetwork }),
    [currentEnv, currentNetwork, setCurrentEnv, setCurrentNetwork],
  );
  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
