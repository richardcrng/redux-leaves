import ActionsLeaf from "../Leaf";
import LeafCreatorAPI from "../../Leaf/Creator/API";

type ActionsBranch = ActionsLeaf & ActionsBranchDict

interface ActionsBranchDict {
  [key: string]: ActionsBranch | LeafCreatorAPI
}

export default ActionsBranch