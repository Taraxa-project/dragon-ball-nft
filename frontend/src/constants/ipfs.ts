import { Options, create } from "ipfs-http-client";
import { Buffer } from "buffer";

const ipfsSecret = `${process.env.REACT_APP_IPFS_SECRET}`;
const ipfsProject = `${process.env.REACT_APP_IPFS_PROJECT_ID}`;

const auth =
  "Basic " + Buffer.from(ipfsProject + ":" + ipfsSecret).toString("base64");

const ipfsHost = `${process.env.REACT_APP_IPFS_HOST}`;
const ipfsPort = process.env.REACT_APP_IPFS_PORT || 5002;
const ipfsProtocol = `${process.env.REACT_APP_IPFS_PROTOCOL}`;
const ipfsUseAuth = `${process.env.REACT_APP_IPFS_USE_AUTH}`;
const ipfsUrl = `${process.env.REACT_APP_IPFS_URL}`;
export const ipfsBaseUrl = `${process.env.REACT_APP_IPFS_BASE_URL}`;

let ipfsOptions: Options;
if (ipfsUrl) {
  ipfsOptions = {
    url: ipfsUrl,
  };
} else {
  ipfsOptions = {
    host: ipfsHost,
    port: +ipfsPort,
    protocol: ipfsProtocol,
  };
}

if (ipfsSecret && ipfsProject && ipfsUseAuth === "true") {
  ipfsOptions.headers = {
    auth,
  };
}
console.log("🚀 ~ ipfsOptions:", ipfsOptions);

export const ipfsClient = create(ipfsOptions);
