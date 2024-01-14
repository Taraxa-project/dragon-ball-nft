import { useCallback, useState } from "react";
import { useContracts } from "./useContracts";

export const useListNFTForSale = () => {
  const { ledgerContract } = useContracts();
  const [state, setState] = useState({ status: "None", error: "" });

  const listNFTForSale = useCallback(
    async (tokenId: number) => {
      if (!ledgerContract) {
        setState({ status: "Fail", error: "Contract not available" });
        return;
      }
      try {
        const tx = await ledgerContract.listNFTForSale(tokenId);
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

  return { listNFTForSale, state };
};
