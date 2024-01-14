import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { DragonBallSuperNFT } from "../../types";
import { useStyles } from "./DBSCard.styles";
import { fullIpfsUrl, shortenAddress } from "../../utils";
import {
  MintedNFT,
  useBuyNFT,
  useConnection,
  useListNFTForSale,
  useToken,
  useTokenURI,
} from "../../hooks";
import { BigNumber, utils } from "ethers";

export const DBSCard: FC<MintedNFT> = ({
  tokenId,
  seller,
  price,
  forSale,
}: MintedNFT) => {
  const [dbsNft, setDbsNft] = useState<DragonBallSuperNFT>();
  const { tokenURI } = useTokenURI(BigNumber.from(tokenId));
  const classes = useStyles();
  const dbsTokenInfo = useToken();
  const { account } = useConnection();
  const isNotOwner = account?.toLowerCase() !== seller.toLowerCase();
  const { buyNFT, state } = useBuyNFT();
  const { listNFTForSale } = useListNFTForSale();

  useEffect(() => {
    const fetchUri = async () => {
      if (tokenURI) {
        const fullUrl = fullIpfsUrl(tokenURI);
        const result = await fetch(fullUrl);
        const nftResult = await result.json();
        setDbsNft({
          ...nftResult,
          price,
          forSale,
          fileUrl: fullIpfsUrl(nftResult.fileUrl),
        });
      }
    };
    fetchUri();
  }, [tokenURI]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      my={4}
    >
      <Card sx={{ width: 440 }}>
        {dbsNft?.fileUrl && (
          <CardMedia
            className={classes.media}
            component="img"
            image={dbsNft?.fileUrl}
          />
        )}
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="div">
            {dbsNft?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dbsNft?.message}
          </Typography>
          {dbsTokenInfo && dbsNft?.price && (
            <Typography variant="body2" color="text.secondary">
              Price {utils.formatEther(dbsNft.price.toString())}{" "}
              {dbsTokenInfo.symbol}
            </Typography>
          )}
          {seller && (
            <Typography
              gutterBottom
              variant="body2"
              color="primary"
              component="div"
            >
              Owned by {shortenAddress(seller)}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {isNotOwner && tokenId && forSale && (
            <Box>
              <Button
                variant="contained"
                type="button"
                color="secondary"
                onClick={() => {
                  buyNFT(tokenId);
                }}
              >
                Buy
              </Button>
            </Box>
          )}
          {!isNotOwner && tokenId && !forSale && (
            <Box>
              <Button
                variant="contained"
                type="button"
                color="secondary"
                onClick={() => {
                  listNFTForSale(tokenId);
                }}
              >
                List for Sale
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
