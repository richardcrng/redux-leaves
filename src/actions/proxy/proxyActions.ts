import * as RA from 'ramda-adjunct'
import actionsCreate from "../create";
import { Dict } from '../../types/util.type';
import { LeafReducer } from '../../types/reducer.type';
import { Actions } from '../../types/actions.type';

// PB: proxy base
// TS: treeState
// T: datatype in actual state shape
function proxyActions<PB extends Dict<any>, RD extends Dict<LeafReducer.Definition>, TS extends Dict<any> = Dict<any>, Target = any>(
  proxyBase: PB,
  reducersDict: RD,
  path: (string | number)[] = []
): Actions.Branch<PB, TS, Target, RD> {
  
  const proxy = new Proxy<PB>(proxyBase, {
    get: (obj: any, prop: Extract<keyof PB, string> | 'create') => {
      if (prop === 'create') return actionsCreate<RD, Target, PB>(reducersDict, path)
      
      const targetValue = proxyBase[prop]
      const nextProxyBase = RA.isObjLike(targetValue)
        ? targetValue
        : {}

      return proxyActions<typeof nextProxyBase, RD, TS, typeof targetValue>(
        nextProxyBase,
        reducersDict,
        [...path, propForPath(prop)]
      )
    }
  })

  // @ts-ignore
  return proxy as Actions.Branch<PB, TS, Target, RD>
}


const propForPath = (prop: string): string | number => (
  isFixedString(prop)
    ? parseInt(prop)
    : prop
) 

const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s)

export default proxyActions