import LeafStandardAction from "../../../Actions/LSA";

type LeafCreatorAPIAsBoolean = {
  off(): LeafStandardAction
  on(): LeafStandardAction
  toggle(): LeafStandardAction
}

export default LeafCreatorAPIAsBoolean