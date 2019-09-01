import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import Dict from "../../types/Dict";
import createActionsProxy from "./createActionsProxy";

class ActionsProxy {
  _path: (string | number | symbol)[]
  [key: string]: any;

  constructor(actionsDict: Dict<LeafReducerConfig>, path: (string | number | symbol)[] = []) {
    this._path = path

    return new Proxy(this, {
      get: (obj, prop) => {
        if (prop === '_path') {
          return path
        } else if (prop === 'create') {
          // return create API
        } else {
          return createActionsProxy([...path, prop])
        }
      }
    })
  }
}

export default ActionsProxy