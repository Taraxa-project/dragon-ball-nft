import { useEffect, useState } from "react";
import {
  useTokenURI,
  useTokenOfOwnerByIndex,
  useConnection,
} from "../../hooks";
import { DragonBallSuperCard } from "../../types";
import { BigNumber } from "ethers";

export const useMintEffects = () => {
  const { account } = useConnection();
  const [dbsCard, setDbsCard] = useState<DragonBallSuperCard>();
  const { tokenOfOwnerByIndex } = useTokenOfOwnerByIndex();
  const { tokenURI } = useTokenURI(BigNumber.from(tokenOfOwnerByIndex || 0));

  useEffect(() => {
    if (tokenURI && account && tokenOfOwnerByIndex) {
      setDbsCard({
        id: tokenOfOwnerByIndex,
        uri: tokenURI || "",
        accountAddress: account,
      });
    }
  }, [tokenURI, account]);
  return dbsCard;
};
