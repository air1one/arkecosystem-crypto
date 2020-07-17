/**
 * Based on: https://github.com/bitcoinjs/bip38 @ 8e3a2cc6f7391782f3012129924a73bb632a3d4d
 */
/// <reference types="node" />
import { IDecryptResult } from "../interfaces";
export declare const verify: (bip38: string) => boolean;
export declare const encrypt: (privateKey: Buffer, compressed: boolean, passphrase: string) => string;
export declare const decrypt: (bip38: string, passphrase: any) => IDecryptResult;
