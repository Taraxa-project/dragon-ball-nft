import { ethers } from "ethers";
import { useConnection } from "./useConnection";
import { useEffect, useState } from "react";
import { useContracts } from "./useContracts";

export const useMintedCount = () => {
  const { account } = useConnection();
  const { ledgerContract } = useContracts();
  const [mintedCount, setMintedCount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getMintedCount =
      async (): Promise<ethers.providers.TransactionReceipt> => {
        try {
          return ledgerContract
            ? await ledgerContract.getCurrentTokenId()
            : null;
        } catch (error: any) {
          console.error(error);
          setError("Failed to retrieve current token id");
          return error;
        }
      };
    if (account && ledgerContract) {
      getMintedCount()
        .then((response) => {
          if (response) {
            setMintedCount(parseInt(response.toString()));
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    }
  }, [ledgerContract, account]);

  return { mintedCount, error };
};
