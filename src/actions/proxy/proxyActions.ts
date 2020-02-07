import * as RA from 'ramda-adjunct'
import actionsCreate from "../create";
import LeafReducerDict from "../../types/Leaf/Reducer/Dict";
import Dict from "../../types/Dict";
import ProxiedActions from '../../types/Actions/Proxied';

// PB: proxy base
// TS: treeState
// T: datatype in actual state shape
function proxyActions<PB extends Dict<any> = Dict<any>, RD = LeafReducerDict, TS = Dict<any>, T = any>(
  proxyBase: PB,
  reducersDict: RD,
  path: (string | number)[] = []
): ProxiedActions<PB, RD> {
  
  const proxy = new Proxy<PB>(proxyBase, {
    get: (obj: any, prop: Extract<keyof PB, string> | 'create') => {
      if (prop === 'create') return actionsCreate<RD, T, PB>(reducersDict, path)
      
      const targetValue = proxyBase[prop]
      const nextProxyBase = RA.isObjLike(targetValue)
        ? targetValue
        : {}

      return proxyActions<typeof nextProxyBase, RD, TS, typeof targetValue>(nextProxyBase, reducersDict, [...path, propForPath(prop)])
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