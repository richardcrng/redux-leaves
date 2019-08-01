import FluxStandardAction from "../FSA";
import LeafActionData from "../../Leaf/Action/Data";

type LeafStandardAction = FluxStandardAction & {
  leaf: LeafActionData
}

export default LeafStandardAction