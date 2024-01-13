import { useContracts } from "./useContracts";

export interface MintedNFT {
  tokenId: number;
  seller: string;
  price: number;
  forSale: boolean;
}
export const useGetNft = () => {
  const { ledgerContract } = useContracts();

  const fetchNft = async (tokenId: number) => {
    if (!ledgerContract || tokenId === null || tokenId === undefined) {
      return;
    }

    try {
      const nft = await ledgerContract.getSaleItem(tokenId);
      const mintedNft: MintedNFT = {
        tokenId: nft.tokenId,
        seller: nft.seller,
        price: nft.price,
        forSale: nft.forSale,
      };
      return mintedNft;
    } catch (err) {
      console.error(err);
    }
  };

  return fetchNft;
};
