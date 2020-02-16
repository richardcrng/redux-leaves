/**
 * A Flux Standard Action
 * 
 * @template P - The action payload
 * @template M - The action meta
 */
export interface FluxStandardAction<P = any, M = any> {
  type: string
  payload?: P
  meta?: M
}

/**
 * A Leaf Standard Action
 *
 * @template P - The action payload
 * @template M - The action meta
 */
export interface LeafStandardAction<P = any, M = any> extends FluxStandardAction<P, M> {
  leaf: LeafActionData
}

/**
 * A Leaf Compound Action (as created by bundle)
 */
export interface LeafCompoundAction extends FluxStandardAction<(LeafStandardAction | LeafCompoundAction)[]> {
  leaf: {
    compound: true,
    bundled: string[]
  }
}


/**
 * The 'leaf' property of an action
 * created by the Redux-Leaves create API
 */
export interface LeafActionData {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  compound: false
  custom?: boolean
}


