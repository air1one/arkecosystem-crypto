import { IMultiSignatureAsset, ISchemaValidationResult, ITransactionData, IVerifyOptions } from "../interfaces";
export declare class Verifier {
    static verify(data: ITransactionData, options?: IVerifyOptions): boolean;
    static verifySecondSignature(transaction: ITransactionData, publicKey: string, options?: IVerifyOptions): boolean;
    static verifySignatures(transaction: ITransactionData, multiSignature: IMultiSignatureAsset): boolean;
    static verifyHash(data: ITransactionData, disableVersionCheck?: boolean): boolean;
    static verifySchema(data: ITransactionData, strict?: boolean): ISchemaValidationResult;
    private static internalVerifySignature;
}
