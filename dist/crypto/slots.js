"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slots = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = require("../managers/config");
const block_time_calculator_1 = require("../utils/block-time-calculator");
class Slots {
    static getTime(time) {
        if (time === undefined) {
            time = dayjs_1.default().valueOf();
        }
        const start = dayjs_1.default(config_1.configManager.getMilestone(1).epoch).valueOf();
        return Math.floor((time - start) / 1000);
    }
    static getTimeInMsUntilNextSlot(getTimeStampForBlock) {
        const nextSlotTime = this.getSlotTime(getTimeStampForBlock, this.getNextSlot(getTimeStampForBlock));
        const now = this.getTime();
        return (nextSlotTime - now) * 1000;
    }
    static getSlotNumber(getTimeStampForBlock, timestamp, height) {
        if (timestamp === undefined) {
            timestamp = this.getTime();
        }
        const latestHeight = this.getLatestHeight(height);
        return this.getSlotInfo(getTimeStampForBlock, timestamp, latestHeight).slotNumber;
    }
    static getSlotTime(getTimeStampForBlock, slot, height) {
        const latestHeight = this.getLatestHeight(height);
        return this.calculateSlotTime(slot, latestHeight, getTimeStampForBlock);
    }
    static getNextSlot(getTimeStampForBlock) {
        return this.getSlotNumber(getTimeStampForBlock) + 1;
    }
    static isForgingAllowed(getTimeStampForBlock, timestamp, height) {
        if (timestamp === undefined) {
            timestamp = this.getTime();
        }
        const latestHeight = this.getLatestHeight(height);
        return this.getSlotInfo(getTimeStampForBlock, timestamp, latestHeight).forgingStatus;
    }
    static getSlotInfo(getTimeStampForBlock, timestamp, height) {
        if (timestamp === undefined) {
            timestamp = this.getTime();
        }
        height = this.getLatestHeight(height);
        let blockTime = block_time_calculator_1.calculateBlockTime(1);
        let totalSlotsFromLastSpan = 0;
        let lastSpanEndTime = 0;
        let previousMilestoneHeight = 1;
        let nextMilestone = config_1.configManager.getNextMilestoneWithNewKey(1, "blocktime");
        for (let i = 0; i < this.getMilestonesWhichAffectBlockTimes().length - 1; i++) {
            if (height < nextMilestone.height) {
                const slotNumerUpUntilThisTimestamp = Math.floor((timestamp - lastSpanEndTime) / blockTime);
                const slotNumber = totalSlotsFromLastSpan + slotNumerUpUntilThisTimestamp;
                const startTime = lastSpanEndTime + slotNumerUpUntilThisTimestamp * blockTime;
                const endTime = startTime + blockTime - 1;
                const forgingStatus = timestamp < startTime + Math.floor(blockTime / 2);
                const slotInfo = {
                    blockTime,
                    startTime,
                    endTime,
                    slotNumber,
                    forgingStatus,
                };
                return slotInfo;
            }
            else {
                const spanStartTimestamp = getTimeStampForBlock(previousMilestoneHeight);
                previousMilestoneHeight = nextMilestone.height - 1;
                lastSpanEndTime = getTimeStampForBlock(nextMilestone.height - 1) + blockTime;
                totalSlotsFromLastSpan += Math.floor((lastSpanEndTime - spanStartTimestamp) / blockTime);
                blockTime = nextMilestone.data;
                nextMilestone = config_1.configManager.getNextMilestoneWithNewKey(nextMilestone.height, "blocktime");
            }
        }
        const slotNumerUpUntilThisTimestamp = Math.floor((timestamp - lastSpanEndTime) / blockTime);
        let slotNumber = totalSlotsFromLastSpan + slotNumerUpUntilThisTimestamp - 1;
        const startTime = lastSpanEndTime + slotNumerUpUntilThisTimestamp * blockTime;
        const endTime = startTime + blockTime - 1;
        const forgingStatus = timestamp < startTime + Math.floor(blockTime / 2);
        if (this.getMilestonesWhichAffectBlockTimes().length <= 1) {
            slotNumber++;
        }
        const slotInfo = {
            blockTime,
            startTime,
            endTime,
            slotNumber,
            forgingStatus,
        };
        return slotInfo;
    }
    static getMilestonesWhichAffectBlockTimes() {
        const milestones = [
            {
                found: true,
                height: 1,
                data: config_1.configManager.getMilestone(1).blocktime,
            },
        ];
        let nextMilestone = config_1.configManager.getNextMilestoneWithNewKey(1, "blocktime");
        while (nextMilestone.found) {
            milestones.push(nextMilestone);
            nextMilestone = config_1.configManager.getNextMilestoneWithNewKey(nextMilestone.height, "blocktime");
        }
        return milestones;
    }
    static calculateSlotTime(slotNumber, height, getTimeStampForBlock) {
        let blockTime = block_time_calculator_1.calculateBlockTime(1);
        let totalSlotsFromLastSpan = 0;
        let nextMilestone = config_1.configManager.getNextMilestoneWithNewKey(1, "blocktime");
        let previousSpanEndTimestamp = 0;
        let previousMilestoneHeight = 1;
        let previousMilestoneBlockTime = blockTime;
        for (let i = 0; i < this.getMilestonesWhichAffectBlockTimes().length - 1; i++) {
            if (height < nextMilestone.height) {
                return previousSpanEndTimestamp + (slotNumber - totalSlotsFromLastSpan) * blockTime;
            }
            else {
                const spanStartTimestamp = getTimeStampForBlock(previousMilestoneHeight);
                previousSpanEndTimestamp = getTimeStampForBlock(nextMilestone.height - 1) + blockTime;
                let spanTotalTime = previousSpanEndTimestamp - spanStartTimestamp;
                if (spanStartTimestamp !== 0) {
                    spanTotalTime -= previousMilestoneBlockTime;
                }
                const totalSlotsInThisSpan = Math.floor(spanTotalTime / blockTime);
                totalSlotsFromLastSpan += totalSlotsInThisSpan;
                previousMilestoneBlockTime = blockTime;
                blockTime = nextMilestone.data;
                previousMilestoneHeight = nextMilestone.height - 1;
                nextMilestone = config_1.configManager.getNextMilestoneWithNewKey(nextMilestone.height, "blocktime");
            }
        }
        if (this.getMilestonesWhichAffectBlockTimes().length <= 1) {
            return slotNumber * blockTime;
        }
        return previousSpanEndTimestamp + (slotNumber - totalSlotsFromLastSpan) * blockTime;
    }
    static getLatestHeight(height) {
        if (!height) {
            // TODO: is the config manager the best way to retrieve most recent height?
            // Or should this class maintain its own cache?
            const configConfiguredHeight = config_1.configManager.getHeight();
            if (configConfiguredHeight) {
                return configConfiguredHeight;
            }
            else {
                return 1;
            }
        }
        return height;
    }
}
exports.Slots = Slots;
//# sourceMappingURL=slots.js.map