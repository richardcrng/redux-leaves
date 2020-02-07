import actionsCreate from "../create";
import LeafReducerDict from "../../types/Leaf/Reducer/Dict";
import Dict from "../../types/Dict";

class ActionsProxy<S extends Dict<any> = Dict<any>, D = LeafReducerDict> {
  constructor(stateShape: S, actionsDict: D, path: (string | number)[] = []) {
    return new Proxy<S>(stateShape, {
      get: (obj, prop: Extract<keyof S, string> | 'create') => {
        if (prop === 'create') return actionsCreate<D>(actionsDict, path)
        
        const targetValue = stateShape[prop]
        const proxySource = typeof stateShape === 'object'
          ? targetValue
          : {}

        return new ActionsProxy(proxySource, actionsDict, [...path, propForPath(prop)])
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