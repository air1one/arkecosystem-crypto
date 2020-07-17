"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBlockTime = exports.isNewBlockTime = void 0;
const config_1 = require("../managers/config");
exports.isNewBlockTime = (height) => {
    if (height === 1)
        return true;
    const milestones = config_1.configManager.get("milestones");
    let milestone;
    for (let i = milestones.length - 1; i >= 0; i--) {
        const temp = milestones[i];
        if (temp.height > height) {
            continue;
        }
        if (!milestone || temp.blocktime === milestone.blocktime) {
            if (temp.blocktime) {
                milestone = temp;
            }
        }
        else {
            break;
        }
    }
    if (!milestone)
        return false;
    return height - milestone.height === 0;
};
exports.calculateBlockTime = (height) => {
    const milestones = config_1.configManager.get("milestones");
    for (let i = milestones.length - 1; i >= 0; i--) {
        const milestone = milestones[i];
        if (milestone.height <= height) {
            if (milestone.blocktime) {
                return milestone.blocktime;
            }
        }
    }
    throw new Error(`No milestones specifying any height were found`);
};
//# sourceMappingURL=block-time-calculator.js.map