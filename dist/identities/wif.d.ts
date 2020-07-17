import { IKeyPair } from "../interfaces";
import { Network } from "../interfaces/networks";
export declare class WIF {
    static fromPassphrase(passphrase: string, network?: Network): string;
    static fromKeys(keys: IKeyPair, network?: Network): string;
}
