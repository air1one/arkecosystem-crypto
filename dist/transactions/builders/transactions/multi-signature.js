"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSignatureBuilder = void 0;
const utils_1 = require("../../../utils");
const types_1 = require("../../types");
const transaction_1 = require("./transaction");
class MultiSignatureBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = types_1.Two.MultiSignatureRegistrationTransaction.type;
        this.data.typeGroup = types_1.Two.MultiSignatureRegistrationTransaction.typeGroup;
        this.data.version = 2;
        this.data.fee = utils_1.BigNumber.ZERO;
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { multiSignature: { min: 0, publicKeys: [] } };
    }
    participant(publicKey) {
        if (this.data.asset && this.data.asset.multiSignature) {
            const { publicKeys } = this.data.asset.multiSignature;
            if (publicKeys.length <= 16) {
                publicKeys.push(publicKey);
                this.data.fee = types_1.Two.MultiSignatureRegistrationTransaction.staticFee({ data: this.data });
            }
        }
        return this;
    }
    min(min) {
        if (this.data.asset && this.data.asset.multiSignature) {
            this.data.asset.multiSignature.min = min;
        }
        return this;
    }
    multiSignatureAsset(multiSignature) {
        if (this.data.asset && this.data.asset.multiSignature) {
            this.data.asset.multiSignature = multiSignature;
            this.data.fee = types_1.Two.MultiSignatureRegistrationTransaction.staticFee({ data: this.data });
        }
        return this;
    }
    getStruct() {
        const struct = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }
    instance() {
        return this;
    }
}
exports.MultiSignatureBuilder = MultiSignatureBuilder;
//# sourceMappingURL=multi-signature.js.map