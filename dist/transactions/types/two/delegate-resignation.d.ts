import ByteBuffer from "bytebuffer";
import { ISerializeOptions } from "../../../interfaces";
import { BigNumber } from "../../../utils/bignum";
import * as schemas from "../schemas";
import { Transaction } from "../transaction";
export declare abstract class DelegateResignationTransaction extends Transaction {
    static typeGroup: number;
    static type: number;
    static key: string;
    static version: number;
    protected static defaultStaticFee: BigNumber;
    static getSchema(): schemas.TransactionSchema;
    verify(): boolean;
    serialize(options?: ISerializeOptions): ByteBuffer | undefined;
    deserialize(buf: ByteBuffer): void;
}
