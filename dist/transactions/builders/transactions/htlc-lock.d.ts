import { IHtlcLockAsset, ITransactionData } from "../../../interfaces";
import { TransactionBuilder } from "./transaction";
export declare class HtlcLockBuilder extends TransactionBuilder<HtlcLockBuilder> {
    constructor();
    htlcLockAsset(lockAsset: IHtlcLockAsset): HtlcLockBuilder;
    getStruct(): ITransactionData;
    expiration(expiration: number): HtlcLockBuilder;
    protected instance(): HtlcLockBuilder;
}
