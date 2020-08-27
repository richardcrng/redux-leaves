import { LSAWithPayload } from "./action-types"

export enum DefaultCreators {
  DO = 'DO',
  UPDATE = 'UPDATE'
}

export type CreateDefaults<S, T> = {
  do(cb: DoCallback<S, T>): LSAWithPayload<DoCallback<S, T>, DefaultCreators.DO>
  
  update(newVal: S): LSAWithPayload<S, DefaultCreators.UPDATE>
}

export type StandardActions<S, T, K extends keyof CreateDefaults<S, T>> = ReturnType<CreateDefaults<S, T>[K]>

type DoCallback<S, T> = (leafState: S, treeState: T) => S

