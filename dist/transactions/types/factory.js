"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypeFactory = void 0;
const errors_1 = require("../../errors");
const internal_transaction_type_1 = require("./internal-transaction-type");
class TransactionTypeFactory {
    static initialize(transactionTypes) {
        this.transactionTypes = transactionTypes;
    }
    static create(data) {
        const instance = new (this.get(data.type, data.typeGroup, data.version))();
        instance.data = data;
        instance.data.version = data.version || 1;
        return instance;
    }
    static get(type, typeGroup, version) {
        var _a;
        const internalType = internal_transaction_type_1.InternalTransactionType.from(type, typeGroup);
        if (!this.transactionTypes.has(internalType)) {
            throw new errors_1.UnkownTransactionError(internalType.toString());
        }
        // Either there is a match for the provided version or use the first available constructor as a fallback
        const constructor = (_a = this.transactionTypes
            .get(internalType)) === null || _a === void 0 ? void 0 : _a.get(version || 1);
        return constructor !== null && constructor !== void 0 ? constructor : [...this.transactionTypes.get(internalType).values()][0];
    }
}
exports.TransactionTypeFactory = TransactionTypeFactory;
//# sourceMappingURL=factory.js.map