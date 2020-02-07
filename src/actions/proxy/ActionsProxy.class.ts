import * as RA from 'ramda-adjunct'
import actionsCreate from "../create";
import LeafReducerDict from "../../types/Leaf/Reducer/Dict";
import Dict from "../../types/Dict";
import LeafCreate from "../../types/Leaf/Creator";

export function proxyActions<S extends Dict<any> = Dict<any>, D = LeafReducerDict>(
  stateShape: S,
  actionsDict: D,
  path: (string | number)[] = []
): S & { create: LeafCreate<D> } {
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

  return proxy as S & { create: LeafCreate<D> }
}

class ActionsProxy<S extends Dict<any> = Dict<any>, D = LeafReducerDict> {
  create: LeafCreate<D>

  constructor(stateShape: S, actionsDict: D, path: (string | number)[] = []) {
    const proxy = new Proxy<S>(stateShape, {
      get: (obj, prop: Extract<keyof S, string> | 'create') => {
        if (prop === 'create') return actionsCreate<D>(actionsDict, path)
        
        const targetValue = stateShape[prop]
        const proxySource = typeof stateShape === 'object'
          ? targetValue
          : {}

        return new ActionsProxy(proxySource, actionsDict, [...path, propForPath(prop)])
      }
    })

    this.create = proxy.create
    
    // @ts-ignore
    return proxy
  }
}

const propForPath = (prop: string): string | number => (
  isFixedString(prop)
    ? parseInt(prop)
    : prop
) 

const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s)

export default ActionsProxy