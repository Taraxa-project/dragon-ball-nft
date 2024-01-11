import { ethers } from "ethers";
import { useContracts } from "./useContracts";
import { useCallback } from "react";

export const useEnableMint = () => {
  const { ledgerContract } = useContracts();

  const setMintingStatus = useCallback(
    async (
      status: boolean
    ): Promise<ethers.providers.TransactionReceipt | Error> => {
      try {
        const tx: ethers.providers.TransactionResponse =
          await ledgerContract?.setMintingStatus(status);
        const response: ethers.providers.TransactionReceipt = await tx.wait();
        return response;
      } catch (error) {
        console.error(error);
        return error instanceof Error
          ? error
          : new Error("Unknown error during setMintingStatus");
      }
    },
    [ledgerContract]
  );
  return setMintingStatus;
};
