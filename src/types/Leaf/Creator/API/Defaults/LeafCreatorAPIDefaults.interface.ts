import LeafStandardAction from "../../../../Actions/LSA";

interface LeafCreatorAPIDefaults {
  apply: (callback: (leafState: any, treeState: any) => any) => LeafStandardAction,
  assign: (...sources: object[]) => LeafStandardAction,
  clear: (toNull?: boolean) => LeafStandardAction,
  concat: (arrayOrString: any[] | string) => LeafStandardAction,
  drop: (n?: number) => LeafStandardAction,
  filter: (callback: (element: any, index: number, array: any[]) => any[]) => LeafStandardAction,
  off: () => LeafStandardAction,
  on: () => LeafStandardAction,
  path: (path: (string | number)[], value: any) => LeafStandardAction,
  push: (element: any, index?: number, replace?: boolean) => LeafStandardAction,
  pushedSet: (value: any) => LeafStandardAction,
  // replace: (pattern: string | RegExp, replacement: string) => LeafStandardAction,
  reset: () => LeafStandardAction,
  set: (key: string, value: any) => LeafStandardAction,
  toggle: () => LeafStandardAction,
  update: (newVal: any) => LeafStandardAction
}

export default LeafCreatorAPIDefaults