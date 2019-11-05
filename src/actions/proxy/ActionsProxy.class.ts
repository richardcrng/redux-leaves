import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import Dict from "../../types/Dict";
import actionsCreate from "../create";

class ActionsProxy {
  [key: string]: any;

  constructor(stateShape: Dict<any>, actionsDict: Dict<LeafReducerConfig>, path: string[] = []) {
    return new Proxy(this, {
      get: (obj, prop: string) => {
        switch (prop) {
          case 'create': return actionsCreate(stateShape, actionsDict, path)
          default: return new ActionsProxy(stateShape, actionsDict, [...path, prop])
        }
      }
    })
  }
}

export default ActionsProxy