import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import Dict from "../../types/Dict";
import actionsCreate from "../create";

class ActionsProxy {
  [key: string]: any;

  constructor(stateShape: Dict<any>, actionsDict: Dict<LeafReducerConfig>, path: (string | number)[] = []) {
    return new Proxy(this, {
      get: (obj, prop: string) => {
        switch (prop) {
          case 'create': return actionsCreate(stateShape, actionsDict, path)
          default: return new ActionsProxy(stateShape, actionsDict, [...path, propForPath(prop)])
        }
      }
    })
  }
}

const propForPath = (prop: string): string | number => (
  isFixedString(prop)
    ? parseInt(prop)
    : prop
) 

const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s)

export default ActionsProxy