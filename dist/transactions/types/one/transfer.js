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
exports.TransferTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const identities_1 = require("../../../identities");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class TransferTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.transfer;
    }
    hasVendorField() {
        return true;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(24, true);
        // @ts-ignore - The ByteBuffer types say we can't use strings but the code actually handles them.
        buffer.writeUint64(data.amount.toString());
        buffer.writeUint32(data.expiration || 0);
        if (data.recipientId) {
            const { addressBuffer, addressError } = identities_1.Address.toBuffer(data.recipientId);
            if (options) {
                options.addressError = addressError;
            }
            buffer.append(addressBuffer);
        }
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        data.amount = bignum_1.BigNumber.make(buf.readUint64().toString());
        data.expiration = buf.readUint32();
        data.recipientId = identities_1.Address.fromBuffer(buf.readBytes(21).toBuffer());
    }
}
exports.TransferTransaction = TransferTransaction;
TransferTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
TransferTransaction.type = enums_1.TransactionType.Transfer;
TransferTransaction.key = "transfer";
TransferTransaction.version = 1;
TransferTransaction.defaultStaticFee = bignum_1.BigNumber.make("10000000");
//# sourceMappingURL=transfer.js.map