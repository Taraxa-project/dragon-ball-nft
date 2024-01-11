import { ethers } from "ethers";
import { useContracts } from "./useContracts";
import { useCallback } from "react";

export const useTokenApprove = () => {
  const { tokenContract } = useContracts();

  const approve = useCallback(
    async (
      spender: string,
      amount: ethers.BigNumberish
    ): Promise<ethers.providers.TransactionReceipt | Error> => {
      try {
        const tx: ethers.providers.TransactionResponse =
          await tokenContract!.approve(spender, amount);
        const receipt: ethers.providers.TransactionReceipt = await tx.wait();
        return receipt;
      } catch (error) {
        console.error(error);
        return error instanceof Error
          ? error
          : new Error("Unknown error during approve");
      }
    },
    [tokenContract]
  );

  return approve;
};
