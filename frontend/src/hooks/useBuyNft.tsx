import { useCallback, useState } from "react";
import { useContracts } from "./useContracts";
import { BigNumber, ethers } from "ethers";
import { useTokenAllowance } from "./useTokenAllowance";

export const useBuyNFT = () => {
  const { ledgerContract, tokenContract } = useContracts();
  const [state, setState] = useState({ status: "None", error: "" });
  const { allowance, error: allowanceError } = useTokenAllowance();

  const buyNFT = useCallback(
    async (tokenId: number) => {
      if (!ledgerContract || !tokenContract) {
        setState({ status: "Fail", error: "Contracts not available" });
        return;
      }

      if (allowanceError) {
        setState({ status: "Fail", error: allowanceError });
        return;
      }

      try {
        // First, get the price of the NFT
        const item = await ledgerContract.getSaleItem(tokenId);
        const price = item.price;

        // Then, ensure the user has approved the contract to spend the tokens
        if (BigNumber.from(allowance).lt(price)) {
          // If not enough tokens are approved, prompt the user to approve them
          const approvalTx: ethers.providers.TransactionReceipt | Error =
            await tokenContract.approve(ledgerContract.address, price);
          if (approvalTx instanceof Error) {
            throw approvalTx;
          }
        }

        // Proceed to buy the NFT
        const tx = await ledgerContract.buyNFT(tokenId);
        setState({ status: "Mining", error: "" });
        await tx.wait();
        setState({ status: "Success", error: "" });
      } catch (error: any) {
        console.error(error);
        setState({ status: "Fail", error: error.message });
      }
    },
    [ledgerContract, tokenContract]
  );

  return { buyNFT, state };
};
