import { useCallback, useState } from "react";
import { useContracts } from "./useContracts";
import { BigNumber } from "ethers";

export const useUpdateSalePrice = () => {
  const { ledgerContract } = useContracts();
  const [state, setState] = useState({ status: "None", error: "" });

  const updateSalePrice = useCallback(
    async (tokenId: number, newPriceInCommunityTokens: BigNumber) => {
      if (!ledgerContract) {
        setState({ status: "Fail", error: "Contract not available" });
        return;
      }
      try {
        const tx = await ledgerContract.updateSalePrice(
          tokenId,
          newPriceInCommunityTokens
        );
        setState({ status: "Mining", error: "" });
        await tx.wait();
        setState({ status: "Success", error: "" });
      } catch (error: any) {
        console.error(error);
        setState({ status: "Fail", error: error.message });
      }
    },
    [ledgerContract]
  );

  return { updateSalePrice, state };
};
