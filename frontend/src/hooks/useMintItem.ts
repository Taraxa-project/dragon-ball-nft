import { useCallback, useState } from "react";
import { useTokenAllowance } from "./useTokenAllowance";
import { useTokenApprove } from "./useTokenApprove";
import { useMint } from "./useMint";

export const useMintItem = () => {
  const { allowance, error: allowanceError } = useTokenAllowance();
  const approve = useTokenApprove();
  const { mint, state: mintState } = useMint();
  const [error, setError] = useState("");

  const send = useCallback(
    async (url: string, price: number, listForSale: boolean) => {
      if (allowanceError) {
        setError(allowanceError);
        return;
      }
      // if (allowance) {
      //   const approvalReceipt: ethers.providers.TransactionReceipt | Error =
      //     await approve(ledgerAddress, mintPrice);
      //   if (approvalReceipt) {
      //     mint(url, price, listForSale);
      //   } else {
      //     setError("Approval failed");
      //   }
      // } else {
      mint(url, price, listForSale);
      // }
    },
    [mint, approve, allowance, allowanceError]
  );

  return { send, state: mintState, error };
};
