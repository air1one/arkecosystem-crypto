"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockFactory = void 0;
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const block_1 = require("./block");
const deserializer_1 = require("./deserializer");
const serializer_1 = require("./serializer");
class BlockFactory {
    // @todo: add a proper type hint for data
    static make(data, keys, getBlockTimeStampLookup) {
        data.generatorPublicKey = keys.publicKey;
        const payloadHash = serializer_1.Serializer.serialize(data, false);
        const hash = crypto_1.HashAlgorithms.sha256(payloadHash);
        data.blockSignature = crypto_1.Hash.signECDSA(hash, keys);
        data.id = block_1.Block.getId(data);
        return this.fromData(data, getBlockTimeStampLookup);
    }
    static fromHex(hex, getBlockTimeStampLookup) {
        return this.fromSerialized(hex, getBlockTimeStampLookup);
    }
    static fromBytes(buffer, getBlockTimeStampLookup) {
        return this.fromSerialized(buffer.toString("hex"), getBlockTimeStampLookup);
    }
    static fromJson(json, getBlockTimeStampLookup) {
        // @ts-ignore
        const data = { ...json };
        data.totalAmount = utils_1.BigNumber.make(data.totalAmount);
        data.totalFee = utils_1.BigNumber.make(data.totalFee);
        data.reward = utils_1.BigNumber.make(data.reward);
        if (data.transactions) {
            for (const transaction of data.transactions) {
                transaction.amount = utils_1.BigNumber.make(transaction.amount);
                transaction.fee = utils_1.BigNumber.make(transaction.fee);
            }
        }
        return this.fromData(data, getBlockTimeStampLookup);
    }
    static fromData(data, getBlockTimeStampLookup, options = {}) {
        const block = block_1.Block.applySchema(data);
        if (block) {
            const serialized = serializer_1.Serializer.serializeWithTransactions(data).toString("hex");
            const block = new block_1.Block({
                ...deserializer_1.Deserializer.deserialize(serialized, false, options),
                id: data.id,
            }, getBlockTimeStampLookup);
            block.serialized = serialized;
            return block;
        }
        return undefined;
    }
    static fromSerialized(serialized, getBlockTimeStampLookup) {
        const deserialized = deserializer_1.Deserializer.deserialize(serialized);
        const validated = block_1.Block.applySchema(deserialized.data);
        if (validated) {
            deserialized.data = validated;
        }
        const block = new block_1.Block(deserialized, getBlockTimeStampLookup);
        block.serialized = serialized;
        return block;
    }
}
exports.BlockFactory = BlockFactory;
//# sourceMappingURL=factory.js.map