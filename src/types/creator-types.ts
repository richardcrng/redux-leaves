import { LSAWithPayload, LeafStandardAction } from "./action-types"

export enum DefaultCreators {
  DO = 'DO',
  RESET = 'RESET',
  UPDATE = 'UPDATE'
}

export type CreateDefaults<S, T> = {
  do(cb: DoCallback<S, T>): LSAWithPayload<DoCallback<S, T>>

  reset(): LeafStandardAction
  
  update(newVal: S): LSAWithPayload<S>
}

export type StandardActions<S, T, K extends keyof CreateDefaults<S, T>> = ReturnType<CreateDefaults<S, T>[K]>

type DoCallback<S, T> = (leafState: S, treeState: T) => S

