import LeafStandardAction from "../../../../Actions/LSA";

type LeafCreatorAPIDefaults = {
  apply(callback: (leafState: any, treeState: any) => any): LeafStandardAction
  clear(toNull?: boolean): LeafStandardAction
  reset(): LeafStandardAction
  update(value: any): LeafStandardAction
}

export default LeafCreatorAPIDefaults