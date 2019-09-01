import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import Dict from "../../types/Dict";

class ActionsProxy {
  _path: (string | number)[]
  [key: string]: any;

  constructor(actionsDict: Dict<LeafReducerConfig>, path: (string | number)[] = []) {
    this._path = path

    return new Proxy(this, {
      get: (obj, prop: string | number) => {
        if (prop === '_path') {
          return path
        } else if (prop === 'create') {
          return {

          }
        } else {
          return new ActionsProxy(actionsDict, [...path, prop])
        }
      }
    })
  }
}

export default ActionsProxy