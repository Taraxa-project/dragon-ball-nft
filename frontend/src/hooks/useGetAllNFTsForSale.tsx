import { useEffect, useState } from "react";
import { useContracts } from "./useContracts";

export const useGetAllNFTsForSale = () => {
  const { ledgerContract } = useContracts();
  const [nftsForSale, setNftsForSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllNFTsForSale = async () => {
      if (!ledgerContract) {
        setError("Contract not available");
        setLoading(false);
        return;
      }
      try {
        const ids = await ledgerContract.getAllNFTsForSale();
        setNftsForSale(ids.map((id: number) => id));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch NFTs for sale");
      } finally {
        setLoading(false);
      }
    };

    fetchAllNFTsForSale();
  }, [ledgerContract]);

  return { nftsForSale, loading, error };
};
