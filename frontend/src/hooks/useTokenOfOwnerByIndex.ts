import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { useContracts } from "./useContracts";

export const useTokenOfOwnerByIndex = () => {
  const { account } = useConnection();
  const { ledgerContract } = useContracts();
  const [tokenOfOwnerByIndex, setTokenOfOwnerByIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTokenOfOwnerByIndex = async (): Promise<number | null> => {
      try {
        if (ledgerContract && account) {
          const tokenIndex = await ledgerContract.tokenOfOwnerByIndex(
            account,
            0
          );
          return tokenIndex;
        }
        return null;
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve token of owner by index");
        return null;
      }
    };

    if (account) {
      fetchTokenOfOwnerByIndex()
        .then((tokenIndex) => {
          setTokenOfOwnerByIndex(tokenIndex);
        })
        .catch((error) => {
          console.log(error);
          setError("Error fetching token of owner by index");
        });
    }
  }, [ledgerContract, account]);

  return { tokenOfOwnerByIndex, error };
};
