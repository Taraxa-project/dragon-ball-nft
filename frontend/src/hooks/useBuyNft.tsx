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
        const item = await ledgerContract.getSaleItem(BigNumber.from(tokenId));
        if (!item || !item.price) {
          setState({
            status: "Fail",
            error: "Failed to fetch NFT details or price is not set",
          });
          return;
        }
        const priceInWei = ethers.utils.parseUnits(
          item.price.toString(),
          "ether"
        );

        // Then, ensure the user has approved the contract to spend the tokens
        if (BigNumber.from(allowance).lt(priceInWei)) {
          // If not enough tokens are approved, prompt the user to approve them
          setState({ status: "Fail", error: "Not enough tokens" });
        }
        const approvalTx = await tokenContract.approve(
          ledgerContract.address,
          item.price
        );
        if (approvalTx instanceof Error) {
          throw approvalTx;
        }

        if (approvalTx) {
          approvalTx.wait();
          const tx = await ledgerContract.buyNFT(tokenId);
          setState({ status: "Mining", error: "" });
          await tx.wait();
          setState({ status: "Success", error: "" });
        }
      } catch (error: any) {
        console.error(error);
        setState({ status: "Fail", error: error.message });
      }
    },
    [ledgerContract, tokenContract, allowance, allowanceError]
  );

  return { buyNFT, state };
};
