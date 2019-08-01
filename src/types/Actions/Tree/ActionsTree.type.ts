import ActionsLeaf from "../Leaf";
import Dict from "../../Dict";
import ActionsBranch from "../Branch";

type ActionsTree = ActionsLeaf & Dict<ActionsBranch>

export default ActionsTree