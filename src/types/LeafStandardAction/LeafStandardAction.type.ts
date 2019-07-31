import FluxStandardAction from "../FluxStandardAction";
import LeafActionData from "../LeafActionData";

type LeafStandardAction = FluxStandardAction & {
  leaf: LeafActionData
}

export default LeafStandardAction