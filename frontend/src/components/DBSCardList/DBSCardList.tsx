import { Box, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { useMintedCount } from "../../hooks";
import { DBSCardContainer } from "../DBSCardContainer";

export const DBSCardList: FC = () => {
  const { mintedCount } = useMintedCount();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        padding: "40px",
      }}
    >
      {!mintedCount ? (
        <Typography>There are no DBS cards minted yet</Typography>
      ) : (
        <div>
          <Typography>All the minted NFTs</Typography>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="start"
            gap="10px"
          >
            {Array.from(Array(mintedCount).keys()).map((tokenIndex: number) => (
              <Box key={`dbs-card-container-${tokenIndex}`}>
                <DBSCardContainer tokenIndex={tokenIndex} />
              </Box>
            ))}
          </Box>
        </div>
      )}
    </Paper>
  );
};
