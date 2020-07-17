"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPaymentTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const identities_1 = require("../../../identities");
const managers_1 = require("../../../managers");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class MultiPaymentTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.multiPayment;
    }
    verify() {
        return managers_1.configManager.getMilestone().aip11 && super.verify();
    }
    hasVendorField() {
        return true;
    }
    serialize(options = {}) {
        const { data } = this;
        if (data.asset && data.asset.payments) {
            const buffer = new bytebuffer_1.default(2 + data.asset.payments.length * 29, true);
            buffer.writeUint16(data.asset.payments.length);
            for (const payment of data.asset.payments) {
                // @ts-ignore - The ByteBuffer types say we can't use strings but the code actually handles them.
                buffer.writeUint64(payment.amount.toString());
                const { addressBuffer, addressError } = identities_1.Address.toBuffer(payment.recipientId);
                options.addressError = addressError || options.addressError;
                buffer.append(addressBuffer);
            }
            return buffer;
        }
        return undefined;
    }
    deserialize(buf) {
        const { data } = this;
        const payments = [];
        const total = buf.readUint16();
        for (let j = 0; j < total; j++) {
            payments.push({
                amount: bignum_1.BigNumber.make(buf.readUint64().toString()),
                recipientId: identities_1.Address.fromBuffer(buf.readBytes(21).toBuffer()),
            });
        }
        data.amount = bignum_1.BigNumber.ZERO;
        data.asset = { payments };
    }
}
exports.MultiPaymentTransaction = MultiPaymentTransaction;
MultiPaymentTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
MultiPaymentTransaction.type = enums_1.TransactionType.MultiPayment;
MultiPaymentTransaction.key = "multiPayment";
MultiPaymentTransaction.version = 2;
MultiPaymentTransaction.defaultStaticFee = bignum_1.BigNumber.make("10000000");
//# sourceMappingURL=multi-payment.js.map