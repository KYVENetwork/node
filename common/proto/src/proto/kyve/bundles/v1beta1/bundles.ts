/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.bundles.v1beta1";

/** BundleProposal ... */
export interface BundleProposal {
  /** pool_id ... */
  pool_id: string;
  /** uploader ... */
  uploader: string;
  /** next_uploader ... */
  next_uploader: string;
  /** storage_id ... */
  storage_id: string;
  /** byte_size ... */
  byte_size: string;
  /** to_height ... */
  to_height: string;
  /** created_at ... */
  created_at: string;
  /** voters_valid ... */
  voters_valid: string[];
  /** voters_invalid ... */
  voters_invalid: string[];
  /** voters_abstain ... */
  voters_abstain: string[];
  /** to_key ... */
  to_key: string;
  /** to_value ... */
  to_value: string;
  /** bundle_hash ... */
  bundle_hash: string;
}

/** Proposal ... */
export interface FinalizedBundle {
  /** storage_id ... */
  storage_id: string;
  /** pool_id ... */
  pool_id: string;
  /** uploader ... */
  uploader: string;
  /** from_height ... */
  from_height: string;
  /** to_height ... */
  to_height: string;
  /** finalized_at ... */
  finalized_at: string;
  /** id ... */
  id: string;
  /** key ... */
  key: string;
  /** value ... */
  value: string;
  /** bundle_hash ... */
  bundle_hash: string;
}

function createBaseBundleProposal(): BundleProposal {
  return {
    pool_id: "0",
    uploader: "",
    next_uploader: "",
    storage_id: "",
    byte_size: "0",
    to_height: "0",
    created_at: "0",
    voters_valid: [],
    voters_invalid: [],
    voters_abstain: [],
    to_key: "",
    to_value: "",
    bundle_hash: "",
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
    if (message.uploader !== "") {
      writer.uint32(18).string(message.uploader);
    }
    if (message.next_uploader !== "") {
      writer.uint32(26).string(message.next_uploader);
    }
    if (message.storage_id !== "") {
      writer.uint32(34).string(message.storage_id);
    }
    if (message.byte_size !== "0") {
      writer.uint32(40).uint64(message.byte_size);
    }
    if (message.to_height !== "0") {
      writer.uint32(48).uint64(message.to_height);
    }
    if (message.created_at !== "0") {
      writer.uint32(56).uint64(message.created_at);
    }
    for (const v of message.voters_valid) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.voters_invalid) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.voters_abstain) {
      writer.uint32(82).string(v!);
    }
    if (message.to_key !== "") {
      writer.uint32(90).string(message.to_key);
    }
    if (message.to_value !== "") {
      writer.uint32(98).string(message.to_value);
    }
    if (message.bundle_hash !== "") {
      writer.uint32(106).string(message.bundle_hash);
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
          message.uploader = reader.string();
          break;
        case 3:
          message.next_uploader = reader.string();
          break;
        case 4:
          message.storage_id = reader.string();
          break;
        case 5:
          message.byte_size = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.to_height = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.created_at = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.voters_valid.push(reader.string());
          break;
        case 9:
          message.voters_invalid.push(reader.string());
          break;
        case 10:
          message.voters_abstain.push(reader.string());
          break;
        case 11:
          message.to_key = reader.string();
          break;
        case 12:
          message.to_value = reader.string();
          break;
        case 13:
          message.bundle_hash = reader.string();
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
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
      next_uploader: isSet(object.next_uploader)
        ? String(object.next_uploader)
        : "",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      byte_size: isSet(object.byte_size) ? String(object.byte_size) : "0",
      to_height: isSet(object.to_height) ? String(object.to_height) : "0",
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
      to_key: isSet(object.to_key) ? String(object.to_key) : "",
      to_value: isSet(object.to_value) ? String(object.to_value) : "",
      bundle_hash: isSet(object.bundle_hash) ? String(object.bundle_hash) : "",
    };
  },

  toJSON(message: BundleProposal): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    message.next_uploader !== undefined &&
      (obj.next_uploader = message.next_uploader);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.byte_size !== undefined && (obj.byte_size = message.byte_size);
    message.to_height !== undefined && (obj.to_height = message.to_height);
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
    message.to_key !== undefined && (obj.to_key = message.to_key);
    message.to_value !== undefined && (obj.to_value = message.to_value);
    message.bundle_hash !== undefined &&
      (obj.bundle_hash = message.bundle_hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BundleProposal>, I>>(
    object: I
  ): BundleProposal {
    const message = createBaseBundleProposal();
    message.pool_id = object.pool_id ?? "0";
    message.uploader = object.uploader ?? "";
    message.next_uploader = object.next_uploader ?? "";
    message.storage_id = object.storage_id ?? "";
    message.byte_size = object.byte_size ?? "0";
    message.to_height = object.to_height ?? "0";
    message.created_at = object.created_at ?? "0";
    message.voters_valid = object.voters_valid?.map((e) => e) || [];
    message.voters_invalid = object.voters_invalid?.map((e) => e) || [];
    message.voters_abstain = object.voters_abstain?.map((e) => e) || [];
    message.to_key = object.to_key ?? "";
    message.to_value = object.to_value ?? "";
    message.bundle_hash = object.bundle_hash ?? "";
    return message;
  },
};

function createBaseFinalizedBundle(): FinalizedBundle {
  return {
    storage_id: "",
    pool_id: "0",
    uploader: "",
    from_height: "0",
    to_height: "0",
    finalized_at: "0",
    id: "0",
    key: "",
    value: "",
    bundle_hash: "",
  };
}

export const FinalizedBundle = {
  encode(
    message: FinalizedBundle,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.storage_id !== "") {
      writer.uint32(10).string(message.storage_id);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.uploader !== "") {
      writer.uint32(26).string(message.uploader);
    }
    if (message.from_height !== "0") {
      writer.uint32(32).uint64(message.from_height);
    }
    if (message.to_height !== "0") {
      writer.uint32(40).uint64(message.to_height);
    }
    if (message.finalized_at !== "0") {
      writer.uint32(48).uint64(message.finalized_at);
    }
    if (message.id !== "0") {
      writer.uint32(56).uint64(message.id);
    }
    if (message.key !== "") {
      writer.uint32(66).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(74).string(message.value);
    }
    if (message.bundle_hash !== "") {
      writer.uint32(82).string(message.bundle_hash);
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
          message.storage_id = reader.string();
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.uploader = reader.string();
          break;
        case 4:
          message.from_height = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.to_height = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.finalized_at = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.key = reader.string();
          break;
        case 9:
          message.value = reader.string();
          break;
        case 10:
          message.bundle_hash = reader.string();
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
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
      from_height: isSet(object.from_height) ? String(object.from_height) : "0",
      to_height: isSet(object.to_height) ? String(object.to_height) : "0",
      finalized_at: isSet(object.finalized_at)
        ? String(object.finalized_at)
        : "0",
      id: isSet(object.id) ? String(object.id) : "0",
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      bundle_hash: isSet(object.bundle_hash) ? String(object.bundle_hash) : "",
    };
  },

  toJSON(message: FinalizedBundle): unknown {
    const obj: any = {};
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    message.from_height !== undefined &&
      (obj.from_height = message.from_height);
    message.to_height !== undefined && (obj.to_height = message.to_height);
    message.finalized_at !== undefined &&
      (obj.finalized_at = message.finalized_at);
    message.id !== undefined && (obj.id = message.id);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.bundle_hash !== undefined &&
      (obj.bundle_hash = message.bundle_hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FinalizedBundle>, I>>(
    object: I
  ): FinalizedBundle {
    const message = createBaseFinalizedBundle();
    message.storage_id = object.storage_id ?? "";
    message.pool_id = object.pool_id ?? "0";
    message.uploader = object.uploader ?? "";
    message.from_height = object.from_height ?? "0";
    message.to_height = object.to_height ?? "0";
    message.finalized_at = object.finalized_at ?? "0";
    message.id = object.id ?? "0";
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.bundle_hash = object.bundle_hash ?? "";
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
