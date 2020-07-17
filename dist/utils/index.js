"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNewBlockTime = exports.calculateBlockTime = exports.isLocalHost = exports.isValidPeer = exports.BigNumber = exports.Base58 = exports.isSupportedTransactionVersion = exports.maxVendorFieldLength = exports.numberToHex = exports.isGenesisTransaction = exports.isException = exports.isIdException = exports.formatSatoshi = void 0;
const constants_1 = require("../constants");
const config_1 = require("../managers/config");
const base58_1 = require("./base58");
Object.defineProperty(exports, "Base58", { enumerable: true, get: function () { return base58_1.Base58; } });
const bignum_1 = require("./bignum");
Object.defineProperty(exports, "BigNumber", { enumerable: true, get: function () { return bignum_1.BigNumber; } });
const block_time_calculator_1 = require("./block-time-calculator");
Object.defineProperty(exports, "calculateBlockTime", { enumerable: true, get: function () { return block_time_calculator_1.calculateBlockTime; } });
Object.defineProperty(exports, "isNewBlockTime", { enumerable: true, get: function () { return block_time_calculator_1.isNewBlockTime; } });
const is_valid_peer_1 = require("./is-valid-peer");
Object.defineProperty(exports, "isLocalHost", { enumerable: true, get: function () { return is_valid_peer_1.isLocalHost; } });
Object.defineProperty(exports, "isValidPeer", { enumerable: true, get: function () { return is_valid_peer_1.isValidPeer; } });
let genesisTransactions;
let whitelistedBlockAndTransactionIds;
let currentNetwork;
/**
 * Get human readable string from satoshis
 */
exports.formatSatoshi = (amount) => {
    const localeString = (+amount / constants_1.SATOSHI).toLocaleString("en", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
    });
    return `${localeString} ${config_1.configManager.get("network.client.symbol")}`;
};
/**
 * Check if the given block or transaction id is an exception.
 */
exports.isIdException = (id) => {
    if (!id) {
        return false;
    }
    const network = config_1.configManager.get("network.pubKeyHash");
    if (!whitelistedBlockAndTransactionIds || currentNetwork !== network) {
        currentNetwork = network;
        whitelistedBlockAndTransactionIds = [
            ...(config_1.configManager.get("exceptions.blocks") || []),
            ...(config_1.configManager.get("exceptions.transactions") || []),
        ].reduce((acc, curr) => Object.assign(acc, { [curr]: true }), {});
    }
    return !!whitelistedBlockAndTransactionIds[id];
};
exports.isException = (blockOrTransaction) => {
    if (typeof blockOrTransaction.id !== "string") {
        return false;
    }
    if (blockOrTransaction.id.length < 64) {
        // old block ids, we check that the transactions inside the block are correct
        const blockExceptionTxIds = (config_1.configManager.get("exceptions.blocksTransactions") || {})[blockOrTransaction.id];
        const blockTransactions = blockOrTransaction.transactions || [];
        if (!blockExceptionTxIds || blockExceptionTxIds.length !== blockTransactions.length) {
            return false;
        }
        blockExceptionTxIds.sort();
        const blockToCheckTxIds = blockTransactions.map((tx) => tx.id).sort();
        for (let i = 0; i < blockExceptionTxIds.length; i++) {
            if (blockToCheckTxIds[i] !== blockExceptionTxIds[i]) {
                return false;
            }
        }
    }
    return exports.isIdException(blockOrTransaction.id);
};
exports.isGenesisTransaction = (id) => {
    const network = config_1.configManager.get("network.pubKeyHash");
    if (!genesisTransactions || currentNetwork !== network) {
        currentNetwork = network;
        genesisTransactions = config_1.configManager
            .get("genesisBlock.transactions")
            .reduce((acc, curr) => Object.assign(acc, { [curr.id]: true }), {});
    }
    return genesisTransactions[id];
};
exports.numberToHex = (num, padding = 2) => {
    const indexHex = Number(num).toString(16);
    return "0".repeat(padding - indexHex.length) + indexHex;
};
exports.maxVendorFieldLength = (height) => config_1.configManager.getMilestone(height).vendorFieldLength;
exports.isSupportedTransactionVersion = (version) => {
    const aip11 = config_1.configManager.getMilestone().aip11;
    if (aip11 && version !== 2) {
        return false;
    }
    if (!aip11 && version !== 1) {
        return false;
    }
    return true;
};
//# sourceMappingURL=index.js.map