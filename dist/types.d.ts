import * as networks from "./networks";
export declare type NetworkType = typeof networks.mainnet.network | typeof networks.devnet.network | typeof networks.testnet.network;
export declare type NetworkName = keyof typeof networks;
