import ActionsLeaf from "../Leaf";

type ActionsBranch = ActionsLeaf & ActionsBranchDict

interface ActionsBranchDict {
  [key: string]: ActionsBranch
}

export default ActionsBranch