import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  MintedNFT,
  useGetAllNFTsForSale,
  useGetNft,
  useMintedCount,
} from "../../hooks";
import { DBSCard } from "../DBSCard";

export const DBSCardList = ({ owner }: { owner: boolean }) => {
  const { mintedCount } = useMintedCount();
  const { nftsForSale } = useGetAllNFTsForSale();
  const fetchNft = useGetNft();
  const [nfts, setNfts] = useState<MintedNFT[]>([]);

  useEffect(() => {
    const array = owner ? Array.from(Array(mintedCount).keys()) : nftsForSale;
    const fetchAllNfts = async () => {
      const newNfts = await Promise.all(
        array.map(async (id) => {
          const fetched = await fetchNft(id);
          if (fetched) {
            return fetched;
          }
        })
      );
      const filteredNfts = newNfts.filter((nft) => nft !== undefined);
      if (filteredNfts.length > 0) {
        setNfts(filteredNfts as MintedNFT[]);
      }
    };
    if (array?.length > 0) {
      fetchAllNfts();
    }
  }, [nftsForSale, mintedCount]);

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
      {nfts.length === 0 ? (
        <Typography>There are no DBS cards minted yet</Typography>
      ) : (
        <div>
          <Typography
            variant="h2"
            color="secondary"
            fontWeight="bold"
            fontStyle="uppercase"
          >
            All available NFTs
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="start"
            gap="10px"
          >
            {nfts.map((nft: MintedNFT) => (
              <Box key={`dbs-card-container-${nft.tokenId}`}>
                <DBSCard {...nft} />
              </Box>
            ))}
          </Box>
        </div>
      )}
    </Paper>
  );
};
