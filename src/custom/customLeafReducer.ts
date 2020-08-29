import { LCA, CustomReducerDefinition } from "../types";


function customLeafReducer<
  LeafT,
  TreeT,
  ActionT extends LCA
>(
  leafState: LeafT,
  treeState: TreeT,
  action: ActionT,
  reducerDefinition: CustomReducerDefinition<{
    leafState: LeafT,
    treeState: TreeT,
  }>
): LeafT {
  return reducerDefinition.reducer(leafState, action, treeState)
}

export default customLeafReducer