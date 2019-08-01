import Dict from "../../Dict";
import StateBranch from "../Branch";
import StateLeaf from "../Leaf";

type StateTree = Dict<StateBranch | StateLeaf>

export default StateTree