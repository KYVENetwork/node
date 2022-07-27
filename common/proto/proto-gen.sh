#!/bin/bash

# Prepare all proto files in one temp folder
rm -rf /temp
mkdir -p "./temp/proto/cosmos_proto"
TENDERMINT_V=v0.34.19
COSMOS_PROTO_V=v0.3.1
cp -r ./node_modules/@protobufs/gogoproto ./temp/proto/gogoproto
cp -r ./node_modules/@protobufs/google ./temp/proto/google
cp -r ./cosmos-sdk/proto/cosmos ./temp/proto/cosmos
git -C ./temp clone -b ${TENDERMINT_V} --single-branch https://github.com/tendermint/tendermint.git
git -C ./temp clone -b ${COSMOS_PROTO_V} --single-branch https://github.com/regen-network/cosmos-proto.git
cp -r ./temp/tendermint/proto/tendermint ./temp/proto/tendermint
cp -r ./temp/cosmos-proto/cosmos.proto ./temp/proto/cosmos_proto/cosmos.proto
# Finish preparing proto files

# generate TypeScript proto
PROTO_DIR="./temp/proto"
PROTOC_GEN_TS_PROTO_PATH="./node_modules/.bin/protoc-gen-ts_proto"
OUT_DIR="./src/proto"
KYVE_PROTO='./chain/proto'
protoc --plugin="protoc-gen-ts_proto=${PROTOC_GEN_TS_PROTO_PATH}" \
--ts_proto_out="${OUT_DIR}" \
--ts_proto_opt="esModuleInterop=true,forceLong=string,useOptionals=messages,snakeToCamel=false" \
--proto_path="$PROTO_DIR" \
--proto_path="$KYVE_PROTO" \
$(find ${PROTO_DIR}  -path -prune -o -name '*.proto' -print0 | xargs -0) \
$(find ${KYVE_PROTO}  -path -prune -o -name '*.proto' -print0 | xargs -0)

# generate TypeScript proto response with string enums
PROTO_DIR="./temp/proto"
PROTOC_GEN_TS_PROTO_PATH="./node_modules/.bin/protoc-gen-ts_proto"
OUT_DIR2="./src/proto-res"
KYVE_PROTO='./chain/proto'
protoc --plugin="protoc-gen-ts_proto=${PROTOC_GEN_TS_PROTO_PATH}" \
--ts_proto_out="${OUT_DIR2}" \
--ts_proto_opt="esModuleInterop=true,forceLong=string,useOptionals=messages,snakeToCamel=false,stringEnums=true" \
--proto_path="$PROTO_DIR" \
--proto_path="$KYVE_PROTO" \
$(find ${PROTO_DIR}  -path -prune -o -name '*.proto' -print0 | xargs -0) \
$(find ${KYVE_PROTO}  -path -prune -o -name '*.proto' -print0 | xargs -0)

rm -rf ./temp