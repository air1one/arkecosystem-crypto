import { Keys } from "../../../identities";
import { ITransactionAsset, ITransactionData } from "../../../interfaces";
import { BigNumber } from "../../../utils";
import { Two } from "../../types";
import { TransactionBuilder } from "./transaction";

export class SecondSignatureBuilder extends TransactionBuilder<SecondSignatureBuilder> {
    public constructor() {
        super();

        this.data.type = Two.SecondSignatureRegistrationTransaction.type;
        this.data.typeGroup = Two.SecondSignatureRegistrationTransaction.typeGroup;
        this.data.fee = Two.SecondSignatureRegistrationTransaction.staticFee();
        this.data.amount = BigNumber.ZERO;
        this.data.recipientId = undefined;
        this.data.senderPublicKey = undefined;
        this.data.asset = { signature: {} } as ITransactionAsset;
    }

    public signatureAsset(secondPassphrase: string): SecondSignatureBuilder {
        if (this.data.asset && this.data.asset.signature) {
            this.data.asset.signature.publicKey = Keys.fromPassphrase(secondPassphrase).publicKey;
        }

        return this;
    }

    public getStruct(): ITransactionData {
        const struct: ITransactionData = super.getStruct();
        struct.amount = this.data.amount;
        struct.recipientId = this.data.recipientId;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): SecondSignatureBuilder {
        return this;
    }
}
