import LeafStandardAction from "../../../LeafStandardAction";

type LeafCreatorAPIAsString = {
  concat(...strings: string[]): LeafStandardAction
  replace(pattern: string | RegExp, replacement: string): LeafStandardAction
}

export default LeafCreatorAPIAsString