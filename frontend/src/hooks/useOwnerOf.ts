import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { useContracts } from "./useContracts";

export const useOwnerOf = (tokenIndex: number) => {
  const { account } = useConnection();
  const { ledgerContract } = useContracts();
  const [owner, setOwner] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOwner = async (): Promise<string | null> => {
      try {
        if (ledgerContract && tokenIndex !== null && tokenIndex !== undefined) {
          const ownerAddress = await ledgerContract.ownerOf(tokenIndex);
          return ownerAddress;
        }
        return null;
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve token owner");
        return null;
      }
    };

    if (account) {
      fetchOwner()
        .then((ownerAddress) => {
          setOwner(ownerAddress);
        })
        .catch((error) => {
          console.log(error);
          setError("Error fetching token owner");
        });
    }
  }, [ledgerContract, account, tokenIndex]);

  return { owner, error };
};
