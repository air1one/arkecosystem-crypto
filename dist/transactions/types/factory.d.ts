import { ITransaction, ITransactionData } from "../../interfaces";
import { InternalTransactionType } from "./internal-transaction-type";
import { Transaction } from "./transaction";
declare type TransactionConstructor = typeof Transaction;
export declare class TransactionTypeFactory {
    private static transactionTypes;
    static initialize(transactionTypes: Map<InternalTransactionType, Map<number, TransactionConstructor>>): void;
    static create(data: ITransactionData): ITransaction;
    static get(type: number, typeGroup?: number, version?: number): TransactionConstructor | undefined;
}
export {};
