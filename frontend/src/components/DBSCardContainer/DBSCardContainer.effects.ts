import { useEffect, useState } from "react";
import { useTokenURI, useOwnerOf } from "../../hooks";
import { DragonBallSuperCard } from "../../types";
import { BigNumber } from "ethers";

export const useDBSCardContainerEffects = (tokenId: number) => {
  const [dbsCard, setDbsCard] = useState<DragonBallSuperCard>();
  const { tokenURI } = useTokenURI(BigNumber.from(tokenId));
  const { owner } = useOwnerOf(tokenId);

  useEffect(() => {
    if (tokenURI && owner) {
      setDbsCard({
        id: tokenId,
        uri: tokenURI || "",
        accountAddress: owner,
      });
    }
  }, [tokenURI, owner]);
  return dbsCard;
};
