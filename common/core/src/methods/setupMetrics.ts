import { IMetrics, Node } from "..";
import http from "http";
import url from "url";
import prom_client, { register } from "prom-client";

export function setupMetrics(this: Node): void {
  // init metric parameters
  this.prom = {} as IMetrics;

  prom_client.collectDefaultMetrics({
    labels: { app: "kyve-core" },
  });

  // TX METRICS

  // MsgClaimUploaderRole metrics
  this.prom.tx_claim_uploader_role_successful = new prom_client.Counter({
    name: "tx_claim_uploader_role_successful",
    help: "The amount of MsgClaimUploaderRole txs with receipt code = 0.",
  });

  this.prom.tx_claim_uploader_role_unsuccessful = new prom_client.Counter({
    name: "tx_claim_uploader_role_unsuccessful",
    help: "The amount of MsgClaimUploaderRole txs with receipt code != 0.",
  });

  this.prom.tx_claim_uploader_role_failed = new prom_client.Counter({
    name: "tx_claim_uploader_role_failed",
    help: "The amount of MsgClaimUploaderRole txs that failed with an error",
  });

  // MsgVoteBundleProposal metrics
  this.prom.tx_vote_bundle_proposal_successful = new prom_client.Counter({
    name: "tx_vote_bundle_proposal_successful",
    help: "The amount of MsgVoteBundleProposal txs with receipt code = 0.",
  });

  this.prom.tx_vote_bundle_proposal_unsuccessful = new prom_client.Counter({
    name: "tx_vote_bundle_proposal_unsuccessful",
    help: "The amount of MsgVoteBundleProposal txs with receipt code != 0.",
  });

  this.prom.tx_vote_bundle_proposal_failed = new prom_client.Counter({
    name: "tx_vote_bundle_proposal_failed",
    help: "The amount of MsgVoteBundleProposal txs that failed with an error",
  });

  // MsgSubmitBundleProposal metrics
  this.prom.tx_submit_bundle_proposal_successful = new prom_client.Counter({
    name: "tx_submit_bundle_proposal_successful",
    help: "The amount of MsgSubmitBundleProposal txs with receipt code = 0.",
  });

  this.prom.tx_submit_bundle_proposal_unsuccessful = new prom_client.Counter({
    name: "tx_submit_bundle_proposal_unsuccessful",
    help: "The amount of MsgSubmitBundleProposal txs with receipt code != 0.",
  });

  this.prom.tx_submit_bundle_proposal_failed = new prom_client.Counter({
    name: "tx_submit_bundle_proposal_failed",
    help: "The amount of MsgSubmitBundleProposal txs that failed with an error",
  });

  // MsgSkipUploaderRole metrics
  this.prom.tx_skip_uploader_role_successful = new prom_client.Counter({
    name: "tx_skip_uploader_role_successful",
    help: "The amount of MsgSkipUploaderRole txs with receipt code = 0.",
  });

  this.prom.tx_skip_uploader_role_unsuccessful = new prom_client.Counter({
    name: "tx_skip_uploader_role_unsuccessful",
    help: "The amount of MsgSkipUploaderRole txs with receipt code != 0.",
  });

  this.prom.tx_skip_uploader_role_failed = new prom_client.Counter({
    name: "tx_skip_uploader_role_failed",
    help: "The amount of MsgSkipUploaderRole txs that failed with an error",
  });

  // QUERY METRICS

  // QueryPool metrics
  this.prom.query_pool_successful = new prom_client.Counter({
    name: "query_pool_successful",
    help: "The amount of QueryPool /kyve/query/v1beta1/pool/{id} calls that succeeded.",
  });

  this.prom.query_pool_failed = new prom_client.Counter({
    name: "query_pool_failed",
    help: "The amount of QueryPool /kyve/query/v1beta1/pool/{id} calls that failed.",
  });

  // QueryCanValidate metrics
  this.prom.query_can_validate_successful = new prom_client.Counter({
    name: "query_can_validate_successful",
    help: "The amount of QueryCanValidate /kyve/query/v1beta1/can_validate/{pool_id}/{valaddress} calls that succeeded.",
  });

  this.prom.query_can_validate_failed = new prom_client.Counter({
    name: "query_can_validate_failed",
    help: "The amount of QueryCanValidate /kyve/query/v1beta1/can_validate/{pool_id}/{valaddress} calls that failed.",
  });

  // QueryCanPropose metrics
  this.prom.query_can_propose_successful = new prom_client.Counter({
    name: "query_can_propose_successful",
    help: "The amount of QueryCanPropose /kyve/query/v1beta1/can_propose/{pool_id}/{staker}/{proposer}/{from_height} calls that succeeded.",
  });

  this.prom.query_can_propose_failed = new prom_client.Counter({
    name: "query_can_propose_failed",
    help: "The amount of QueryCanPropose /kyve/query/v1beta1/can_propose/{pool_id}/{staker}/{proposer}/{from_height} calls that failed.",
  });

  // QueryCanVote metrics
  this.prom.query_can_vote_successful = new prom_client.Counter({
    name: "query_can_vote_successful",
    help: "The amount of QueryCanVote /kyve/query/v1beta1/can_vote/{pool_id}/{staker}/{voter}/{storage_id} calls that succeeded.",
  });

  this.prom.query_can_vote_failed = new prom_client.Counter({
    name: "query_can_vote_failed",
    help: "The amount of QueryCanVote /kyve/query/v1beta1/can_vote/{pool_id}/{staker}/{voter}/{storage_id} calls that failed.",
  });

  // STORAGE PROVIDER METRICS

  // retrieve bundle
  this.prom.storage_provider_retrieve_successful = new prom_client.Counter({
    name: "storage_provider_retrieve_successful",
    help: "The amount of calls to the storage provider to retrieve a bundle that succeeded.",
  });

  this.prom.storage_provider_retrieve_failed = new prom_client.Counter({
    name: "storage_provider_retrieve_failed",
    help: "The amount of calls to the storage provider to retrieve a bundle that failed.",
  });

  // save bundle
  this.prom.storage_provider_save_successful = new prom_client.Counter({
    name: "storage_provider_save_successful",
    help: "The amount of calls to the storage provider to save a bundle that succeeded.",
  });

  this.prom.storage_provider_save_failed = new prom_client.Counter({
    name: "storage_provider_save_failed",
    help: "The amount of calls to the storage provider to save a bundle that failed.",
  });

  // BUNDLE METRICS

  // bundle votes
  this.prom.bundles_voted_valid = new prom_client.Counter({
    name: "bundles_voted_valid",
    help: "The amount the validator voted valid.",
  });

  this.prom.bundles_voted_invalid = new prom_client.Counter({
    name: "bundles_voted_invalid",
    help: "The amount the validator voted invalid.",
  });

  this.prom.bundles_voted_abstain = new prom_client.Counter({
    name: "bundles_voted_abstain",
    help: "The amount the validator voted abstain.",
  });

  // bundle proposals
  this.prom.bundles_proposed = new prom_client.Counter({
    name: "bundles_proposed",
    help: "The amount of bundles the validator proposed.",
  });

  this.prom.bundles_round_time = new prom_client.Gauge({
    name: "bundles_round_time",
    help: "The time for a bundle proposal round.",
  });

  this.prom.bundles_remaining_upload_interval_time = new prom_client.Gauge({
    name: "bundles_remaining_upload_interval_time",
    help: "The time for the remaining upload interval.",
  });

  this.prom.bundles_wait_for_next_round_time = new prom_client.Gauge({
    name: "bundles_wait_for_next_round_time",
    help: "The time to wait for the next proposal round.",
  });

  this.prom.bundles_amount = new prom_client.Gauge({
    name: "bundles_amount",
    help: "The amount of bundles the validator participated in.",
  });

  this.prom.bundles_data_items = new prom_client.Gauge({
    name: "bundles_data_items",
    help: "The amount of data items the validator participated in.",
  });

  this.prom.bundles_byte_size = new prom_client.Gauge({
    name: "bundles_byte_size",
    help: "The amount of data in bytes the validator participated in.",
  });

  // RUNTIME METRICS

  this.prom.runtime_get_data_item_successful = new prom_client.Counter({
    name: "runtime_get_data_item_successful",
    help: "The amount of successful returned data items from the runtime.",
  });

  this.prom.runtime_get_data_item_failed = new prom_client.Counter({
    name: "runtime_get_data_item_failed",
    help: "The amount of failed returned data items from the runtime.",
  });

  // BALANCE METRICS

  this.prom.balance_staker = new prom_client.Gauge({
    name: "balance_staker",
    help: "The current $KYVE balance of the staker.",
  });

  this.prom.balance_valaccount = new prom_client.Gauge({
    name: "balance_valaccount",
    help: "The current $KYVE balance of the valaccount.",
  });

  this.prom.balance_wallet = new prom_client.Gauge({
    name: "balance_wallet",
    help: "The current balance of the wallet.",
  });

  // CACHE METRICS

  this.prom.cache_current_items = new prom_client.Gauge({
    name: "cache_current_items",
    help: "The amount of data items currently in the cache.",
  });

  this.prom.cache_height_tail = new prom_client.Gauge({
    name: "cache_height_tail",
    help: "The current height of the last data item in the cache.",
  });

  this.prom.cache_height_head = new prom_client.Gauge({
    name: "cache_height_head",
    help: "The current height of the first data item in the cache.",
  });

  // init metrics server
  if (this.metrics) {
    this.logger.info(
      `Starting metric server on: http://localhost:${this.metricsPort}/metrics`
    );

    // HTTP server which exposes the metrics on http://localhost:8080/metrics
    http
      .createServer(async (req: any, res: any) => {
        // Retrieve route from request object
        const route = url.parse(req.url).pathname;

        if (route === "/metrics") {
          // Return all metrics the Prometheus exposition format
          res.setHeader("Content-Type", register.contentType);
          const metrics = await prom_client.register.metrics();
          res.end(metrics);
        }
      })
      .listen(this.metricsPort, "0.0.0.0");
  }
}
