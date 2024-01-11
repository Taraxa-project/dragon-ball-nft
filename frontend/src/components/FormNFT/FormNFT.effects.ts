/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { ipfsClient, tokenAddress } from "../../constants";
import {
  useMintItem,
  useMintPrice,
  useConnection,
  useTokenBalance,
} from "../../hooks";
import { BigNumber } from "ethers";

export interface IMintMetadata {
  name: string;
  message: string;
  fileUrl: string;
}

const FILE_MAX_SIZE = 5 * 1000 * 1024; // 5mb

export const useFormNFTEffects = () => {
  const { account } = useConnection();

  const [uploading, setIsUploading] = useState<boolean>(false);
  const [ipfsFileUrl, setIpfsFileUrl] = useState<string>("");
  const { state: mintState, send: mintSend } = useMintItem();
  const { mintPrice } = useMintPrice();
  const { balance } = useTokenBalance(tokenAddress);
  const [hasEnoughTokens, setHasEnoughTokens] = useState<boolean>();
  const [isMinting, setIsMinting] = useState(false);

  const defaultValues: IMintMetadata = {
    name: "",
    message: "",
    fileUrl: "",
  };

  const validationSchema = yup
    .object({
      name: yup.string().required("Name is required").label("Name"),
      message: yup.string().required("Message is required").label("Message"),
      fileUrl: yup.string().required("Image is required").label("File"),
    })
    .required();

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (balance && mintPrice !== undefined && mintPrice !== null) {
      setHasEnoughTokens(balance.gte(BigNumber.from(mintPrice)));
    }
  }, [account, mintPrice, balance]);

  useEffect(() => {
    setIsMinting(mintState.status === "Mining");
  }, [mintState]);

  const onSubmit = async (data: IMintMetadata) => {
    if (!ipfsFileUrl) {
      setError("fileUrl", {
        type: "manual",
        message: "Image not uploaded",
      });
      return;
    }
    const mintItem = {
      name: data.name,
      message: data.message,
      fileUrl: ipfsFileUrl,
    };
    const uploaded = await ipfsClient.add(JSON.stringify(mintItem));
    reset();
    return mintSend(`${uploaded.path}`);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) {
      setError("fileUrl", {
        type: "manual",
        message: "Image missing",
      });
      return;
    }

    if (file.size > FILE_MAX_SIZE) {
      setError("fileUrl", {
        type: "manual",
        message: "The image cannot be bigger than 5MB",
      });
      return;
    }
    setIsUploading(true);
    await uploadToIpfs(file);
  };

  const uploadToIpfs = async (file: File | undefined) => {
    if (!file) {
      return;
    }
    try {
      const uploaded = await ipfsClient.add(file);
      const url = `${uploaded.path}`;
      console.log("uploaded: ", uploaded);
      console.log("url: ", url);
      setIpfsFileUrl(url);
    } catch (error) {
      setError("fileUrl", {
        type: "manual",
        message: `${error}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    onFileChange,
    uploading,
    isMinting,
    hasEnoughTokens,
  };
};
