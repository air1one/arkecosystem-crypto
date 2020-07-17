export declare const isLocalHost: (ip: string, includeNetworkInterfaces?: boolean) => boolean;
export declare const isValidPeer: (peer: {
    ip: string;
    status?: string | number;
}, includeNetworkInterfaces?: boolean) => boolean;
