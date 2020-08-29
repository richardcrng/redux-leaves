import { LCA, CustomReducerDefinition, CustomReducerCreator } from "../types";
import makeCreatorOfTypeFromPath from "../create/makeCreatorOfTypeFromPath";

function customLeafCreator<PayloadT, ArgsT extends unknown[]>(
  path: (string | number)[],
  reducerDefinition: CustomReducerDefinition
) {
  const makeCreatorOfType = makeCreatorOfTypeFromPath(path)



}

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