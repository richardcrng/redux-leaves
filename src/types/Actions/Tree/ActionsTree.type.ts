import ActionsLeaf from "../Leaf";
import Dict from "../../Dict";
import ActionsBranch from "../Branch";
import LeafCreatorAPI from "../../Leaf/Creator/API";

type ActionsTree = Dict<ActionsBranch | LeafCreatorAPI> & ActionsLeaf

export default ActionsTree