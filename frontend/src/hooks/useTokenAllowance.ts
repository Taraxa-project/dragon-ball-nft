import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { useContracts } from "./useContracts";
import { ledgerAddress } from "../constants";

export const useTokenAllowance = () => {
  const { account } = useConnection();
  const { tokenContract } = useContracts();
  const [allowance, setAllowance] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAllowance = async (): Promise<number | null> => {
      try {
        if (tokenContract && account) {
          const allowanceAmount = await tokenContract.allowance(
            account,
            ledgerAddress
          );
          return allowanceAmount;
        }
        return null;
      } catch (error) {
        console.error(error);
        setError("Failed to retrieve allowance");
        return null;
      }
    };

    if (account) {
      fetchAllowance()
        .then((allowanceAmount) => {
          setAllowance(allowanceAmount);
        })
        .catch((error) => {
          console.log(error);
          setError("Error fetching allowance");
        });
    }
  }, [tokenContract, account]);

  return { allowance, error };
};
