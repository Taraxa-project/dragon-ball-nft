import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import useChain from "./useChain";

export const useTaraBalance = () => {
  const { account } = useConnection();
  const { provider } = useChain();
  const [balance, setBalance] = useState("0");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account || !provider) {
        setError("Account or provider not available");
        return;
      }
      try {
        const balance = await provider.getBalance(account);
        setBalance(balance.toString());
      } catch (error) {
        console.error(error);
        setError("Failed to fetch TARA balance");
      }
    };

    fetchBalance();
  }, [account, provider]);

  return { balance, error };
};
