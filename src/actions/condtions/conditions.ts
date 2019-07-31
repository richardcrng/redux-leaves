import LeafCreatorCondition from "../../types/LeafCreatorCondition";

export const conditions: {
  ARRAY: LeafCreatorCondition
  BOOLEAN: LeafCreatorCondition,
  NUMBER: LeafCreatorCondition
  STRING: LeafCreatorCondition
  OBJECT: LeafCreatorCondition
} = {
  ARRAY: "asArray",
  BOOLEAN: "asBoolean",
  NUMBER: "asNumber",
  STRING: "asString",
  OBJECT: "asObject"
}