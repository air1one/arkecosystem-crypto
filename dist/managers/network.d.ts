import { NetworkConfig } from "../interfaces/networks";
import { NetworkName } from "../types";
export declare class NetworkManager {
    static all(): Record<NetworkName, NetworkConfig>;
    static findByName(name: NetworkName): NetworkConfig;
}
