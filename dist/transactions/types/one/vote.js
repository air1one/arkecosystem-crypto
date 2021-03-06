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
exports.VoteTransaction = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const enums_1 = require("../../../enums");
const bignum_1 = require("../../../utils/bignum");
const schemas = __importStar(require("../schemas"));
const transaction_1 = require("../transaction");
class VoteTransaction extends transaction_1.Transaction {
    static getSchema() {
        return schemas.vote;
    }
    serialize(options) {
        const { data } = this;
        const buffer = new bytebuffer_1.default(24, true);
        if (data.asset && data.asset.votes) {
            const voteBytes = data.asset.votes
                .map((vote) => (vote.startsWith("+") ? "01" : "00") + vote.slice(1))
                .join("");
            buffer.writeByte(data.asset.votes.length);
            buffer.append(voteBytes, "hex");
        }
        return buffer;
    }
    deserialize(buf) {
        const { data } = this;
        const votelength = buf.readUint8();
        data.asset = { votes: [] };
        for (let i = 0; i < votelength; i++) {
            let vote = buf.readBytes(34).toString("hex");
            vote = (vote[1] === "1" ? "+" : "-") + vote.slice(2);
            if (data.asset && data.asset.votes) {
                data.asset.votes.push(vote);
            }
        }
    }
}
exports.VoteTransaction = VoteTransaction;
VoteTransaction.typeGroup = enums_1.TransactionTypeGroup.Core;
VoteTransaction.type = enums_1.TransactionType.Vote;
VoteTransaction.key = "vote";
VoteTransaction.version = 1;
VoteTransaction.defaultStaticFee = bignum_1.BigNumber.make("100000000");
//# sourceMappingURL=vote.js.map