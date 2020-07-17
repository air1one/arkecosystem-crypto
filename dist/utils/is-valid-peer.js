"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPeer = exports.isLocalHost = void 0;
const ipaddr_js_1 = require("ipaddr.js");
const os_1 = __importDefault(require("os"));
// todo: review the implementation of all methods
exports.isLocalHost = (ip, includeNetworkInterfaces = true) => {
    try {
        const parsed = ipaddr_js_1.parse(ip);
        if (parsed.range() === "loopback" || ip.startsWith("0") || ["127.0.0.1", "::ffff:127.0.0.1"].includes(ip)) {
            return true;
        }
        if (includeNetworkInterfaces) {
            const interfaces = os_1.default.networkInterfaces();
            return Object.keys(interfaces).some((ifname) => interfaces[ifname].some((iface) => iface.address === ip));
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
const sanitizeRemoteAddress = (ip) => {
    try {
        return ipaddr_js_1.process(ip).toString();
    }
    catch (error) {
        return undefined;
    }
};
exports.isValidPeer = (peer, includeNetworkInterfaces = true) => {
    const sanitizedAddress = sanitizeRemoteAddress(peer.ip);
    if (!sanitizedAddress) {
        return false;
    }
    peer.ip = sanitizedAddress;
    if (exports.isLocalHost(peer.ip, includeNetworkInterfaces)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=is-valid-peer.js.map