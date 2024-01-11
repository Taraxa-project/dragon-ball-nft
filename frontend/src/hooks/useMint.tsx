import { useCallback, useState } from "react";
import { useContracts } from "./useContracts";

export const useMint = () => {
  const { ledgerContract } = useContracts();
  const [state, setState] = useState({ status: "None", error: "" });

  const mint = useCallback(
    async (url: string) => {
      if (!ledgerContract) {
        setState({ status: "Fail", error: "Contract not available" });
        return;
      }
      try {
        const tx = await ledgerContract.mint(url);
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

  return { mint, state };
};
