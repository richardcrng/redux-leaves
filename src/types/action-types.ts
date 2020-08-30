export interface LeafData {
  path: (string | number)[]
  creatorKey: string
  CREATOR_KEY: string
  custom: boolean,
  bundled?: string[]
}

export interface Action<PayloadT = unknown> {
  type: string,
  leaf: LeafData,
  payload?: PayloadT
}

export interface ActionWithPayload<PayloadT> extends Action<PayloadT> {
  payload: PayloadT
}

export interface BundledAction extends ActionWithPayload<(Action | BundledAction)[]> {
  leaf: LeafData & {
    bundled: string[]
  }
}

export function isBundledAction(action: Action): action is BundledAction {
  return !!action.leaf.bundled
}