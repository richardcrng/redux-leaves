import { LSAWithPayload, LeafStandardAction } from "../types";

export enum BooleanCreatorKeys {
  // ASSIGN = 'ASSIGN'
}

export type BooleanCreators<L extends boolean = boolean, T = unknown> = {
  // assign(props: Partial<L>): LSAWithPayload<L, BooleanCreatorKeys.ASSIGN>
}

export type BooleanActions<K extends keyof BooleanCreators, L extends boolean = boolean, T = unknown> = ReturnType<BooleanCreators<L>[K]>