/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.bundles.v1beta1";

/** BundleStatus ... */
export enum BundleStatus {
  /** BUNDLE_STATUS_UNSPECIFIED - BUNDLE_STATUS_UNSPECIFIED ... */
  BUNDLE_STATUS_UNSPECIFIED = "BUNDLE_STATUS_UNSPECIFIED",
  /** BUNDLE_STATUS_VALID - BUNDLE_STATUS_VALID ... */
  BUNDLE_STATUS_VALID = "BUNDLE_STATUS_VALID",
  /** BUNDLE_STATUS_INVALID - BUNDLE_STATUS_INVALID ... */
  BUNDLE_STATUS_INVALID = "BUNDLE_STATUS_INVALID",
  /** BUNDLE_STATUS_NO_FUNDS - BUNDLE_STATUS_NO_FUNDS ... */
  BUNDLE_STATUS_NO_FUNDS = "BUNDLE_STATUS_NO_FUNDS",
  /** BUNDLE_STATUS_NO_QUORUM - BUNDLE_STATUS_NO_QUORUM ... */
  BUNDLE_STATUS_NO_QUORUM = "BUNDLE_STATUS_NO_QUORUM",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function bundleStatusFromJSON(object: any): BundleStatus {
  switch (object) {
    case 0:
    case "BUNDLE_STATUS_UNSPECIFIED":
      return BundleStatus.BUNDLE_STATUS_UNSPECIFIED;
    case 1:
    case "BUNDLE_STATUS_VALID":
      return BundleStatus.BUNDLE_STATUS_VALID;
    case 2:
    case "BUNDLE_STATUS_INVALID":
      return BundleStatus.BUNDLE_STATUS_INVALID;
    case 3:
    case "BUNDLE_STATUS_NO_FUNDS":
      return BundleStatus.BUNDLE_STATUS_NO_FUNDS;
    case 4:
    case "BUNDLE_STATUS_NO_QUORUM":
      return BundleStatus.BUNDLE_STATUS_NO_QUORUM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BundleStatus.UNRECOGNIZED;
  }
}

export function bundleStatusToJSON(object: BundleStatus): string {
  switch (object) {
    case BundleStatus.BUNDLE_STATUS_UNSPECIFIED:
      return "BUNDLE_STATUS_UNSPECIFIED";
    case BundleStatus.BUNDLE_STATUS_VALID:
      return "BUNDLE_STATUS_VALID";
    case BundleStatus.BUNDLE_STATUS_INVALID:
      return "BUNDLE_STATUS_INVALID";
    case BundleStatus.BUNDLE_STATUS_NO_FUNDS:
      return "BUNDLE_STATUS_NO_FUNDS";
    case BundleStatus.BUNDLE_STATUS_NO_QUORUM:
      return "BUNDLE_STATUS_NO_QUORUM";
    case BundleStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export function bundleStatusToNumber(object: BundleStatus): number {
  switch (object) {
    case BundleStatus.BUNDLE_STATUS_UNSPECIFIED:
      return 0;
    case BundleStatus.BUNDLE_STATUS_VALID:
      return 1;
    case BundleStatus.BUNDLE_STATUS_INVALID:
      return 2;
    case BundleStatus.BUNDLE_STATUS_NO_FUNDS:
      return 3;
    case BundleStatus.BUNDLE_STATUS_NO_QUORUM:
      return 4;
    case BundleStatus.UNRECOGNIZED:
    default:
      return -1;
  }
}

/** BundleProposal ... */
export interface BundleProposal {
  /** pool_id ... */
  pool_id: string;
  /** storage_id ... */
  storage_id: string;
  /** uploader ... */
  uploader: string;
  /** next_uploader ... */
  next_uploader: string;
  /** byte_size ... */
  byte_size: string;
  /** to_height ... */
  to_height: string;
  /** to_key ... */
  to_key: string;
  /** to_value ... */
  to_value: string;
  /** bundle_hash ... */
  bundle_hash: string;
  /** created_at ... */
  created_at: string;
  /** voters_valid ... */
  voters_valid: string[];
  /** voters_invalid ... */
  voters_invalid: string[];
  /** voters_abstain ... */
  voters_abstain: string[];
}

/** Proposal ... */
export interface FinalizedBundle {
  /** pool_id ... */
  pool_id: string;
  /** id ... */
  id: string;
  /** storage_id ... */
  storage_id: string;
  /** uploader ... */
  uploader: string;
  /** from_height ... */
  from_height: string;
  /** to_height ... */
  to_height: string;
  /** key ... */
  key: string;
  /** value ... */
  value: string;
  /** bundle_hash ... */
  bundle_hash: string;
  /** finalized_at ... */
  finalized_at: string;
}

function createBaseBundleProposal(): BundleProposal {
  return {
    pool_id: "0",
    storage_id: "",
    uploader: "",
    next_uploader: "",
    byte_size: "0",
    to_height: "0",
    to_key: "",
    to_value: "",
    bundle_hash: "",
    created_at: "0",
    voters_valid: [],
    voters_invalid: [],
    voters_abstain: [],
  };
}

export const BundleProposal = {
  encode(
    message: BundleProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.storage_id !== "") {
      writer.uint32(18).string(message.storage_id);
    }
    if (message.uploader !== "") {
      writer.uint32(26).string(message.uploader);
    }
    if (message.next_uploader !== "") {
      writer.uint32(34).string(message.next_uploader);
    }
    if (message.byte_size !== "0") {
      writer.uint32(40).uint64(message.byte_size);
    }
    if (message.to_height !== "0") {
      writer.uint32(48).uint64(message.to_height);
    }
    if (message.to_key !== "") {
      writer.uint32(58).string(message.to_key);
    }
    if (message.to_value !== "") {
      writer.uint32(66).string(message.to_value);
    }
    if (message.bundle_hash !== "") {
      writer.uint32(74).string(message.bundle_hash);
    }
    if (message.created_at !== "0") {
      writer.uint32(80).uint64(message.created_at);
    }
    for (const v of message.voters_valid) {
      writer.uint32(90).string(v!);
    }
    for (const v of message.voters_invalid) {
      writer.uint32(98).string(v!);
    }
    for (const v of message.voters_abstain) {
      writer.uint32(106).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.storage_id = reader.string();
          break;
        case 3:
          message.uploader = reader.string();
          break;
        case 4:
          message.next_uploader = reader.string();
          break;
        case 5:
          message.byte_size = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.to_height = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.to_key = reader.string();
          break;
        case 8:
          message.to_value = reader.string();
          break;
        case 9:
          message.bundle_hash = reader.string();
          break;
        case 10:
          message.created_at = longToString(reader.uint64() as Long);
          break;
        case 11:
          message.voters_valid.push(reader.string());
          break;
        case 12:
          message.voters_invalid.push(reader.string());
          break;
        case 13:
          message.voters_abstain.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BundleProposal {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
      next_uploader: isSet(object.next_uploader)
        ? String(object.next_uploader)
        : "",
      byte_size: isSet(object.byte_size) ? String(object.byte_size) : "0",
      to_height: isSet(object.to_height) ? String(object.to_height) : "0",
      to_key: isSet(object.to_key) ? String(object.to_key) : "",
      to_value: isSet(object.to_value) ? String(object.to_value) : "",
      bundle_hash: isSet(object.bundle_hash) ? String(object.bundle_hash) : "",
      created_at: isSet(object.created_at) ? String(object.created_at) : "0",
      voters_valid: Array.isArray(object?.voters_valid)
        ? object.voters_valid.map((e: any) => String(e))
        : [],
      voters_invalid: Array.isArray(object?.voters_invalid)
        ? object.voters_invalid.map((e: any) => String(e))
        : [],
      voters_abstain: Array.isArray(object?.voters_abstain)
        ? object.voters_abstain.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: BundleProposal): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    message.next_uploader !== undefined &&
      (obj.next_uploader = message.next_uploader);
    message.byte_size !== undefined && (obj.byte_size = message.byte_size);
    message.to_height !== undefined && (obj.to_height = message.to_height);
    message.to_key !== undefined && (obj.to_key = message.to_key);
    message.to_value !== undefined && (obj.to_value = message.to_value);
    message.bundle_hash !== undefined &&
      (obj.bundle_hash = message.bundle_hash);
    message.created_at !== undefined && (obj.created_at = message.created_at);
    if (message.voters_valid) {
      obj.voters_valid = message.voters_valid.map((e) => e);
    } else {
      obj.voters_valid = [];
    }
    if (message.voters_invalid) {
      obj.voters_invalid = message.voters_invalid.map((e) => e);
    } else {
      obj.voters_invalid = [];
    }
    if (message.voters_abstain) {
      obj.voters_abstain = message.voters_abstain.map((e) => e);
    } else {
      obj.voters_abstain = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BundleProposal>, I>>(
    object: I
  ): BundleProposal {
    const message = createBaseBundleProposal();
    message.pool_id = object.pool_id ?? "0";
    message.storage_id = object.storage_id ?? "";
    message.uploader = object.uploader ?? "";
    message.next_uploader = object.next_uploader ?? "";
    message.byte_size = object.byte_size ?? "0";
    message.to_height = object.to_height ?? "0";
    message.to_key = object.to_key ?? "";
    message.to_value = object.to_value ?? "";
    message.bundle_hash = object.bundle_hash ?? "";
    message.created_at = object.created_at ?? "0";
    message.voters_valid = object.voters_valid?.map((e) => e) || [];
    message.voters_invalid = object.voters_invalid?.map((e) => e) || [];
    message.voters_abstain = object.voters_abstain?.map((e) => e) || [];
    return message;
  },
};

function createBaseFinalizedBundle(): FinalizedBundle {
  return {
    pool_id: "0",
    id: "0",
    storage_id: "",
    uploader: "",
    from_height: "0",
    to_height: "0",
    key: "",
    value: "",
    bundle_hash: "",
    finalized_at: "0",
  };
}

export const FinalizedBundle = {
  encode(
    message: FinalizedBundle,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.storage_id !== "") {
      writer.uint32(26).string(message.storage_id);
    }
    if (message.uploader !== "") {
      writer.uint32(34).string(message.uploader);
    }
    if (message.from_height !== "0") {
      writer.uint32(40).uint64(message.from_height);
    }
    if (message.to_height !== "0") {
      writer.uint32(48).uint64(message.to_height);
    }
    if (message.key !== "") {
      writer.uint32(58).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(66).string(message.value);
    }
    if (message.bundle_hash !== "") {
      writer.uint32(74).string(message.bundle_hash);
    }
    if (message.finalized_at !== "0") {
      writer.uint32(80).uint64(message.finalized_at);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FinalizedBundle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFinalizedBundle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.storage_id = reader.string();
          break;
        case 4:
          message.uploader = reader.string();
          break;
        case 5:
          message.from_height = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.to_height = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.key = reader.string();
          break;
        case 8:
          message.value = reader.string();
          break;
        case 9:
          message.bundle_hash = reader.string();
          break;
        case 10:
          message.finalized_at = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FinalizedBundle {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      id: isSet(object.id) ? String(object.id) : "0",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
      from_height: isSet(object.from_height) ? String(object.from_height) : "0",
      to_height: isSet(object.to_height) ? String(object.to_height) : "0",
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      bundle_hash: isSet(object.bundle_hash) ? String(object.bundle_hash) : "",
      finalized_at: isSet(object.finalized_at)
        ? String(object.finalized_at)
        : "0",
    };
  },

  toJSON(message: FinalizedBundle): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.id !== undefined && (obj.id = message.id);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    message.from_height !== undefined &&
      (obj.from_height = message.from_height);
    message.to_height !== undefined && (obj.to_height = message.to_height);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.bundle_hash !== undefined &&
      (obj.bundle_hash = message.bundle_hash);
    message.finalized_at !== undefined &&
      (obj.finalized_at = message.finalized_at);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FinalizedBundle>, I>>(
    object: I
  ): FinalizedBundle {
    const message = createBaseFinalizedBundle();
    message.pool_id = object.pool_id ?? "0";
    message.id = object.id ?? "0";
    message.storage_id = object.storage_id ?? "";
    message.uploader = object.uploader ?? "";
    message.from_height = object.from_height ?? "0";
    message.to_height = object.to_height ?? "0";
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.bundle_hash = object.bundle_hash ?? "";
    message.finalized_at = object.finalized_at ?? "0";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
