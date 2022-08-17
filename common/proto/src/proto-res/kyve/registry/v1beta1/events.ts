/* eslint-disable */
import {
  StakerStatus,
  stakerStatusToNumber,
  stakerStatusFromJSON,
  stakerStatusToJSON,
} from "./registry";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.registry.v1beta1";

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

/** SlashType ... */
export enum SlashType {
  /** SLASH_TYPE_UNSPECIFIED - SLASH_TYPE_UNSPECIFIED ... */
  SLASH_TYPE_UNSPECIFIED = "SLASH_TYPE_UNSPECIFIED",
  /** SLASH_TYPE_TIMEOUT - SLASH_TYPE_TIMEOUT ... */
  SLASH_TYPE_TIMEOUT = "SLASH_TYPE_TIMEOUT",
  /** SLASH_TYPE_VOTE - SLASH_TYPE_VOTE ... */
  SLASH_TYPE_VOTE = "SLASH_TYPE_VOTE",
  /** SLASH_TYPE_UPLOAD - SLASH_TYPE_UPLOAD ... */
  SLASH_TYPE_UPLOAD = "SLASH_TYPE_UPLOAD",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function slashTypeFromJSON(object: any): SlashType {
  switch (object) {
    case 0:
    case "SLASH_TYPE_UNSPECIFIED":
      return SlashType.SLASH_TYPE_UNSPECIFIED;
    case 1:
    case "SLASH_TYPE_TIMEOUT":
      return SlashType.SLASH_TYPE_TIMEOUT;
    case 2:
    case "SLASH_TYPE_VOTE":
      return SlashType.SLASH_TYPE_VOTE;
    case 3:
    case "SLASH_TYPE_UPLOAD":
      return SlashType.SLASH_TYPE_UPLOAD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SlashType.UNRECOGNIZED;
  }
}

export function slashTypeToJSON(object: SlashType): string {
  switch (object) {
    case SlashType.SLASH_TYPE_UNSPECIFIED:
      return "SLASH_TYPE_UNSPECIFIED";
    case SlashType.SLASH_TYPE_TIMEOUT:
      return "SLASH_TYPE_TIMEOUT";
    case SlashType.SLASH_TYPE_VOTE:
      return "SLASH_TYPE_VOTE";
    case SlashType.SLASH_TYPE_UPLOAD:
      return "SLASH_TYPE_UPLOAD";
    case SlashType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export function slashTypeToNumber(object: SlashType): number {
  switch (object) {
    case SlashType.SLASH_TYPE_UNSPECIFIED:
      return 0;
    case SlashType.SLASH_TYPE_TIMEOUT:
      return 1;
    case SlashType.SLASH_TYPE_VOTE:
      return 2;
    case SlashType.SLASH_TYPE_UPLOAD:
      return 3;
    case SlashType.UNRECOGNIZED:
    default:
      return -1;
  }
}

/** EventBundleFinalised is an event emitted when a bundle is finalised. */
export interface EventBundleFinalised {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** storage_id ... */
  storage_id: string;
  /** byte_size ... */
  byte_size: string;
  /** uploader ... */
  uploader: string;
  /** next_uploader ... */
  next_uploader: string;
  /** reward ... */
  reward: string;
  /** valid ... */
  valid: string;
  /** invalid ... */
  invalid: string;
  /** from_height ... */
  from_height: string;
  /** to_height ... */
  to_height: string;
  /** status ... */
  status: BundleStatus;
  /** to_key ... */
  to_key: string;
  /** to_value ... */
  to_value: string;
  /** id ... */
  id: string;
  /** bundle_hash ... */
  bundle_hash: string;
  /** abstain ... */
  abstain: string;
  /** total ... */
  total: string;
}

/** EventDelegatePool is an event emitted when someone delegates to a protocol node. */
export interface EventDelegatePool {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the delegator. */
  address: string;
  /** node is the account address of the protocol node. */
  node: string;
  /** amount ... */
  amount: string;
}

/** EventUndelegatePool is an event emitted when someone undelegates from a protocol node. */
export interface EventUndelegatePool {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the delegator. */
  address: string;
  /** node is the account address of the protocol node. */
  node: string;
  /** amount ... */
  amount: string;
}

/** EventRedelegatePool is an event emitted when someone redelegates from one protocol node to another. */
export interface EventRedelegatePool {
  /** address is the account address of the delegator. */
  address: string;
  /** from_pool is the unique ID of the pool the user withdraws its delegation from */
  from_pool: string;
  /** from_node is the account address of the protocol node the users withdraws from. */
  from_node: string;
  /** pool_id is the unique ID of the pool of the new pool the user delegates to */
  to_pool: string;
  /** address is the account address of the new staker in the the pool */
  to_node: string;
  /** amount ... */
  amount: string;
}

/** EventFundPool is an event emitted when a pool is funded. */
export interface EventFundPool {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the pool funder. */
  address: string;
  /** amount ... */
  amount: string;
}

/** EventDefundPool is an event emitted when a pool is defunded. */
export interface EventDefundPool {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the pool funder. */
  address: string;
  /** amount ... */
  amount: string;
}

/** EventSlash is an event emitted when a protocol node is slashed. */
export interface EventSlash {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  amount: string;
  /** slash_type */
  slash_type: SlashType;
}

/** EventUpdateMetadata is an event emitted when a protocol node updates their metadata. */
export interface EventUpdateMetadata {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** moniker ... */
  moniker: string;
  /** website ... */
  website: string;
  /** logo ... */
  logo: string;
}

/** EventUpdateCommission ... */
export interface EventUpdateCommission {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** commission ... */
  commission: string;
}

/** EventStakePool is an event emitted when a protocol node stakes in a pool. */
export interface EventStakePool {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  amount: string;
}

/** EventUnstakePool is an event emitted when a protocol node unstakes from a pool. */
export interface EventUnstakePool {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  amount: string;
}

/** EventStakerStatusChanged ... */
export interface EventStakerStatusChanged {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  status: StakerStatus;
}

function createBaseEventBundleFinalised(): EventBundleFinalised {
  return {
    pool_id: "0",
    storage_id: "",
    byte_size: "0",
    uploader: "",
    next_uploader: "",
    reward: "0",
    valid: "0",
    invalid: "0",
    from_height: "0",
    to_height: "0",
    status: BundleStatus.BUNDLE_STATUS_UNSPECIFIED,
    to_key: "",
    to_value: "",
    id: "0",
    bundle_hash: "",
    abstain: "0",
    total: "0",
  };
}

export const EventBundleFinalised = {
  encode(
    message: EventBundleFinalised,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.storage_id !== "") {
      writer.uint32(18).string(message.storage_id);
    }
    if (message.byte_size !== "0") {
      writer.uint32(24).uint64(message.byte_size);
    }
    if (message.uploader !== "") {
      writer.uint32(34).string(message.uploader);
    }
    if (message.next_uploader !== "") {
      writer.uint32(42).string(message.next_uploader);
    }
    if (message.reward !== "0") {
      writer.uint32(48).uint64(message.reward);
    }
    if (message.valid !== "0") {
      writer.uint32(56).uint64(message.valid);
    }
    if (message.invalid !== "0") {
      writer.uint32(64).uint64(message.invalid);
    }
    if (message.from_height !== "0") {
      writer.uint32(72).uint64(message.from_height);
    }
    if (message.to_height !== "0") {
      writer.uint32(80).uint64(message.to_height);
    }
    if (message.status !== BundleStatus.BUNDLE_STATUS_UNSPECIFIED) {
      writer.uint32(88).int32(bundleStatusToNumber(message.status));
    }
    if (message.to_key !== "") {
      writer.uint32(98).string(message.to_key);
    }
    if (message.to_value !== "") {
      writer.uint32(106).string(message.to_value);
    }
    if (message.id !== "0") {
      writer.uint32(112).uint64(message.id);
    }
    if (message.bundle_hash !== "") {
      writer.uint32(122).string(message.bundle_hash);
    }
    if (message.abstain !== "0") {
      writer.uint32(128).uint64(message.abstain);
    }
    if (message.total !== "0") {
      writer.uint32(136).uint64(message.total);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventBundleFinalised {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBundleFinalised();
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
          message.byte_size = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.uploader = reader.string();
          break;
        case 5:
          message.next_uploader = reader.string();
          break;
        case 6:
          message.reward = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.valid = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.invalid = longToString(reader.uint64() as Long);
          break;
        case 9:
          message.from_height = longToString(reader.uint64() as Long);
          break;
        case 10:
          message.to_height = longToString(reader.uint64() as Long);
          break;
        case 11:
          message.status = bundleStatusFromJSON(reader.int32());
          break;
        case 12:
          message.to_key = reader.string();
          break;
        case 13:
          message.to_value = reader.string();
          break;
        case 14:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 15:
          message.bundle_hash = reader.string();
          break;
        case 16:
          message.abstain = longToString(reader.uint64() as Long);
          break;
        case 17:
          message.total = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBundleFinalised {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      byte_size: isSet(object.byte_size) ? String(object.byte_size) : "0",
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
      next_uploader: isSet(object.next_uploader)
        ? String(object.next_uploader)
        : "",
      reward: isSet(object.reward) ? String(object.reward) : "0",
      valid: isSet(object.valid) ? String(object.valid) : "0",
      invalid: isSet(object.invalid) ? String(object.invalid) : "0",
      from_height: isSet(object.from_height) ? String(object.from_height) : "0",
      to_height: isSet(object.to_height) ? String(object.to_height) : "0",
      status: isSet(object.status)
        ? bundleStatusFromJSON(object.status)
        : BundleStatus.BUNDLE_STATUS_UNSPECIFIED,
      to_key: isSet(object.to_key) ? String(object.to_key) : "",
      to_value: isSet(object.to_value) ? String(object.to_value) : "",
      id: isSet(object.id) ? String(object.id) : "0",
      bundle_hash: isSet(object.bundle_hash) ? String(object.bundle_hash) : "",
      abstain: isSet(object.abstain) ? String(object.abstain) : "0",
      total: isSet(object.total) ? String(object.total) : "0",
    };
  },

  toJSON(message: EventBundleFinalised): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.byte_size !== undefined && (obj.byte_size = message.byte_size);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    message.next_uploader !== undefined &&
      (obj.next_uploader = message.next_uploader);
    message.reward !== undefined && (obj.reward = message.reward);
    message.valid !== undefined && (obj.valid = message.valid);
    message.invalid !== undefined && (obj.invalid = message.invalid);
    message.from_height !== undefined &&
      (obj.from_height = message.from_height);
    message.to_height !== undefined && (obj.to_height = message.to_height);
    message.status !== undefined &&
      (obj.status = bundleStatusToJSON(message.status));
    message.to_key !== undefined && (obj.to_key = message.to_key);
    message.to_value !== undefined && (obj.to_value = message.to_value);
    message.id !== undefined && (obj.id = message.id);
    message.bundle_hash !== undefined &&
      (obj.bundle_hash = message.bundle_hash);
    message.abstain !== undefined && (obj.abstain = message.abstain);
    message.total !== undefined && (obj.total = message.total);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBundleFinalised>, I>>(
    object: I
  ): EventBundleFinalised {
    const message = createBaseEventBundleFinalised();
    message.pool_id = object.pool_id ?? "0";
    message.storage_id = object.storage_id ?? "";
    message.byte_size = object.byte_size ?? "0";
    message.uploader = object.uploader ?? "";
    message.next_uploader = object.next_uploader ?? "";
    message.reward = object.reward ?? "0";
    message.valid = object.valid ?? "0";
    message.invalid = object.invalid ?? "0";
    message.from_height = object.from_height ?? "0";
    message.to_height = object.to_height ?? "0";
    message.status = object.status ?? BundleStatus.BUNDLE_STATUS_UNSPECIFIED;
    message.to_key = object.to_key ?? "";
    message.to_value = object.to_value ?? "";
    message.id = object.id ?? "0";
    message.bundle_hash = object.bundle_hash ?? "";
    message.abstain = object.abstain ?? "0";
    message.total = object.total ?? "0";
    return message;
  },
};

function createBaseEventDelegatePool(): EventDelegatePool {
  return { pool_id: "0", address: "", node: "", amount: "0" };
}

export const EventDelegatePool = {
  encode(
    message: EventDelegatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.node !== "") {
      writer.uint32(26).string(message.node);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDelegatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDelegatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.node = reader.string();
          break;
        case 4:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventDelegatePool {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      node: isSet(object.node) ? String(object.node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventDelegatePool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.node !== undefined && (obj.node = message.node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventDelegatePool>, I>>(
    object: I
  ): EventDelegatePool {
    const message = createBaseEventDelegatePool();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.node = object.node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventUndelegatePool(): EventUndelegatePool {
  return { pool_id: "0", address: "", node: "", amount: "0" };
}

export const EventUndelegatePool = {
  encode(
    message: EventUndelegatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.node !== "") {
      writer.uint32(26).string(message.node);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUndelegatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUndelegatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.node = reader.string();
          break;
        case 4:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUndelegatePool {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      node: isSet(object.node) ? String(object.node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventUndelegatePool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.node !== undefined && (obj.node = message.node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUndelegatePool>, I>>(
    object: I
  ): EventUndelegatePool {
    const message = createBaseEventUndelegatePool();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.node = object.node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventRedelegatePool(): EventRedelegatePool {
  return {
    address: "",
    from_pool: "0",
    from_node: "",
    to_pool: "0",
    to_node: "",
    amount: "0",
  };
}

export const EventRedelegatePool = {
  encode(
    message: EventRedelegatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.from_pool !== "0") {
      writer.uint32(16).uint64(message.from_pool);
    }
    if (message.from_node !== "") {
      writer.uint32(26).string(message.from_node);
    }
    if (message.to_pool !== "0") {
      writer.uint32(32).uint64(message.to_pool);
    }
    if (message.to_node !== "") {
      writer.uint32(42).string(message.to_node);
    }
    if (message.amount !== "0") {
      writer.uint32(48).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRedelegatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRedelegatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.from_pool = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.from_node = reader.string();
          break;
        case 4:
          message.to_pool = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.to_node = reader.string();
          break;
        case 6:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventRedelegatePool {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      from_pool: isSet(object.from_pool) ? String(object.from_pool) : "0",
      from_node: isSet(object.from_node) ? String(object.from_node) : "",
      to_pool: isSet(object.to_pool) ? String(object.to_pool) : "0",
      to_node: isSet(object.to_node) ? String(object.to_node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventRedelegatePool): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.from_pool !== undefined && (obj.from_pool = message.from_pool);
    message.from_node !== undefined && (obj.from_node = message.from_node);
    message.to_pool !== undefined && (obj.to_pool = message.to_pool);
    message.to_node !== undefined && (obj.to_node = message.to_node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventRedelegatePool>, I>>(
    object: I
  ): EventRedelegatePool {
    const message = createBaseEventRedelegatePool();
    message.address = object.address ?? "";
    message.from_pool = object.from_pool ?? "0";
    message.from_node = object.from_node ?? "";
    message.to_pool = object.to_pool ?? "0";
    message.to_node = object.to_node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventFundPool(): EventFundPool {
  return { pool_id: "0", address: "", amount: "0" };
}

export const EventFundPool = {
  encode(
    message: EventFundPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventFundPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFundPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventFundPool {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventFundPool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventFundPool>, I>>(
    object: I
  ): EventFundPool {
    const message = createBaseEventFundPool();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventDefundPool(): EventDefundPool {
  return { pool_id: "0", address: "", amount: "0" };
}

export const EventDefundPool = {
  encode(
    message: EventDefundPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDefundPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDefundPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventDefundPool {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventDefundPool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventDefundPool>, I>>(
    object: I
  ): EventDefundPool {
    const message = createBaseEventDefundPool();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventSlash(): EventSlash {
  return {
    pool_id: "0",
    address: "",
    amount: "0",
    slash_type: SlashType.SLASH_TYPE_UNSPECIFIED,
  };
}

export const EventSlash = {
  encode(
    message: EventSlash,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    if (message.slash_type !== SlashType.SLASH_TYPE_UNSPECIFIED) {
      writer.uint32(32).int32(slashTypeToNumber(message.slash_type));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSlash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSlash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.slash_type = slashTypeFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSlash {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      slash_type: isSet(object.slash_type)
        ? slashTypeFromJSON(object.slash_type)
        : SlashType.SLASH_TYPE_UNSPECIFIED,
    };
  },

  toJSON(message: EventSlash): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    message.slash_type !== undefined &&
      (obj.slash_type = slashTypeToJSON(message.slash_type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSlash>, I>>(
    object: I
  ): EventSlash {
    const message = createBaseEventSlash();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    message.slash_type = object.slash_type ?? SlashType.SLASH_TYPE_UNSPECIFIED;
    return message;
  },
};

function createBaseEventUpdateMetadata(): EventUpdateMetadata {
  return { pool_id: "0", address: "", moniker: "", website: "", logo: "" };
}

export const EventUpdateMetadata = {
  encode(
    message: EventUpdateMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.moniker !== "") {
      writer.uint32(26).string(message.moniker);
    }
    if (message.website !== "") {
      writer.uint32(34).string(message.website);
    }
    if (message.logo !== "") {
      writer.uint32(42).string(message.logo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.moniker = reader.string();
          break;
        case 4:
          message.website = reader.string();
          break;
        case 5:
          message.logo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUpdateMetadata {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      website: isSet(object.website) ? String(object.website) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
    };
  },

  toJSON(message: EventUpdateMetadata): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.website !== undefined && (obj.website = message.website);
    message.logo !== undefined && (obj.logo = message.logo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateMetadata>, I>>(
    object: I
  ): EventUpdateMetadata {
    const message = createBaseEventUpdateMetadata();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.moniker = object.moniker ?? "";
    message.website = object.website ?? "";
    message.logo = object.logo ?? "";
    return message;
  },
};

function createBaseEventUpdateCommission(): EventUpdateCommission {
  return { pool_id: "0", address: "", commission: "" };
}

export const EventUpdateCommission = {
  encode(
    message: EventUpdateCommission,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.commission !== "") {
      writer.uint32(26).string(message.commission);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventUpdateCommission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.commission = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUpdateCommission {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      commission: isSet(object.commission) ? String(object.commission) : "",
    };
  },

  toJSON(message: EventUpdateCommission): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.commission !== undefined && (obj.commission = message.commission);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateCommission>, I>>(
    object: I
  ): EventUpdateCommission {
    const message = createBaseEventUpdateCommission();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.commission = object.commission ?? "";
    return message;
  },
};

function createBaseEventStakePool(): EventStakePool {
  return { pool_id: "0", address: "", amount: "0" };
}

export const EventStakePool = {
  encode(
    message: EventStakePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventStakePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventStakePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventStakePool {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventStakePool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventStakePool>, I>>(
    object: I
  ): EventStakePool {
    const message = createBaseEventStakePool();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventUnstakePool(): EventUnstakePool {
  return { pool_id: "0", address: "", amount: "0" };
}

export const EventUnstakePool = {
  encode(
    message: EventUnstakePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUnstakePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUnstakePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUnstakePool {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventUnstakePool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUnstakePool>, I>>(
    object: I
  ): EventUnstakePool {
    const message = createBaseEventUnstakePool();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventStakerStatusChanged(): EventStakerStatusChanged {
  return {
    pool_id: "0",
    address: "",
    status: StakerStatus.STAKER_STATUS_UNSPECIFIED,
  };
}

export const EventStakerStatusChanged = {
  encode(
    message: EventStakerStatusChanged,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.status !== StakerStatus.STAKER_STATUS_UNSPECIFIED) {
      writer.uint32(24).int32(stakerStatusToNumber(message.status));
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventStakerStatusChanged {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventStakerStatusChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.status = stakerStatusFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventStakerStatusChanged {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      status: isSet(object.status)
        ? stakerStatusFromJSON(object.status)
        : StakerStatus.STAKER_STATUS_UNSPECIFIED,
    };
  },

  toJSON(message: EventStakerStatusChanged): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.status !== undefined &&
      (obj.status = stakerStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventStakerStatusChanged>, I>>(
    object: I
  ): EventStakerStatusChanged {
    const message = createBaseEventStakerStatusChanged();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.status = object.status ?? StakerStatus.STAKER_STATUS_UNSPECIFIED;
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
