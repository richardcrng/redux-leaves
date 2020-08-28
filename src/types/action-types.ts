export interface LeafActionData<CK extends string = string> {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound?: false
  custom?: boolean
}

export interface LeafStandardAction<P = unknown, CK extends string = string> {
  type: string,
  leaf: LeafActionData<CK>,
  payload?: P
}

export interface LSAWithPayload<P, CK extends string = string> extends LeafStandardAction<P, CK> {
  payload: P
}