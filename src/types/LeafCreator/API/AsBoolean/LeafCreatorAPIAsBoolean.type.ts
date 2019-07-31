import LeafStandardAction from "../../../LeafStandardAction";

type LeafCreatorAPIAsBoolean = {
  off(): LeafStandardAction
  on(): LeafStandardAction
  toggle(): LeafStandardAction
}

export default LeafCreatorAPIAsBoolean