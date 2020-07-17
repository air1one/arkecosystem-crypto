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
exports.HtlcLockTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const identities_1 = require("../../../identities");
const managers_1 = require("../../../managers");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class HtlcLockTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.htlcLock;
    }
    verify() {
        const milestone = managers_1.configManager.getMilestone();
        return milestone.aip11 === true && milestone.htlcEnabled === true && super.verify();
    }
    hasVendorField() {
        return true;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(8 + 32 + 1 + 4 + 21, true);
        // @ts-ignore - The ByteBuffer types say we can't use strings but the code actually handles them.
        buffer.writeUint64(data.amount.toString());
        if (data.asset && data.asset.lock) {
            buffer.append(Buffer.from(data.asset.lock.secretHash, "hex"));
            buffer.writeUint8(data.asset.lock.expiration.type);
            buffer.writeUint32(data.asset.lock.expiration.value);
        }
        if (data.recipientId) {
            buffer.append(identities_1.Address.toBuffer(data.recipientId).addressBuffer);
        }
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        const amount = bignum_1.BigNumber.make(buf.readUint64().toString());
        const secretHash = buf.readBytes(32).toString("hex");
        const expirationType = buf.readUint8();
        const expirationValue = buf.readUint32();
        const recipientId = identities_1.Address.fromBuffer(buf.readBytes(21).toBuffer());
        data.amount = amount;
        data.recipientId = recipientId;
        data.asset = {
            lock: {
                secretHash,
                expiration: {
                    type: expirationType,
                    value: expirationValue,
                },
            },
        };
    }
}
exports.HtlcLockTransaction = HtlcLockTransaction;
HtlcLockTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
HtlcLockTransaction.type = enums_1.TransactionType.HtlcLock;
HtlcLockTransaction.key = "htlcLock";
HtlcLockTransaction.version = 2;
HtlcLockTransaction.defaultStaticFee = bignum_1.BigNumber.make("10000000");
//# sourceMappingURL=htlc-lock.js.map