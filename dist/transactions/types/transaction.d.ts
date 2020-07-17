/// <reference types="node" />
import ByteBuffer from "bytebuffer";
import { ISchemaValidationResult, ISerializeOptions, ITransaction, ITransactionData, ITransactionJson } from "../../interfaces";
import { BigNumber } from "../../utils/bignum";
import { TransactionSchema } from "./schemas";
export declare abstract class Transaction implements ITransaction {
    static type: number | undefined;
    static typeGroup: number | undefined;
    static version: number;
    static key: string | undefined;
    protected static defaultStaticFee: BigNumber;
    isVerified: boolean;
    data: ITransactionData;
    serialized: Buffer;
    timestamp: number;
    static getSchema(): TransactionSchema;
    static staticFee(feeContext?: {
        height?: number;
        data?: ITransactionData;
    }): BigNumber;
    verify(options?: ISerializeOptions): boolean;
    verifySecondSignature(publicKey: string): boolean;
    verifySchema(): ISchemaValidationResult;
    toJson(): ITransactionJson;
    toString(): string;
    hasVendorField(): boolean;
    abstract serialize(): ByteBuffer | undefined;
    abstract deserialize(buf: ByteBuffer): void;
    get id(): string | undefined;
    get type(): number;
    get typeGroup(): number | undefined;
    get verified(): boolean;
    get key(): string;
    get staticFee(): BigNumber;
}
