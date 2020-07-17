export declare class InternalTransactionType {
    readonly type: number;
    readonly typeGroup: number;
    private static types;
    private constructor();
    static from(type: number, typeGroup?: number): InternalTransactionType;
    toString(): string;
}
