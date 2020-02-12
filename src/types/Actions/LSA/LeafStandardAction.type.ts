import FluxStandardAction from "../FSA";
import LeafActionData from "../../Leaf/Action/Data";

type LeafStandardAction<P = any> = FluxStandardAction<P> & {
  leaf: LeafActionData
}

export default LeafStandardAction