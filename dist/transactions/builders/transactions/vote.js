"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteBuilder = void 0;
const utils_1 = require("../../../utils");
const types_1 = require("../../types");
const transaction_1 = require("./transaction");
class VoteBuilder extends transaction_1.TransactionBuilder {
    constructor() {
        super();
        this.data.type = types_1.Two.VoteTransaction.type;
        this.data.typeGroup = types_1.Two.VoteTransaction.typeGroup;
        this.data.fee = types_1.Two.VoteTransaction.staticFee();
        this.data.amount = utils_1.BigNumber.ZERO;
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { votes: [] };
        this.signWithSenderAsRecipient = true;
    }
    votesAsset(votes) {
        if (this.data.asset && this.data.asset.votes) {
            this.data.asset.votes = votes;
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
exports.VoteBuilder = VoteBuilder;
//# sourceMappingURL=vote.js.map