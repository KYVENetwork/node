import { sleep } from "@kyve/core";
import axios from "axios";

export interface Block {
  height: number;
  proposer: string;
  moniker: string;
  block_hash: string;
  parent_hash: string;
  num_pre_commits: number;
  num_txs: number;
  total_txs: number;
  txs: any[];
  timestamp: string;
}

interface BlockResponse {
  s: string;
  data: Block;
}

interface Status {
  chain_id: string;
  block_time: number;
  latest_block_height: number;
  total_validator_num: number;
  timestamp: string;
}

interface StatusResponse {
  s: string;
  data: Status;
}

export class Provider {
  endpoint: string;
  timeout: number;

  constructor(endpoint: string, timeout?: number) {
    this.endpoint = endpoint;
    this.timeout = timeout || 500;
  }

  async block(height: number): Promise<Block> {
    try {
      const { data } = await axios.get<BlockResponse>(
        `${this.endpoint}/blocks/${height}`
      );
      return data.data;
    } catch {
      await sleep(this.timeout);
      return this.block(height);
    }
  }

  async currentHeight(): Promise<number> {
    try {
      const { data } = await axios.get<StatusResponse>(
        `${this.endpoint}/status`
      );
      return data.data.latest_block_height;
    } catch {
      await sleep(this.timeout);
      return this.currentHeight();
    }
  }
}
