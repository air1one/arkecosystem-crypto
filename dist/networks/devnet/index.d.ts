export declare const devnet: {
    exceptions: {
        blocks: string[];
        transactions: string[];
        blocksTransactions: {
            "15895730198424359628": never[];
            "14746174532446639362": never[];
            "15249141324902969334": never[];
            "12360802297474246584": never[];
            "2565729258675312304": never[];
            "12614646598841308905": never[];
            "8274406339991077743": never[];
            "1661383348822169561": never[];
            "15467742607784975524": never[];
            "3665174254391236833": never[];
            "18033869253067308940": never[];
            "9121030900295704150": never[];
            "4296553458016414976": never[];
            "6837659293375391985": never[];
            "16540521480028827748": never[];
            "1485997193168364918": never[];
            "14159698257459587584": never[];
            "7561147498738550191": never[];
            "6247200360319694668": never[];
            "7363268091423233950": never[];
            "8738693892321921533": never[];
            "9014317427571908796": never[];
            "15519361274991733193": never[];
            "14013227271822852495": never[];
            "12603272471546364995": never[];
            "1944108005996955253": never[];
            "8469356042757089608": never[];
            "3433946900869474802": never[];
            "11257633501887013743": never[];
            "2997965849869498353": never[];
            "9196430932294555781": never[];
            "6730395143580220680": never[];
            "5806654366498055250": never[];
            "13290912469992409149": never[];
            "9502002558776276513": never[];
            "330791153715252718": never[];
            "12084096509112875921": never[];
            "7079194814443264009": never[];
            "15946707936026547597": never[];
            "1641736062116508620": never[];
            "5245034769798442586": never[];
            "4073147595542846301": never[];
            "11129434526540201266": never[];
            "15355810214343508168": never[];
            "834201289153220685": never[];
            "4785149476172130294": never[];
            "9808224912335721998": never[];
            "11229968119222422821": never[];
            "6766557974469507237": never[];
            "2066948671330348076": never[];
            "13308773643111727094": never[];
            "15649739201370841265": never[];
            "17287484123727410951": never[];
            "1739406121453748889": never[];
            "16969775483726255451": never[];
            "5174570296595098048": never[];
            "10957882104586895269": never[];
            "16222316251056394079": never[];
            "11019993339496601918": never[];
            "7648775833276915174": never[];
            "5947225658884952613": never[];
            "17256370470460685782": never[];
            "5681801935518263609": never[];
            "6853934810393582972": never[];
            "621694479387726255": never[];
            "649083198759873217": never[];
            "4052333663180604671": never[];
            "5348794590580429562": never[];
            "7723209448992965570": never[];
            "15836524583901486981": never[];
            "12478859533758330380": never[];
            "13701809340863213986": never[];
            "17417028847837598792": never[];
            "14220651316552198137": never[];
            "13101468344291730322": never[];
            "6671890826474701031": never[];
        };
    };
    genesisBlock: {
        version: number;
        totalAmount: string;
        totalFee: string;
        reward: string;
        payloadHash: string;
        timestamp: number;
        numberOfTransactions: number;
        payloadLength: number;
        previousBlock: null;
        generatorPublicKey: string;
        transactions: ({
            type: number;
            amount: string;
            fee: string;
            recipientId: string;
            timestamp: number;
            asset: {
                delegate?: undefined;
            };
            senderPublicKey: string;
            signature: string;
            id: string;
        } | {
            type: number;
            amount: string;
            fee: string;
            recipientId: null;
            senderPublicKey: string;
            timestamp: number;
            asset: {
                delegate: {
                    username: string;
                    publicKey: string;
                };
            };
            signature: string;
            id: string;
        })[];
        height: number;
        id: string;
        blockSignature: string;
    };
    milestones: ({
        height: number;
        reward: number;
        activeDelegates: number;
        blocktime: number;
        block: {
            version: number;
            maxTransactions: number;
            maxPayload: number;
            acceptExpiredTransactionTimestamps: boolean;
            idFullSha256?: undefined;
        };
        epoch: string;
        fees: {
            staticFees: {
                transfer: number;
                secondSignature: number;
                delegateRegistration: number;
                vote: number;
                multiSignature: number;
                ipfs: number;
                multiPayment: number;
                delegateResignation: number;
                htlcLock: number;
                htlcClaim: number;
                htlcRefund: number;
            };
        };
        ignoreInvalidSecondSignatureField: boolean;
        ignoreExpiredTransactions: boolean;
        vendorFieldLength: number;
        multiPaymentLimit: number;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        reward: number;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        block: {
            maxTransactions: number;
            maxPayload: number;
            version?: undefined;
            acceptExpiredTransactionTimestamps?: undefined;
            idFullSha256?: undefined;
        };
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        ignoreInvalidSecondSignatureField: boolean;
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        vendorFieldLength: number;
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        block: {
            idFullSha256: boolean;
            version?: undefined;
            maxTransactions?: undefined;
            maxPayload?: undefined;
            acceptExpiredTransactionTimestamps?: undefined;
        };
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        ignoreExpiredTransactions: boolean;
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        block: {
            acceptExpiredTransactionTimestamps: boolean;
            version?: undefined;
            maxTransactions?: undefined;
            maxPayload?: undefined;
            idFullSha256?: undefined;
        };
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        p2p: {
            minimumVersions: string[];
        };
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        aip11: boolean;
        htlcEnabled: boolean;
        p2p: {
            minimumVersions: string[];
        };
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        aip36?: undefined;
    } | {
        height: number;
        aip36: boolean;
        reward?: undefined;
        activeDelegates?: undefined;
        blocktime?: undefined;
        block?: undefined;
        epoch?: undefined;
        fees?: undefined;
        ignoreInvalidSecondSignatureField?: undefined;
        ignoreExpiredTransactions?: undefined;
        vendorFieldLength?: undefined;
        multiPaymentLimit?: undefined;
        p2p?: undefined;
        aip11?: undefined;
        htlcEnabled?: undefined;
    })[];
    network: {
        name: string;
        messagePrefix: string;
        bip32: {
            public: number;
            private: number;
        };
        pubKeyHash: number;
        nethash: string;
        wif: number;
        slip44: number;
        aip20: number;
        client: {
            token: string;
            symbol: string;
            explorer: string;
        };
    };
};
