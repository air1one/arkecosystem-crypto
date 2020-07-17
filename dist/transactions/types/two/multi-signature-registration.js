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
exports.MultiSignatureRegistrationTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const managers_1 = require("../../../managers");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class MultiSignatureRegistrationTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.multiSignature;
    }
    static staticFee(feeContext = {}) {
        var _a, _b;
        if ((_b = (_a = feeContext.data) === null || _a === void 0 ? void 0 : _a.asset) === null || _b === void 0 ? void 0 : _b.multiSignature) {
            return super.staticFee(feeContext).times(feeContext.data.asset.multiSignature.publicKeys.length + 1);
        }
        return super.staticFee(feeContext);
    }
    verify() {
        return managers_1.configManager.getMilestone().aip11 && super.verify();
    }
    serialize(options) {
        const { data } = this;
        const { min, publicKeys } = data.asset.multiSignature;
        const buffer = new bytebuffer_1.default(2 + publicKeys.length * 33);
        buffer.writeUint8(min);
        buffer.writeUint8(publicKeys.length);
        for (const publicKey of publicKeys) {
            buffer.append(publicKey, "hex");
        }
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        const multiSignature = { publicKeys: [], min: 0 };
        multiSignature.min = buf.readUint8();
        const count = buf.readUint8();
        for (let i = 0; i < count; i++) {
            const publicKey = buf.readBytes(33).toString("hex");
            multiSignature.publicKeys.push(publicKey);
        }
        data.asset = { multiSignature };
    }
}
exports.MultiSignatureRegistrationTransaction = MultiSignatureRegistrationTransaction;
MultiSignatureRegistrationTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
MultiSignatureRegistrationTransaction.type = enums_1.TransactionType.MultiSignature;
MultiSignatureRegistrationTransaction.key = "multiSignature";
MultiSignatureRegistrationTransaction.version = 2;
MultiSignatureRegistrationTransaction.defaultStaticFee = bignum_1.BigNumber.make("500000000");
//# sourceMappingURL=multi-signature-registration.js.map