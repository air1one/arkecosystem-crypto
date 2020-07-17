import { GetBlockTimeStampLookup } from "../crypto";
import { IBlock, IBlockData, IBlockJson, IBlockVerification, ITransaction } from "../interfaces";
export declare class Block implements IBlock {
    private getBlockTimeStampLookup;
    serialized: string;
    data: IBlockData;
    transactions: ITransaction[];
    verification: IBlockVerification;
    constructor({ data, transactions, id }: {
        data: IBlockData;
        transactions: ITransaction[];
        id?: string;
    }, getBlockTimeStampLookup: GetBlockTimeStampLookup);
    static applySchema(data: IBlockData): IBlockData | undefined;
    static getIdHex(data: IBlockData): string;
    static toBytesHex(data: any): string;
    static getId(data: IBlockData): string;
    getHeader(): IBlockData;
    verifySignature(): boolean;
    toJson(): IBlockJson;
    verify(): IBlockVerification;
    private applyGenesisBlockFix;
}
