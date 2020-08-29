import { LCA } from "../types";
import { getState } from "../utils/update-state";


function customLeafReducer<
  LeafT,
  TreeT,
  ActionT extends LCA
>(
  leafState: LeafT,
  treeState: TreeT,
  action: ActionT,
  originalState: TreeT
): LeafT {

  


  return leafState
}

export default customLeafReducer