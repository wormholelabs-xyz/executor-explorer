import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

type NetworkContextValue = {
  currentNetwork: string;
  setCurrentNetwork: (network: string) => void;
};

const defaultNetwork = "";
const urlParamKey = "endpoint";

const NetworkContext = React.createContext<NetworkContextValue>({
  currentNetwork: defaultNetwork,
  setCurrentNetwork: () => {},
});

export const NetworkContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { push, replace } = useHistory();
  const { search } = useLocation();
  const { urlParams, urlNetwork, currentNetwork } = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    const urlNetwork = urlParams.get(urlParamKey);
    const currentNetwork = urlNetwork || defaultNetwork;
    return { urlParams, urlNetwork, currentNetwork };
  }, [search]);
  const setCurrentNetwork = useCallback(
    (network: string, shouldReplace?: boolean) => {
      if (urlNetwork !== network) {
        urlParams.set(urlParamKey, network);
        if (shouldReplace) {
          replace({ search: urlParams.toString() });
        } else {
          console.log(urlParams.toString());
          push({ search: urlParams.toString() });
        }
      }
    },
    [urlNetwork, urlParams, replace, push]
  );
  useEffect(() => {
    // sync initial / bad param with drop down, this will do nothing when the current network matches
    setCurrentNetwork(currentNetwork, true);
  }, [currentNetwork, setCurrentNetwork]);
  const value = useMemo(
    () => ({ currentNetwork, setCurrentNetwork }),
    [currentNetwork, setCurrentNetwork]
  );
  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
