export interface LeafActionData {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound?: false
  custom?: boolean
}

export interface LeafStandardAction<T extends string = string, P = unknown> {
  type: string,
  leaf: LeafActionData,
  payload?: P
}



export interface LSAWithPayload<P> extends LeafStandardAction {
  payload: P
}