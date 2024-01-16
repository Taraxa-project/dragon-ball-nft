import React, { FC } from "react";
import { DBSCardList, MintContainer, TokenDetails } from "../components";

export const Admin: FC = () => {
  return (
    <>
      <TokenDetails />
      <MintContainer />
      <DBSCardList owner={true} />
    </>
  );
};
