import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useConnection } from "./useConnection";
import { useContracts } from "./useContracts";

export const useTokenURI = (tokenIndex: BigNumber) => {
  const { account } = useConnection();
  const { ledgerContract } = useContracts();
  const [tokenURI, setTokenURI] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTokenURI = async (): Promise<string | null> => {
      try {
        if (ledgerContract && tokenIndex !== null && tokenIndex !== undefined) {
          const uri = await ledgerContract.tokenURI(tokenIndex);
          return uri;
        }
        return null;
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve token URI");
        return null;
      }
    };

    if (account) {
      fetchTokenURI()
        .then((uri) => {
          setTokenURI(uri);
        })
        .catch((error) => {
          console.log(error);
          setError("Error fetching token URI");
        });
    }
  }, [ledgerContract, tokenIndex, account]);

  return { tokenURI, error };
};
