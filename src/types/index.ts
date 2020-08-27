export enum LSATypes {
  UPDATE = 'UPDATE'
}

export interface LeafStandardAction<T extends string = string, P = any> {
  type: T,
  path: (string | number)[],
  payload?: P
}

export interface LSAWithPayload<P, T extends string = string> extends LeafStandardAction<T> {
  payload: P
}

export type StandardCreators<S> = {
  update(newVal: S): LSAWithPayload<S, LSATypes.UPDATE>
}