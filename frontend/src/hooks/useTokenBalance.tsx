import { useEffect, useState, useCallback } from "react";
import { BigNumber, ethers } from "ethers";
import { useConnection } from "./useConnection";
import useChain from "./useChain";

const erc20Abi = [
  // Minimal ERC20 ABI
  "function balanceOf(address owner) view returns (uint256)",
];

export const useTokenBalance = (tokenAddress: string) => {
  const { account } = useConnection();
  const { provider } = useChain();
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [error, setError] = useState("");

  const fetchBalance = useCallback(async () => {
    if (!account || !tokenAddress || !provider) {
      setError("Account, token address, or provider not available");
      setBalance(null);
      return;
    }
    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20Abi,
        provider
      );
      const balance = await tokenContract.balanceOf(account);
      setBalance(balance);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch token balance");
      setBalance(null);
    }
  }, [account, tokenAddress, provider]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, error };
};
