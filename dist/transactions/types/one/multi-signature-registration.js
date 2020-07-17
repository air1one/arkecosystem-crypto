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
const utils_1 = require("../../../utils");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class MultiSignatureRegistrationTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.multiSignatureLegacy;
    }
    static staticFee(feeContext = {}) {
        var _a, _b;
        if ((_b = (_a = feeContext.data) === null || _a === void 0 ? void 0 : _a.asset) === null || _b === void 0 ? void 0 : _b.multiSignatureLegacy) {
            return super.staticFee(feeContext).times(feeContext.data.asset.multiSignatureLegacy.keysgroup.length + 1);
        }
        return super.staticFee(feeContext);
    }
    verify() {
        return utils_1.isException(this.data);
    }
    serialize(options) {
        const { data } = this;
        const legacyAsset = data.asset.multiSignatureLegacy;
        const joined = legacyAsset.keysgroup.map((k) => (k.startsWith("+") ? k.slice(1) : k)).join("");
        const keysgroupBuffer = Buffer.from(joined, "hex");
        const buffer = new bytebuffer_1.default(keysgroupBuffer.length + 3, true);
        buffer.writeByte(legacyAsset.min);
        buffer.writeByte(legacyAsset.keysgroup.length);
        buffer.writeByte(legacyAsset.lifetime);
        buffer.append(keysgroupBuffer, "hex");
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        const multiSignatureLegacy = { keysgroup: [], lifetime: 0, min: 0 };
        multiSignatureLegacy.min = buf.readUint8();
        const num = buf.readUint8();
        multiSignatureLegacy.lifetime = buf.readUint8();
        for (let index = 0; index < num; index++) {
            const key = buf.readBytes(33).toString("hex");
            multiSignatureLegacy.keysgroup.push(key);
        }
        data.asset = { multiSignatureLegacy };
    }
}
exports.MultiSignatureRegistrationTransaction = MultiSignatureRegistrationTransaction;
MultiSignatureRegistrationTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
MultiSignatureRegistrationTransaction.type = enums_1.TransactionType.MultiSignature;
MultiSignatureRegistrationTransaction.key = "multiSignature";
MultiSignatureRegistrationTransaction.version = 1;
MultiSignatureRegistrationTransaction.defaultStaticFee = bignum_1.BigNumber.make("500000000");
//# sourceMappingURL=multi-signature-registration.js.map