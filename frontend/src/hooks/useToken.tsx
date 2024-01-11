import { useEffect, useState, useCallback } from "react";
import { useContracts } from "./useContracts";

export const useToken = () => {
  const { tokenContract } = useContracts();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [supply, setSupply] = useState(0);
  const [error, setError] = useState("");

  const fetchTokenDetails = useCallback(async () => {
    if (!tokenContract) {
      setError("Token contract not available");
      return;
    }
    try {
      const tokenName = await tokenContract.name();
      const tokenSymbol = await tokenContract.symbol();
      const tokenDecimals = await tokenContract.decimals();
      const tokenSupply = await tokenContract.totalSupply();
      setName(tokenName);
      setSymbol(tokenSymbol);
      setDecimals(tokenDecimals);
      setSupply(tokenSupply);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch token details");
    }
  }, [tokenContract]);

  useEffect(() => {
    fetchTokenDetails();
  }, [fetchTokenDetails]);

  return { name, symbol, decimals, supply, error };
};
