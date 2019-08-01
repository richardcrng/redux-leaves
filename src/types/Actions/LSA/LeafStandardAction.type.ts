import FluxStandardAction from "../FSA";
import LeafActionData from "../../LeafAction/Data";

type LeafStandardAction = FluxStandardAction & {
  leaf: LeafActionData
}

export default LeafStandardAction