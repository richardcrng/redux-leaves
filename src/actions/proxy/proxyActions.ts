import * as RA from 'ramda-adjunct'
import actionsCreate from "../create";
import LeafReducerDict from "../../types/Leaf/Reducer/Dict";
import Dict from "../../types/Dict";
import ProxiedActions from '../../types/Actions/Proxied';

function proxyActions<S extends Dict<any> = Dict<any>, D = LeafReducerDict>(
  stateShape: S,
  actionsDict: D,
  path: (string | number)[] = []
): ProxiedActions<S, D> {
  
  const proxy = new Proxy<S>(stateShape, {
    get: (obj: any, prop: Extract<keyof S, string> | 'create') => {
      if (prop === 'create') return actionsCreate<D>(actionsDict, path)

      const targetValue = stateShape[prop]
      const proxySource = RA.isObjLike(targetValue)
        ? targetValue
        : {}

      return proxyActions(proxySource, actionsDict, [...path, propForPath(prop)])
    }
  })

  // @ts-ignore
  return proxy as ProxiedActions<S, D>
}


const propForPath = (prop: string): string | number => (
  isFixedString(prop)
    ? parseInt(prop)
    : prop
) 

const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s)

export default proxyActions