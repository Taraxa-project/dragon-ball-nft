import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { useContracts } from "./useContracts";

export const useMintPrice = () => {
  const { account } = useConnection();
  const { ledgerContract } = useContracts();
  const [mintPrice, setMintPrice] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMintPrice = async (): Promise<number | null> => {
      try {
        // Assuming mintPrice is a public variable or getter function in your contract
        return ledgerContract ? await ledgerContract.mintPrice() : null;
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve mint price");
        return null;
      }
    };

    if (account && ledgerContract) {
      fetchMintPrice()
        .then((price) => {
          if (price !== null) {
            setMintPrice(price);
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Error fetching mint price");
        });
    }
  }, [ledgerContract, account]);

  return { mintPrice, error };
};
