import LeafReducerConfig from "../../types/Leaf/Reducer/Config";
import actionsCreate from "../create";
import LeafReducerDict from "../../types/Leaf/Reducer/Dict";
import Dict from "../../types/Dict";

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

function proxyActions<S extends Dict<any> = Dict<any>>() {

}

class ActionsProxy<S extends Dict<any> = Dict<any>, D = LeafReducerDict> {
  constructor(stateShape: S, actionsDict: D, path: (string | number)[] = []) {
    return new Proxy<S>(stateShape, {
      get: (obj, prop: string) => {
        switch (prop) {
          case 'create': return actionsCreate<D>(actionsDict, path)
          default: return new ActionsProxy({}, actionsDict, [...path, propForPath(prop)])
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