import * as RA from 'ramda-adjunct'
import actionsCreate from "../create";
import { Dict } from '../../types/util.type';
import { Actions } from '../../types/actions.type';
import LeafReducer from '../../types/reducer.type';

// PB: proxy base
// SRD: Standardised Reducers Dict
// TS: treeState
// T: datatype in actual state shape
// LRD: LeafReducer Definitions
function proxyActions<PB extends Dict<any>, SRD, TS extends Dict<any> = Dict<any>, Target = any, LRD extends LeafReducer.Definitions = any>(
  proxyBase: PB,
  reducersDict: SRD,
  path: (string | number)[] = []
): Actions.Branch<PB, TS, Target, LRD> {
  
  const proxy = new Proxy<PB>(proxyBase, {
    get: (obj: any, prop: Extract<keyof PB, string> | 'create') => {
      if (prop === 'create') return actionsCreate<SRD, Target, PB, LRD>(reducersDict, path)
      
      const targetValue = proxyBase[prop]
      const nextProxyBase = RA.isObjLike(targetValue)
        ? targetValue
        : {}

      return proxyActions<typeof nextProxyBase, SRD, TS, typeof targetValue, LRD>(
        nextProxyBase,
        reducersDict,
        [...path, propForPath(prop)]
      )
    }
  })

  // @ts-ignore
  return proxy as Actions.Branch<PB, TS, Target, LRD>
}


const propForPath = (prop: string): string | number => (
  isFixedString(prop)
    ? parseInt(prop)
    : prop
) 

const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s)

export default proxyActions