import { useCallback, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useTokenAllowance } from "./useTokenAllowance";
import { useTokenApprove } from "./useTokenApprove";
import { useMintPrice } from "./useMintPrice";
import { useMint } from "./useMint";
import { ledgerAddress } from "../constants";

export const useMintItem = () => {
  const { allowance, error: allowanceError } = useTokenAllowance();
  const { mintPrice, error: mintPriceError } = useMintPrice();
  const approve = useTokenApprove();
  const { mint, state: mintState } = useMint();
  const [error, setError] = useState("");

  const send = useCallback(
    async (url: string) => {
      if (mintPriceError || allowanceError) {
        setError(mintPriceError || allowanceError);
        return;
      }
      if (allowance && mintPrice && BigNumber.from(allowance).lt(mintPrice)) {
        const approvalReceipt: ethers.providers.TransactionReceipt | Error =
          await approve(ledgerAddress, mintPrice);
        if (approvalReceipt) {
          mint(url);
        } else {
          setError("Approval failed");
        }
      } else {
        mint(url);
      }
    },
    [mint, approve, allowance, mintPrice, mintPriceError, allowanceError]
  );

  return { send, state: mintState, error };
};
