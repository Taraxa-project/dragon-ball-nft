import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { useContracts } from "./useContracts";

export const useMintEnabled = () => {
  const { account } = useConnection();
  const { ledgerContract } = useContracts();
  const [mintEnabled, setMintEnabled] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getMintEnabled = async (): Promise<boolean> => {
      try {
        return ledgerContract ? await ledgerContract.mintEnabled() : false;
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve mint enabled status");
        return false;
      }
    };

    if (account && ledgerContract) {
      getMintEnabled()
        .then(setMintEnabled)
        .catch((error) => {
          console.log(error);
          setError("Error fetching mint enabled status");
        });
    }
  }, [ledgerContract, account]);

  return { mintEnabled, error };
};
