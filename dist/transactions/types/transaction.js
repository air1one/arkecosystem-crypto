"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const enums_1 = require("../../enums");
const errors_1 = require("../../errors");
const identities_1 = require("../../identities");
const config_1 = require("../../managers/config");
const bignum_1 = require("../../utils/bignum");
const verifier_1 = require("../verifier");
class Transaction {
    constructor() {
        this.isVerified = false;
    }
    static getSchema() {
        throw new errors_1.NotImplemented();
    }
    static staticFee(feeContext = {}) {
        const milestones = config_1.configManager.getMilestone(feeContext.height);
        if (milestones.fees && milestones.fees.staticFees && this.key) {
            const fee = milestones.fees.staticFees[this.key];
            if (fee !== undefined) {
                return bignum_1.BigNumber.make(fee);
            }
        }
        return this.defaultStaticFee;
    }
    verify(options) {
        return verifier_1.Verifier.verify(this.data, options);
    }
    verifySecondSignature(publicKey) {
        return verifier_1.Verifier.verifySecondSignature(this.data, publicKey);
    }
    verifySchema() {
        return verifier_1.Verifier.verifySchema(this.data);
    }
    toJson() {
        const data = JSON.parse(JSON.stringify(this.data));
        if (data.typeGroup === enums_1.TransactionTypeGroup.Core) {
            delete data.typeGroup;
        }
        if (data.version === 1) {
            delete data.nonce;
        }
        else {
            delete data.timestamp;
        }
        return data;
    }
    toString() {
        const parts = [];
        if (this.data.senderPublicKey && this.data.nonce) {
            parts.push(`${identities_1.Address.fromPublicKey(this.data.senderPublicKey)}#${this.data.nonce}`);
        }
        else if (this.data.senderPublicKey) {
            parts.push(`${identities_1.Address.fromPublicKey(this.data.senderPublicKey)}`);
        }
        if (this.data.id) {
            parts.push(this.data.id.slice(-8));
        }
        parts.push(`${this.key[0].toUpperCase()}${this.key.slice(1)} v${this.data.version}`);
        return parts.join(" ");
    }
    hasVendorField() {
        return false;
    }
    get id() {
        return this.data.id;
    }
    get type() {
        return this.data.type;
    }
    get typeGroup() {
        return this.data.typeGroup;
    }
    get verified() {
        return this.isVerified;
    }
    get key() {
        return this.__proto__.constructor.key;
    }
    get staticFee() {
        return this.__proto__.constructor.staticFee({ data: this.data });
    }
}
exports.Transaction = Transaction;
Transaction.type = undefined;
Transaction.typeGroup = undefined;
Transaction.version = 1;
Transaction.key = undefined;
Transaction.defaultStaticFee = bignum_1.BigNumber.ZERO;
//# sourceMappingURL=transaction.js.map