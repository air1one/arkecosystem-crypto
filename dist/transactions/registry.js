"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRegistry = void 0;
const errors_1 = require("../errors");
const validation_1 = require("../validation");
const types_1 = require("./types");
const internal_transaction_type_1 = require("./types/internal-transaction-type");
class TransactionRegistry {
    constructor() {
        this.transactionTypes = new Map();
        types_1.TransactionTypeFactory.initialize(this.transactionTypes);
        this.registerTransactionType(types_1.One.TransferTransaction);
        this.registerTransactionType(types_1.Two.TransferTransaction);
        this.registerTransactionType(types_1.One.SecondSignatureRegistrationTransaction);
        this.registerTransactionType(types_1.Two.SecondSignatureRegistrationTransaction);
        this.registerTransactionType(types_1.One.DelegateRegistrationTransaction);
        this.registerTransactionType(types_1.Two.DelegateRegistrationTransaction);
        this.registerTransactionType(types_1.One.VoteTransaction);
        this.registerTransactionType(types_1.Two.VoteTransaction);
        this.registerTransactionType(types_1.One.MultiSignatureRegistrationTransaction);
        this.registerTransactionType(types_1.Two.MultiSignatureRegistrationTransaction);
        this.registerTransactionType(types_1.Two.IpfsTransaction);
        this.registerTransactionType(types_1.Two.MultiPaymentTransaction);
        this.registerTransactionType(types_1.Two.DelegateResignationTransaction);
        this.registerTransactionType(types_1.Two.HtlcLockTransaction);
        this.registerTransactionType(types_1.Two.HtlcClaimTransaction);
        this.registerTransactionType(types_1.Two.HtlcRefundTransaction);
    }
    registerTransactionType(constructor) {
        var _a;
        const { typeGroup, type } = constructor;
        if (typeof type === "undefined" || typeof typeGroup === "undefined") {
            throw new Error();
        }
        const internalType = internal_transaction_type_1.InternalTransactionType.from(type, typeGroup);
        for (const registeredConstructors of this.transactionTypes.values()) {
            if (registeredConstructors.size) {
                const first = [...registeredConstructors.values()][0];
                if (first.key === constructor.key &&
                    internal_transaction_type_1.InternalTransactionType.from(first.type, first.typeGroup) !== internalType) {
                    throw new errors_1.TransactionKeyAlreadyRegisteredError(first.key);
                }
                for (const registeredConstructor of registeredConstructors.values()) {
                    if (registeredConstructor === constructor) {
                        throw new errors_1.TransactionAlreadyRegisteredError(constructor.name);
                    }
                }
            }
        }
        if (!this.transactionTypes.has(internalType)) {
            this.transactionTypes.set(internalType, new Map());
        }
        else if ((_a = this.transactionTypes.get(internalType)) === null || _a === void 0 ? void 0 : _a.has(constructor.version)) {
            throw new errors_1.TransactionVersionAlreadyRegisteredError(constructor.name, constructor.version);
        }
        this.transactionTypes.get(internalType).set(constructor.version, constructor);
        this.updateSchemas(constructor);
    }
    deregisterTransactionType(constructor) {
        const { typeGroup, type, version } = constructor;
        if (typeof type === "undefined" || typeof typeGroup === "undefined") {
            throw new Error();
        }
        const internalType = internal_transaction_type_1.InternalTransactionType.from(type, typeGroup);
        if (!this.transactionTypes.has(internalType)) {
            throw new errors_1.UnkownTransactionError(internalType.toString());
        }
        this.updateSchemas(constructor, true);
        const constructors = this.transactionTypes.get(internalType);
        if (!constructors.has(version)) {
            throw new errors_1.UnkownTransactionError(internalType.toString());
        }
        constructors.delete(version);
        if (constructors.size === 0) {
            this.transactionTypes.delete(internalType);
        }
    }
    updateSchemas(transaction, remove) {
        validation_1.validator.extendTransaction(transaction.getSchema(), remove);
    }
}
exports.transactionRegistry = new TransactionRegistry();
//# sourceMappingURL=registry.js.map