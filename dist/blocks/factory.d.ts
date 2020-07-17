/// <reference types="node" />
import { GetBlockTimeStampLookup } from "../crypto";
import { IBlock, IBlockData, IBlockJson, IKeyPair } from "../interfaces";
export declare class BlockFactory {
    static make(data: any, keys: IKeyPair, getBlockTimeStampLookup: GetBlockTimeStampLookup): IBlock | undefined;
    static fromHex(hex: string, getBlockTimeStampLookup: GetBlockTimeStampLookup): IBlock;
    static fromBytes(buffer: Buffer, getBlockTimeStampLookup: GetBlockTimeStampLookup): IBlock;
    static fromJson(json: IBlockJson, getBlockTimeStampLookup: GetBlockTimeStampLookup): IBlock | undefined;
    static fromData(data: IBlockData, getBlockTimeStampLookup: GetBlockTimeStampLookup, options?: {
        deserializeTransactionsUnchecked?: boolean;
    }): IBlock | undefined;
    private static fromSerialized;
}
