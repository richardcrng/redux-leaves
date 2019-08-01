import Dict from "../../Dict";
import StateLeaf from "../Leaf";

type StateBranch = StateBranchDict & Dict<StateLeaf>

interface StateBranchDict {
  [key: string]: StateBranch
}

export default StateBranch