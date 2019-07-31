import FluxStandardAction from "../FluxStandardAction";
import LeafActionData from "../LeafAction/Data";

type LeafStandardAction = FluxStandardAction & {
  leaf: LeafActionData
}

export default LeafStandardAction