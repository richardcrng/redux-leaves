import FluxStandardAction from "../FluxStandardAction";

type LeafStandardAction = FluxStandardAction & {
  path: string[]
  creatorKey: string
  CREATOR_KEY: string
  custom?: boolean
}

export default LeafStandardAction