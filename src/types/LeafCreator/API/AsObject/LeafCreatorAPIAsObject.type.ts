import LeafStandardAction from "../../../LeafStandardAction";

type LeafCreatorAPIAsObject = {
  assign(...sources: object[]): LeafStandardAction
  set(path: string[], value: any): LeafStandardAction
}

export default LeafCreatorAPIAsObject