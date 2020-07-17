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
exports.DelegateRegistrationTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class DelegateRegistrationTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.delegateRegistration;
    }
    serialize(options) {
        const { data } = this;
        if (data.asset && data.asset.delegate) {
            const delegateBytes = Buffer.from(data.asset.delegate.username, "utf8");
            const buffer = new bytebuffer_1.default(delegateBytes.length, true);
            buffer.writeByte(delegateBytes.length);
            buffer.append(delegateBytes, "hex");
            return buffer;
        }
        return undefined;
    }
    deserialize(buf) {
        const { data } = this;
        const usernamelength = buf.readUint8();
        data.asset = {
            delegate: {
                username: buf.readString(usernamelength),
            },
        };
    }
}
exports.DelegateRegistrationTransaction = DelegateRegistrationTransaction;
DelegateRegistrationTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
DelegateRegistrationTransaction.type = enums_1.TransactionType.DelegateRegistration;
DelegateRegistrationTransaction.key = "delegateRegistration";
DelegateRegistrationTransaction.version = 1;
DelegateRegistrationTransaction.defaultStaticFee = bignum_1.BigNumber.make("2500000000");
//# sourceMappingURL=delegate-registration.js.map