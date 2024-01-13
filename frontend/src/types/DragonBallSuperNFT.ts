import { MintedNFT } from "../hooks";

export interface DragonBallSuperNFT extends MintedNFT {
  name: string;
  message: string;
  fileUrl: string;
}
