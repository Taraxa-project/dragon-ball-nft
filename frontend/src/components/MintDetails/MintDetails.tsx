import React, { FC } from "react";
import { formatUnits } from "@ethersproject/units";
import { Box, Paper, Typography } from "@mui/material";
import { ledgerAddress } from "../../constants";
import { useMintedCount, useToken, useTokenBalance } from "../../hooks";
import gokuBlue from "../../assets/gokuBlue.png";
import dragonBall from "../../assets/4star.png";
import { useStyles } from "./MintDetails.styles";

export const MintDetails: FC = () => {
  const { mintedCount } = useMintedCount();
  const dbsTokenInfo = useToken();
  const { balance: dbsBalance } = useTokenBalance(ledgerAddress);
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {dbsBalance && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <img src={gokuBlue} width="40px" alt="logo" />
          <img src={dragonBall} width="40px" alt="logo" />
        </Box>
      )}
      {!!mintedCount && (
        <Typography>Minted DBS Cards: {mintedCount.toString()}</Typography>
      )}
    </Paper>
  );
};
