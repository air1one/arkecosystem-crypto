import { NetworkConfig } from "../interfaces/networks";
import { NetworkName } from "../types";
export interface MilestoneSearchResult {
    found: boolean;
    height: number;
    data: any;
}
export declare class ConfigManager {
    private config;
    private height;
    private milestone;
    private milestones;
    constructor();
    setConfig(config: NetworkConfig): void;
    setFromPreset(network: NetworkName): void;
    getPreset(network: NetworkName): NetworkConfig;
    all(): NetworkConfig | undefined;
    set<T = any>(key: string, value: T): void;
    get<T = any>(key: string): T;
    setHeight(value: number): void;
    getHeight(): number | undefined;
    isNewMilestone(height?: number): boolean;
    getMilestone(height?: number): {
        [key: string]: any;
    };
    getNextMilestoneWithNewKey(previousMilestone: number, key: string): MilestoneSearchResult;
    getMilestones(): any;
    private buildConstants;
    private validateMilestones;
}
export declare const configManager: ConfigManager;
