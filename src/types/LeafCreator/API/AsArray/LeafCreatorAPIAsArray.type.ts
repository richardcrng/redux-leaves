import LeafStandardAction from "../../../Actions/LSA";

type LeafCreatorAPIAsArray = {
  concat(array: any[]): LeafStandardAction
  drop(n?: number): LeafStandardAction
  filter(callback: (element: any, index: number, array: any[]) => any[]): LeafStandardAction
  push(element: any, index?: number, replace?: boolean): LeafStandardAction
}

export default LeafCreatorAPIAsArray