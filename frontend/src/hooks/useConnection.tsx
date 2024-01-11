import { useEffect, useLayoutEffect, useState } from "react";
import { useMetaMask } from "metamask-react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  useIsomorphicLayoutEffect(() => {
    setIsConnected(status === "connected");
  }, [status]);

  return {
    isConnected,
    status,
    connect,
    account,
    chainId,
    ethereum,
  };
}
