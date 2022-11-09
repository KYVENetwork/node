import {SigningStargateClient} from "@cosmjs/stargate";
import {AccountData} from "@cosmjs/amino/build/signer";
import KyveGovMsgV1beta1 from "../v1beta1/gov";
import {StdFee} from "@cosmjs/amino/build/signdoc";
import {VoteOption} from "@kyve/proto-beta/client/cosmos/gov/v1beta1/gov";
import {signTx, TxPromise} from "../../../../../utils/helper";


export default class KyveGovMsg extends KyveGovMsgV1beta1 {
    constructor(client: SigningStargateClient, account: AccountData) {
        super(client, account);
    }

    async govVote(
        id: string,
        voteOption: "Yes" | "Abstain" | "No" | "NoWithVeto",
        options?: {
            fee?: StdFee | "auto" | number;
            memo?: string;
        }
    ) {
        let _option = VoteOption.VOTE_OPTION_UNSPECIFIED;
        switch (voteOption) {
            case "Yes":
                _option = VoteOption.VOTE_OPTION_YES;
                break;
            case "Abstain":
                _option = VoteOption.VOTE_OPTION_ABSTAIN;
                break;
            case "No":
                _option = VoteOption.VOTE_OPTION_NO;
                break;
            case "NoWithVeto":
                _option = VoteOption.VOTE_OPTION_NO_WITH_VETO;
                break;
        }
        const tx = {
            typeUrl: "/cosmos.gov.v1.MsgVote",
            value: {
                proposalId: id,
                voter: this.account.address,
                option: _option,
            },
        };

        return new TxPromise(
            this.nativeClient,
            await signTx(this.nativeClient, this.account.address, tx, options)
        );
    }

}