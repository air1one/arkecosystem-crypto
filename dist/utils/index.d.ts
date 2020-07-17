import { ITransactionData } from "../interfaces";
import { Base58 } from "./base58";
import { BigNumber } from "./bignum";
import { calculateBlockTime, isNewBlockTime } from "./block-time-calculator";
import { isLocalHost, isValidPeer } from "./is-valid-peer";
/**
 * Get human readable string from satoshis
 */
export declare const formatSatoshi: (amount: BigNumber) => string;
/**
 * Check if the given block or transaction id is an exception.
 */
export declare const isIdException: (id: number | string | undefined) => boolean;
export declare const isException: (blockOrTransaction: {
    id?: string;
    transactions?: ITransactionData[];
}) => boolean;
export declare const isGenesisTransaction: (id: string) => boolean;
export declare const numberToHex: (num: number, padding?: number) => string;
export declare const maxVendorFieldLength: (height?: number | undefined) => number;
export declare const isSupportedTransactionVersion: (version: number) => boolean;
export { Base58, BigNumber, isValidPeer, isLocalHost, calculateBlockTime, isNewBlockTime };
