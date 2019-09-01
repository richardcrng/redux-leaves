import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import Dict from "../../types/Dict";
import actionsAPI from '../api';

class ActionsProxy {
  _path: (string | number)[]
  [key: string]: any;

  constructor(stateShape: Dict<any>, actionsDict: Dict<LeafReducerConfig>, path: (string | number)[] = []) {
    this._path = path

    return new Proxy(this, {
      get: (obj, prop: string | number) => {
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