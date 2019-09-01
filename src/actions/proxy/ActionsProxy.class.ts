import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import Dict from "../../types/Dict";
import actionsAPI from '../api';

class ActionsProxy {
  _path: string[]
  [key: string]: any;

  constructor(stateShape: Dict<any>, actionsDict: Dict<LeafReducerConfig>, path: string[] = []) {
    this._path = path

    return new Proxy(this, {
      get: (obj, prop: string) => {
        switch (prop) {
          case '_path': return path
          case 'create': return actionsAPI(stateShape, actionsDict, path)
          default: return new ActionsProxy(stateShape, actionsDict, [...path, prop])
        }
      }
    })
  }
}

export default ActionsProxy