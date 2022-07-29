import axios from "axios";
import { nanoid } from "nanoid";

export async function fetchBlock(
  endpoint: string,
  height: number
): Promise<any> {
  const res = await axios.post(endpoint, {
    jsonrpc: "2.0",
    id: nanoid(),
    method: "GetTxBlock",
    params: [height.toString()],
  });

  const transactions = await fetchTransactions(endpoint, height);

  return {
    ...res.data.result,
    transactions,
  };
}

export async function fetchHeight(endpoint: string): Promise<number> {
  const res = await axios.post(endpoint, {
    jsonrpc: "2.0",
    id: nanoid(),
    method: "GetNumTxBlocks",
    params: [],
  });

  // We have to subtract one, since the genesis height was 0.
  return parseInt(res.data.result as string) - 1;
}

async function fetchTransactions(
  endpoint: string,
  height: number
): Promise<any[]> {
  const res = await axios.post(endpoint, {
    jsonrpc: "2.0",
    id: nanoid(),
    method: "GetTxnBodiesForTxBlock",
    params: [height.toString()],
  });

  return res.data.result;
}
