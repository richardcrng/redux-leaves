import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import actionsCreate from "../create";
import { Dictionary } from "ramda";

class ActionsProxy<S extends Dictionary<any> = Dictionary<any>, D extends Dictionary<LeafReducerConfig> = Dictionary<LeafReducerConfig>> {
  // [K in S]: any;

  constructor(stateShape: S, actionsDict: D, path: (string | number)[] = []) {
    return new Proxy(stateShape, {
      get: (obj, prop: string) => {
        switch (prop) {
          case 'create': return actionsCreate<D>(actionsDict, path)
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