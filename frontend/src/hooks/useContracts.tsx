import { useMemo } from "react";
import { ethers } from "ethers";
import DragonBallSuperLedger from "../abi/DragonBallSuperLedger.json";
import DragonBallSuperToken from "../abi/DragonBallSuperToken.json";
import { ledgerAddress, tokenAddress } from "../constants";

import useChain from "./useChain";

export function useContracts() {
  const { provider, signer } = useChain();
  const { abi: ledgerABI } = DragonBallSuperLedger as any;
  const { abi: tokenABI } = DragonBallSuperToken as any;

  const ledgerContract = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!provider || !signer) {
      return instance;
    }
    const contract = new ethers.Contract(ledgerAddress, ledgerABI, provider);
    return contract.connect(signer);
  }, [ledgerABI, provider, signer]);

  const tokenContract = useMemo(() => {
    let instance: ethers.Contract | undefined;

    if (!provider || !signer) {
      return instance;
    }
    const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
    return contract.connect(signer);
  }, [tokenABI, provider, signer]);

  return {
    ledgerContract,
    tokenContract,
  };
}
