import LeafStandardAction from "../../../../Actions/LSA";

type LeafCreatorAPIAsObject = {
  assign(...sources: object[]): LeafStandardAction
  path(path: string[], value: any): LeafStandardAction
  set(key: string, value: any): LeafStandardAction
}

export default LeafCreatorAPIAsObject