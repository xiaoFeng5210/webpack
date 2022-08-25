const protobuf = require('protobufjs');
const serializer = require('proto3-json-serializer');

const pb_struct = protobuf.loadSync('google/protobuf/struct.proto');
const Value = pb_struct.lookupType('google.protobuf.Value');

const json = {
    i32:1,
    enum: 'ENUM_TWO',
    vecI32:[1,2,3]
};
const deserialized = serializer.fromProto3JSON(Value, json);
console.log(deserialized);

// And serialize it back
const serialized = serializer.toProto3JSON(deserialized);
console.log(serialized);

