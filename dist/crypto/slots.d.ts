import { MilestoneSearchResult } from "../managers/config";
export interface SlotInfo {
    startTime: number;
    endTime: number;
    blockTime: number;
    slotNumber: number;
    forgingStatus: boolean;
}
export declare type GetBlockTimeStampLookup = (blockheight: number) => number;
export declare class Slots {
    static getTime(time?: number): number;
    static getTimeInMsUntilNextSlot(getTimeStampForBlock: GetBlockTimeStampLookup): number;
    static getSlotNumber(getTimeStampForBlock: GetBlockTimeStampLookup, timestamp?: number, height?: number): number;
    static getSlotTime(getTimeStampForBlock: GetBlockTimeStampLookup, slot: number, height?: number): number;
    static getNextSlot(getTimeStampForBlock: GetBlockTimeStampLookup): number;
    static isForgingAllowed(getTimeStampForBlock: GetBlockTimeStampLookup, timestamp?: number, height?: number): boolean;
    static getSlotInfo(getTimeStampForBlock: GetBlockTimeStampLookup, timestamp?: number, height?: number): SlotInfo;
    static getMilestonesWhichAffectBlockTimes(): Array<MilestoneSearchResult>;
    private static calculateSlotTime;
    private static getLatestHeight;
}
