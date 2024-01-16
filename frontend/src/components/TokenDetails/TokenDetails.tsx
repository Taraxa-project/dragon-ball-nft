import React, { FC, useEffect, useState, useRef } from "react";
import {
  useMintedCount,
  useConnection,
  useTokenBalance,
  useToken,
  useTaraBalance,
} from "../../hooks";
import { Box, Typography } from "@mui/material";
import { tokenAddress, ledgerAddress } from "../../constants";
import { formatUnits } from "@ethersproject/units";

export const TokenDetails: FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const mountedRef = useRef(true);

  const { account } = useConnection();
  const dbsTokenInfo = useToken();

  const { balance: tokenBalance } = useTokenBalance(tokenAddress);
  const { balance: userBalance } = useTaraBalance();
  const { balance: nftBalance } = useTokenBalance(ledgerAddress);
  const { mintedCount } = useMintedCount();

  useEffect(() => {
    setIsConnected(account !== undefined);

    return () => {
      mountedRef.current = false;
    };
  }, [account]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "20px",
        alignItems: "center",
      }}
      mt={10}
      mb={10}
    >
      {isConnected && (
        <>
          {tokenBalance && (
            <Typography>
              Token Balance: {formatUnits(tokenBalance, 18)}
            </Typography>
          )}
          {nftBalance && (
            <Typography>NFT Balance: {formatUnits(nftBalance, 18)}</Typography>
          )}
          {userBalance && (
            <Typography>
              User TARA Balance:{" "}
              {Number(formatUnits(userBalance, 18))
                .toPrecision(6)
                .replace(/0+$/, "")}
            </Typography>
          )}

          {!!mintedCount && (
            <Typography>Mint count: {mintedCount.toString()}</Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
              gap: "20px",
              alignItems: "center",
            }}
          ></Box>
        </>
      )}

      {dbsTokenInfo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Typography>DBS name: {dbsTokenInfo.name}</Typography>
          <Typography>DBS symbol: {dbsTokenInfo.symbol}</Typography>
          <Typography>DBS decimals: {dbsTokenInfo.decimals}</Typography>
          <Typography>
            DBS totalSupply:{" "}
            {dbsTokenInfo?.supply
              ? formatUnits(dbsTokenInfo?.supply, dbsTokenInfo?.decimals)
              : ""}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
