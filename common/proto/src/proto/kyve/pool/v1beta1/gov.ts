/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.pool.v1beta1";

/** GovMsgCreatePool defines a SDK message for creating a pool. */
export interface GovMsgCreatePool {
  /** title ... */
  creator: string;
  /** name ... */
  name: string;
  /** runtime ... */
  runtime: string;
  /** logo ... */
  logo: string;
  /** config ... */
  config: string;
  /** start_key ... */
  start_key: string;
  /** upload_interval ... */
  upload_interval: string;
  /** operating_cost ... */
  operating_cost: string;
  /** min_stake ... */
  min_stake: string;
  /** max_bundle_size ... */
  max_bundle_size: string;
  /** version ... */
  version: string;
  /** binaries ... */
  binaries: string;
}

/** GovMsgCreatePoolResponse ... */
export interface GovMsgCreatePoolResponse {}

/** GovMsgUpdatePool is a gov Content type for updating a pool. */
export interface GovMsgUpdatePool {
  /** creator ... */
  creator: string;
  /** id ... */
  id: string;
  /** payload */
  payload: string;
}

/** GovMsgUpdatePoolResponse ... */
export interface GovMsgUpdatePoolResponse {}

/** PausePoolProposal is a gov Content type for pausing a pool. */
export interface GovMsgPausePool {
  /** title ... */
  creator: string;
  /** id ... */
  id: string;
}

/** GovMsgPausePoolResponse ... */
export interface GovMsgPausePoolResponse {}

/** UnpausePoolProposal is a gov Content type for unpausing a pool. */
export interface GovMsgUnpausePool {
  /** title ... */
  creator: string;
  /** id ... */
  id: string;
}

/** GovMsgUnpausePoolResponse ... */
export interface GovMsgUnpausePoolResponse {}

/** SchedulePoolUpgradeProposal is a gov Content type for upgrading a pool by the runtime. */
export interface GovMsgPoolUpgrade {
  /** creator ... */
  creator: string;
  /** runtime ... */
  runtime: string;
  /** version ... */
  version: string;
  /** scheduled_at ... */
  scheduled_at: string;
  /** duration ... */
  duration: string;
  /** binaries ... */
  binaries: string;
}

/** GovMsgPoolUpgradeResponse ... */
export interface GovMsgPoolUpgradeResponse {}

/** CancelPoolUpgradeProposal is a gov Content type for cancelling a scheduled pool upgrade by the runtime. */
export interface GovMsgCancelPoolUpgrade {
  /** title ... */
  creator: string;
  /** runtime ... */
  runtime: string;
}

/** GovMsgCancelPoolUpgradeResponse ... */
export interface GovMsgCancelPoolUpgradeResponse {}

/** GovMsgResetPool ... */
export interface GovMsgResetPool {
  /** creator ... */
  creator: string;
  /** id ... */
  id: string;
  /** bundle_id ... */
  bundle_id: string;
}

/** GovMsgResetPoolResponse ... */
export interface GovMsgResetPoolResponse {}

function createBaseGovMsgCreatePool(): GovMsgCreatePool {
  return {
    creator: "",
    name: "",
    runtime: "",
    logo: "",
    config: "",
    start_key: "",
    upload_interval: "0",
    operating_cost: "0",
    min_stake: "0",
    max_bundle_size: "0",
    version: "",
    binaries: "",
  };
}

export const GovMsgCreatePool = {
  encode(
    message: GovMsgCreatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.runtime !== "") {
      writer.uint32(34).string(message.runtime);
    }
    if (message.logo !== "") {
      writer.uint32(42).string(message.logo);
    }
    if (message.config !== "") {
      writer.uint32(50).string(message.config);
    }
    if (message.start_key !== "") {
      writer.uint32(58).string(message.start_key);
    }
    if (message.upload_interval !== "0") {
      writer.uint32(64).uint64(message.upload_interval);
    }
    if (message.operating_cost !== "0") {
      writer.uint32(72).uint64(message.operating_cost);
    }
    if (message.min_stake !== "0") {
      writer.uint32(80).uint64(message.min_stake);
    }
    if (message.max_bundle_size !== "0") {
      writer.uint32(88).uint64(message.max_bundle_size);
    }
    if (message.version !== "") {
      writer.uint32(98).string(message.version);
    }
    if (message.binaries !== "") {
      writer.uint32(106).string(message.binaries);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgCreatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgCreatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.runtime = reader.string();
          break;
        case 5:
          message.logo = reader.string();
          break;
        case 6:
          message.config = reader.string();
          break;
        case 7:
          message.start_key = reader.string();
          break;
        case 8:
          message.upload_interval = longToString(reader.uint64() as Long);
          break;
        case 9:
          message.operating_cost = longToString(reader.uint64() as Long);
          break;
        case 10:
          message.min_stake = longToString(reader.uint64() as Long);
          break;
        case 11:
          message.max_bundle_size = longToString(reader.uint64() as Long);
          break;
        case 12:
          message.version = reader.string();
          break;
        case 13:
          message.binaries = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgCreatePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      runtime: isSet(object.runtime) ? String(object.runtime) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      config: isSet(object.config) ? String(object.config) : "",
      start_key: isSet(object.start_key) ? String(object.start_key) : "",
      upload_interval: isSet(object.upload_interval)
        ? String(object.upload_interval)
        : "0",
      operating_cost: isSet(object.operating_cost)
        ? String(object.operating_cost)
        : "0",
      min_stake: isSet(object.min_stake) ? String(object.min_stake) : "0",
      max_bundle_size: isSet(object.max_bundle_size)
        ? String(object.max_bundle_size)
        : "0",
      version: isSet(object.version) ? String(object.version) : "",
      binaries: isSet(object.binaries) ? String(object.binaries) : "",
    };
  },

  toJSON(message: GovMsgCreatePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.runtime !== undefined && (obj.runtime = message.runtime);
    message.logo !== undefined && (obj.logo = message.logo);
    message.config !== undefined && (obj.config = message.config);
    message.start_key !== undefined && (obj.start_key = message.start_key);
    message.upload_interval !== undefined &&
      (obj.upload_interval = message.upload_interval);
    message.operating_cost !== undefined &&
      (obj.operating_cost = message.operating_cost);
    message.min_stake !== undefined && (obj.min_stake = message.min_stake);
    message.max_bundle_size !== undefined &&
      (obj.max_bundle_size = message.max_bundle_size);
    message.version !== undefined && (obj.version = message.version);
    message.binaries !== undefined && (obj.binaries = message.binaries);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgCreatePool>, I>>(
    object: I
  ): GovMsgCreatePool {
    const message = createBaseGovMsgCreatePool();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.runtime = object.runtime ?? "";
    message.logo = object.logo ?? "";
    message.config = object.config ?? "";
    message.start_key = object.start_key ?? "";
    message.upload_interval = object.upload_interval ?? "0";
    message.operating_cost = object.operating_cost ?? "0";
    message.min_stake = object.min_stake ?? "0";
    message.max_bundle_size = object.max_bundle_size ?? "0";
    message.version = object.version ?? "";
    message.binaries = object.binaries ?? "";
    return message;
  },
};

function createBaseGovMsgCreatePoolResponse(): GovMsgCreatePoolResponse {
  return {};
}

export const GovMsgCreatePoolResponse = {
  encode(
    _: GovMsgCreatePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgCreatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgCreatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgCreatePoolResponse {
    return {};
  },

  toJSON(_: GovMsgCreatePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgCreatePoolResponse>, I>>(
    _: I
  ): GovMsgCreatePoolResponse {
    const message = createBaseGovMsgCreatePoolResponse();
    return message;
  },
};

function createBaseGovMsgUpdatePool(): GovMsgUpdatePool {
  return { creator: "", id: "0", payload: "" };
}

export const GovMsgUpdatePool = {
  encode(
    message: GovMsgUpdatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.payload !== "") {
      writer.uint32(26).string(message.payload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgUpdatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgUpdatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.payload = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgUpdatePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
      payload: isSet(object.payload) ? String(object.payload) : "",
    };
  },

  toJSON(message: GovMsgUpdatePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.payload !== undefined && (obj.payload = message.payload);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgUpdatePool>, I>>(
    object: I
  ): GovMsgUpdatePool {
    const message = createBaseGovMsgUpdatePool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    message.payload = object.payload ?? "";
    return message;
  },
};

function createBaseGovMsgUpdatePoolResponse(): GovMsgUpdatePoolResponse {
  return {};
}

export const GovMsgUpdatePoolResponse = {
  encode(
    _: GovMsgUpdatePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgUpdatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgUpdatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgUpdatePoolResponse {
    return {};
  },

  toJSON(_: GovMsgUpdatePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgUpdatePoolResponse>, I>>(
    _: I
  ): GovMsgUpdatePoolResponse {
    const message = createBaseGovMsgUpdatePoolResponse();
    return message;
  },
};

function createBaseGovMsgPausePool(): GovMsgPausePool {
  return { creator: "", id: "0" };
}

export const GovMsgPausePool = {
  encode(
    message: GovMsgPausePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgPausePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgPausePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgPausePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
    };
  },

  toJSON(message: GovMsgPausePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgPausePool>, I>>(
    object: I
  ): GovMsgPausePool {
    const message = createBaseGovMsgPausePool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseGovMsgPausePoolResponse(): GovMsgPausePoolResponse {
  return {};
}

export const GovMsgPausePoolResponse = {
  encode(
    _: GovMsgPausePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgPausePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgPausePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgPausePoolResponse {
    return {};
  },

  toJSON(_: GovMsgPausePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgPausePoolResponse>, I>>(
    _: I
  ): GovMsgPausePoolResponse {
    const message = createBaseGovMsgPausePoolResponse();
    return message;
  },
};

function createBaseGovMsgUnpausePool(): GovMsgUnpausePool {
  return { creator: "", id: "0" };
}

export const GovMsgUnpausePool = {
  encode(
    message: GovMsgUnpausePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgUnpausePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgUnpausePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgUnpausePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
    };
  },

  toJSON(message: GovMsgUnpausePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgUnpausePool>, I>>(
    object: I
  ): GovMsgUnpausePool {
    const message = createBaseGovMsgUnpausePool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseGovMsgUnpausePoolResponse(): GovMsgUnpausePoolResponse {
  return {};
}

export const GovMsgUnpausePoolResponse = {
  encode(
    _: GovMsgUnpausePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgUnpausePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgUnpausePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgUnpausePoolResponse {
    return {};
  },

  toJSON(_: GovMsgUnpausePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgUnpausePoolResponse>, I>>(
    _: I
  ): GovMsgUnpausePoolResponse {
    const message = createBaseGovMsgUnpausePoolResponse();
    return message;
  },
};

function createBaseGovMsgPoolUpgrade(): GovMsgPoolUpgrade {
  return {
    creator: "",
    runtime: "",
    version: "",
    scheduled_at: "0",
    duration: "0",
    binaries: "",
  };
}

export const GovMsgPoolUpgrade = {
  encode(
    message: GovMsgPoolUpgrade,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.runtime !== "") {
      writer.uint32(18).string(message.runtime);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.scheduled_at !== "0") {
      writer.uint32(32).uint64(message.scheduled_at);
    }
    if (message.duration !== "0") {
      writer.uint32(40).uint64(message.duration);
    }
    if (message.binaries !== "") {
      writer.uint32(50).string(message.binaries);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgPoolUpgrade {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgPoolUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.runtime = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.scheduled_at = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.duration = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.binaries = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgPoolUpgrade {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      runtime: isSet(object.runtime) ? String(object.runtime) : "",
      version: isSet(object.version) ? String(object.version) : "",
      scheduled_at: isSet(object.scheduled_at)
        ? String(object.scheduled_at)
        : "0",
      duration: isSet(object.duration) ? String(object.duration) : "0",
      binaries: isSet(object.binaries) ? String(object.binaries) : "",
    };
  },

  toJSON(message: GovMsgPoolUpgrade): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.runtime !== undefined && (obj.runtime = message.runtime);
    message.version !== undefined && (obj.version = message.version);
    message.scheduled_at !== undefined &&
      (obj.scheduled_at = message.scheduled_at);
    message.duration !== undefined && (obj.duration = message.duration);
    message.binaries !== undefined && (obj.binaries = message.binaries);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgPoolUpgrade>, I>>(
    object: I
  ): GovMsgPoolUpgrade {
    const message = createBaseGovMsgPoolUpgrade();
    message.creator = object.creator ?? "";
    message.runtime = object.runtime ?? "";
    message.version = object.version ?? "";
    message.scheduled_at = object.scheduled_at ?? "0";
    message.duration = object.duration ?? "0";
    message.binaries = object.binaries ?? "";
    return message;
  },
};

function createBaseGovMsgPoolUpgradeResponse(): GovMsgPoolUpgradeResponse {
  return {};
}

export const GovMsgPoolUpgradeResponse = {
  encode(
    _: GovMsgPoolUpgradeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgPoolUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgPoolUpgradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgPoolUpgradeResponse {
    return {};
  },

  toJSON(_: GovMsgPoolUpgradeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgPoolUpgradeResponse>, I>>(
    _: I
  ): GovMsgPoolUpgradeResponse {
    const message = createBaseGovMsgPoolUpgradeResponse();
    return message;
  },
};

function createBaseGovMsgCancelPoolUpgrade(): GovMsgCancelPoolUpgrade {
  return { creator: "", runtime: "" };
}

export const GovMsgCancelPoolUpgrade = {
  encode(
    message: GovMsgCancelPoolUpgrade,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.runtime !== "") {
      writer.uint32(18).string(message.runtime);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgCancelPoolUpgrade {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgCancelPoolUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.runtime = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgCancelPoolUpgrade {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      runtime: isSet(object.runtime) ? String(object.runtime) : "",
    };
  },

  toJSON(message: GovMsgCancelPoolUpgrade): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.runtime !== undefined && (obj.runtime = message.runtime);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgCancelPoolUpgrade>, I>>(
    object: I
  ): GovMsgCancelPoolUpgrade {
    const message = createBaseGovMsgCancelPoolUpgrade();
    message.creator = object.creator ?? "";
    message.runtime = object.runtime ?? "";
    return message;
  },
};

function createBaseGovMsgCancelPoolUpgradeResponse(): GovMsgCancelPoolUpgradeResponse {
  return {};
}

export const GovMsgCancelPoolUpgradeResponse = {
  encode(
    _: GovMsgCancelPoolUpgradeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgCancelPoolUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgCancelPoolUpgradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgCancelPoolUpgradeResponse {
    return {};
  },

  toJSON(_: GovMsgCancelPoolUpgradeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgCancelPoolUpgradeResponse>, I>>(
    _: I
  ): GovMsgCancelPoolUpgradeResponse {
    const message = createBaseGovMsgCancelPoolUpgradeResponse();
    return message;
  },
};

function createBaseGovMsgResetPool(): GovMsgResetPool {
  return { creator: "", id: "0", bundle_id: "0" };
}

export const GovMsgResetPool = {
  encode(
    message: GovMsgResetPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.bundle_id !== "0") {
      writer.uint32(24).uint64(message.bundle_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgResetPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgResetPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.bundle_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgResetPool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
      bundle_id: isSet(object.bundle_id) ? String(object.bundle_id) : "0",
    };
  },

  toJSON(message: GovMsgResetPool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.bundle_id !== undefined && (obj.bundle_id = message.bundle_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgResetPool>, I>>(
    object: I
  ): GovMsgResetPool {
    const message = createBaseGovMsgResetPool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    message.bundle_id = object.bundle_id ?? "0";
    return message;
  },
};

function createBaseGovMsgResetPoolResponse(): GovMsgResetPoolResponse {
  return {};
}

export const GovMsgResetPoolResponse = {
  encode(
    _: GovMsgResetPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgResetPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgResetPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgResetPoolResponse {
    return {};
  },

  toJSON(_: GovMsgResetPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgResetPoolResponse>, I>>(
    _: I
  ): GovMsgResetPoolResponse {
    const message = createBaseGovMsgResetPoolResponse();
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
