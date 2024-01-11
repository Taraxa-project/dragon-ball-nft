import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { DragonBallSuperCard, DragonBallSuperNFT } from "../../types";
import { useStyles } from "./DBSCard.styles";
import { fullIpfsUrl, shortenAddress } from "../../utils";

export const DBSCard: FC<DragonBallSuperCard> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  uri,
  accountAddress,
}) => {
  const [dbsNft, setDbsNft] = useState<DragonBallSuperNFT>();
  const classes = useStyles();

  useEffect(() => {
    const fetchUri = async () => {
      const fullUrl = fullIpfsUrl(uri);
      const result = await fetch(fullUrl);
      const nftResult = await result.json();
      setDbsNft({
        ...nftResult,
        fileUrl: fullIpfsUrl(nftResult.fileUrl),
      });
    };
    fetchUri();
  }, [uri]);

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
        </CardContent>
        <CardActions>
          {accountAddress && (
            <Typography
              gutterBottom
              variant="body2"
              color="primary"
              component="div"
            >
              Owned by {shortenAddress(accountAddress)}
            </Typography>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
