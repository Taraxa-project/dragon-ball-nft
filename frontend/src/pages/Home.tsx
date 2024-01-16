import { Box } from "@mui/material";
import React, { FC } from "react";
import { Hero, MintDetails, DBSCardList } from "../components";

export const Home: FC = () => {
  return (
    <div>
      <Hero />
      <Box sx={{ padding: "20px" }}>
        <MintDetails />
        <DBSCardList owner={false} />
      </Box>
    </div>
  );
};
