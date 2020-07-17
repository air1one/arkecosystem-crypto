import { IMessage } from "../interfaces";
import { Network } from "../interfaces/networks";
export declare class Message {
    static sign(message: string, passphrase: string): IMessage;
    static signWithWif(message: string, wif: string, network?: Network): IMessage;
    static verify({ message, publicKey, signature }: IMessage): boolean;
    private static createHash;
}
