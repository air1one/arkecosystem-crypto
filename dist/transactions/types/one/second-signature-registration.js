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
exports.SecondSignatureRegistrationTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class SecondSignatureRegistrationTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.secondSignature;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(33, true);
        if (data.asset && data.asset.signature) {
            buffer.append(data.asset.signature.publicKey, "hex");
        }
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        data.asset = {
            signature: {
                publicKey: buf.readBytes(33).toString("hex"),
            },
        };
    }
}
exports.SecondSignatureRegistrationTransaction = SecondSignatureRegistrationTransaction;
SecondSignatureRegistrationTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
SecondSignatureRegistrationTransaction.type = enums_1.TransactionType.SecondSignature;
SecondSignatureRegistrationTransaction.key = "secondSignature";
SecondSignatureRegistrationTransaction.version = 1;
SecondSignatureRegistrationTransaction.defaultStaticFee = bignum_1.BigNumber.make("500000000");
//# sourceMappingURL=second-signature-registration.js.map