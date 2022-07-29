export const UNABLE_TO_RETRIEVE =
  'Unable to retrieve header and parent from supplied hash';

export interface Signature {
  signature: string;
  pubKey: string;
  poolId: string;
  timestamp: string;
}
