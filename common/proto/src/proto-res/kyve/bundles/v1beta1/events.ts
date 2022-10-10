/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BundleStatus, bundleStatusFromJSON, bundleStatusToJSON, bundleStatusToNumber } from "./bundles";
import { VoteType, voteTypeFromJSON, voteTypeToJSON, voteTypeToNumber } from "./tx";

export const protobufPackage = "kyve.bundles.v1beta1";

/** EventBundleVote is an event emitted when a protocol node votes on a bundle. */
export interface EventBundleVote {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** staker is the account staker of the protocol node. */
  staker: string;
  /** storage_id is the unique ID of the bundle. */
  storage_id: string;
  /** vote is the vote type of the protocol node. */
  vote: VoteType;
}

/** EventBundleProposed ... */
export interface EventBundleProposed {
  /** pool_id ... */
  pool_id: string;
  /** id ... */
  id: string;
  /** storage_id ... */
  storage_id: string;
  /** uploader ... */
  uploader: string;
  /** byte_size ... */
  byte_size: string;
  /** from_height ... */
  from_height: string;
  /** to_height ... */
  to_height: string;
  /** from_key ... */
  from_key: string;
  /** to_key ... */
  to_key: string;
  /** value ... */
  value: string;
  /** bundle_hash ... */
  bundle_hash: string;
  /** created_at ... */
  created_at: string;
}

/** EventBundleFinalized is an event emitted when a bundle is finalised. */
export interface EventBundleFinalized {
  /** pool_id ... */
  pool_id: string;
  /** id ... */
  id: string;
  /** valid ... */
  valid: string;
  /** invalid ... */
  invalid: string;
  /** abstain ... */
  abstain: string;
  /** total ... */
  total: string;
  /** status ... */
  status: BundleStatus;
  /** rewardTreasury ... */
  reward_treasury: string;
  /** rewardUploader ... */
  reward_uploader: string;
  /** rewardDelegation ... */
  reward_delegation: string;
  /** rewardTotal ... */
  reward_total: string;
}

/** EventSkippedUploaderRole is an event emitted when an uploader skips the upload */
export interface EventSkippedUploaderRole {
  /** pool_id ... */
  pool_id: string;
  /** id ... */
  id: string;
  /** previous_uploader ... */
  previous_uploader: string;
  /** new_uploader ... */
  new_uploader: string;
}

function createBaseEventBundleVote(): EventBundleVote {
  return { pool_id: "0", staker: "", storage_id: "", vote: VoteType.VOTE_TYPE_UNSPECIFIED };
}

export const EventBundleVote = {
  encode(message: EventBundleVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.storage_id !== "") {
      writer.uint32(26).string(message.storage_id);
    }
    if (message.vote !== VoteType.VOTE_TYPE_UNSPECIFIED) {
      writer.uint32(32).int32(voteTypeToNumber(message.vote));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBundleVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBundleVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
          break;
        case 3:
          message.storage_id = reader.string();
          break;
        case 4:
          message.vote = voteTypeFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBundleVote {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      vote: isSet(object.vote) ? voteTypeFromJSON(object.vote) : VoteType.VOTE_TYPE_UNSPECIFIED,
    };
  },

  toJSON(message: EventBundleVote): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.vote !== undefined && (obj.vote = voteTypeToJSON(message.vote));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBundleVote>, I>>(object: I): EventBundleVote {
    const message = createBaseEventBundleVote();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    message.storage_id = object.storage_id ?? "";
    message.vote = object.vote ?? VoteType.VOTE_TYPE_UNSPECIFIED;
    return message;
  },
};

function createBaseEventBundleProposed(): EventBundleProposed {
  return {
    pool_id: "0",
    id: "0",
    storage_id: "",
    uploader: "",
    byte_size: "0",
    from_height: "0",
    to_height: "0",
    from_key: "",
    to_key: "",
    value: "",
    bundle_hash: "",
    created_at: "0",
  };
}

export const EventBundleProposed = {
  encode(message: EventBundleProposed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.byte_size !== "0") {
      writer.uint32(40).uint64(message.byte_size);
    }
    if (message.from_height !== "0") {
      writer.uint32(48).uint64(message.from_height);
    }
    if (message.to_height !== "0") {
      writer.uint32(56).uint64(message.to_height);
    }
    if (message.from_key !== "") {
      writer.uint32(66).string(message.from_key);
    }
    if (message.to_key !== "") {
      writer.uint32(74).string(message.to_key);
    }
    if (message.value !== "") {
      writer.uint32(82).string(message.value);
    }
    if (message.bundle_hash !== "") {
      writer.uint32(90).string(message.bundle_hash);
    }
    if (message.created_at !== "0") {
      writer.uint32(96).uint64(message.created_at);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBundleProposed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBundleProposed();
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
          message.byte_size = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.from_height = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.to_height = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.from_key = reader.string();
          break;
        case 9:
          message.to_key = reader.string();
          break;
        case 10:
          message.value = reader.string();
          break;
        case 11:
          message.bundle_hash = reader.string();
          break;
        case 12:
          message.created_at = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBundleProposed {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      id: isSet(object.id) ? String(object.id) : "0",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
      uploader: isSet(object.uploader) ? String(object.uploader) : "",
      byte_size: isSet(object.byte_size) ? String(object.byte_size) : "0",
      from_height: isSet(object.from_height) ? String(object.from_height) : "0",
      to_height: isSet(object.to_height) ? String(object.to_height) : "0",
      from_key: isSet(object.from_key) ? String(object.from_key) : "",
      to_key: isSet(object.to_key) ? String(object.to_key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      bundle_hash: isSet(object.bundle_hash) ? String(object.bundle_hash) : "",
      created_at: isSet(object.created_at) ? String(object.created_at) : "0",
    };
  },

  toJSON(message: EventBundleProposed): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.id !== undefined && (obj.id = message.id);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    message.uploader !== undefined && (obj.uploader = message.uploader);
    message.byte_size !== undefined && (obj.byte_size = message.byte_size);
    message.from_height !== undefined && (obj.from_height = message.from_height);
    message.to_height !== undefined && (obj.to_height = message.to_height);
    message.from_key !== undefined && (obj.from_key = message.from_key);
    message.to_key !== undefined && (obj.to_key = message.to_key);
    message.value !== undefined && (obj.value = message.value);
    message.bundle_hash !== undefined && (obj.bundle_hash = message.bundle_hash);
    message.created_at !== undefined && (obj.created_at = message.created_at);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBundleProposed>, I>>(object: I): EventBundleProposed {
    const message = createBaseEventBundleProposed();
    message.pool_id = object.pool_id ?? "0";
    message.id = object.id ?? "0";
    message.storage_id = object.storage_id ?? "";
    message.uploader = object.uploader ?? "";
    message.byte_size = object.byte_size ?? "0";
    message.from_height = object.from_height ?? "0";
    message.to_height = object.to_height ?? "0";
    message.from_key = object.from_key ?? "";
    message.to_key = object.to_key ?? "";
    message.value = object.value ?? "";
    message.bundle_hash = object.bundle_hash ?? "";
    message.created_at = object.created_at ?? "0";
    return message;
  },
};

function createBaseEventBundleFinalized(): EventBundleFinalized {
  return {
    pool_id: "0",
    id: "0",
    valid: "0",
    invalid: "0",
    abstain: "0",
    total: "0",
    status: BundleStatus.BUNDLE_STATUS_UNSPECIFIED,
    reward_treasury: "0",
    reward_uploader: "0",
    reward_delegation: "0",
    reward_total: "0",
  };
}

export const EventBundleFinalized = {
  encode(message: EventBundleFinalized, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.valid !== "0") {
      writer.uint32(24).uint64(message.valid);
    }
    if (message.invalid !== "0") {
      writer.uint32(32).uint64(message.invalid);
    }
    if (message.abstain !== "0") {
      writer.uint32(40).uint64(message.abstain);
    }
    if (message.total !== "0") {
      writer.uint32(48).uint64(message.total);
    }
    if (message.status !== BundleStatus.BUNDLE_STATUS_UNSPECIFIED) {
      writer.uint32(56).int32(bundleStatusToNumber(message.status));
    }
    if (message.reward_treasury !== "0") {
      writer.uint32(64).uint64(message.reward_treasury);
    }
    if (message.reward_uploader !== "0") {
      writer.uint32(72).uint64(message.reward_uploader);
    }
    if (message.reward_delegation !== "0") {
      writer.uint32(80).uint64(message.reward_delegation);
    }
    if (message.reward_total !== "0") {
      writer.uint32(88).uint64(message.reward_total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBundleFinalized {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBundleFinalized();
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
          message.valid = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.invalid = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.abstain = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.total = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.status = bundleStatusFromJSON(reader.int32());
          break;
        case 8:
          message.reward_treasury = longToString(reader.uint64() as Long);
          break;
        case 9:
          message.reward_uploader = longToString(reader.uint64() as Long);
          break;
        case 10:
          message.reward_delegation = longToString(reader.uint64() as Long);
          break;
        case 11:
          message.reward_total = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBundleFinalized {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      id: isSet(object.id) ? String(object.id) : "0",
      valid: isSet(object.valid) ? String(object.valid) : "0",
      invalid: isSet(object.invalid) ? String(object.invalid) : "0",
      abstain: isSet(object.abstain) ? String(object.abstain) : "0",
      total: isSet(object.total) ? String(object.total) : "0",
      status: isSet(object.status) ? bundleStatusFromJSON(object.status) : BundleStatus.BUNDLE_STATUS_UNSPECIFIED,
      reward_treasury: isSet(object.reward_treasury) ? String(object.reward_treasury) : "0",
      reward_uploader: isSet(object.reward_uploader) ? String(object.reward_uploader) : "0",
      reward_delegation: isSet(object.reward_delegation) ? String(object.reward_delegation) : "0",
      reward_total: isSet(object.reward_total) ? String(object.reward_total) : "0",
    };
  },

  toJSON(message: EventBundleFinalized): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.id !== undefined && (obj.id = message.id);
    message.valid !== undefined && (obj.valid = message.valid);
    message.invalid !== undefined && (obj.invalid = message.invalid);
    message.abstain !== undefined && (obj.abstain = message.abstain);
    message.total !== undefined && (obj.total = message.total);
    message.status !== undefined && (obj.status = bundleStatusToJSON(message.status));
    message.reward_treasury !== undefined && (obj.reward_treasury = message.reward_treasury);
    message.reward_uploader !== undefined && (obj.reward_uploader = message.reward_uploader);
    message.reward_delegation !== undefined && (obj.reward_delegation = message.reward_delegation);
    message.reward_total !== undefined && (obj.reward_total = message.reward_total);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBundleFinalized>, I>>(object: I): EventBundleFinalized {
    const message = createBaseEventBundleFinalized();
    message.pool_id = object.pool_id ?? "0";
    message.id = object.id ?? "0";
    message.valid = object.valid ?? "0";
    message.invalid = object.invalid ?? "0";
    message.abstain = object.abstain ?? "0";
    message.total = object.total ?? "0";
    message.status = object.status ?? BundleStatus.BUNDLE_STATUS_UNSPECIFIED;
    message.reward_treasury = object.reward_treasury ?? "0";
    message.reward_uploader = object.reward_uploader ?? "0";
    message.reward_delegation = object.reward_delegation ?? "0";
    message.reward_total = object.reward_total ?? "0";
    return message;
  },
};

function createBaseEventSkippedUploaderRole(): EventSkippedUploaderRole {
  return { pool_id: "0", id: "0", previous_uploader: "", new_uploader: "" };
}

export const EventSkippedUploaderRole = {
  encode(message: EventSkippedUploaderRole, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.previous_uploader !== "") {
      writer.uint32(26).string(message.previous_uploader);
    }
    if (message.new_uploader !== "") {
      writer.uint32(34).string(message.new_uploader);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSkippedUploaderRole {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSkippedUploaderRole();
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
          message.previous_uploader = reader.string();
          break;
        case 4:
          message.new_uploader = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSkippedUploaderRole {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      id: isSet(object.id) ? String(object.id) : "0",
      previous_uploader: isSet(object.previous_uploader) ? String(object.previous_uploader) : "",
      new_uploader: isSet(object.new_uploader) ? String(object.new_uploader) : "",
    };
  },

  toJSON(message: EventSkippedUploaderRole): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.id !== undefined && (obj.id = message.id);
    message.previous_uploader !== undefined && (obj.previous_uploader = message.previous_uploader);
    message.new_uploader !== undefined && (obj.new_uploader = message.new_uploader);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSkippedUploaderRole>, I>>(object: I): EventSkippedUploaderRole {
    const message = createBaseEventSkippedUploaderRole();
    message.pool_id = object.pool_id ?? "0";
    message.id = object.id ?? "0";
    message.previous_uploader = object.previous_uploader ?? "";
    message.new_uploader = object.new_uploader ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

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
