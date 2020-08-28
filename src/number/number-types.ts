import { LSAWithPayload, LeafStandardAction } from "../types";

export enum NumberCreatorKeys {
  // ASSIGN = 'ASSIGN'
}

export type NumberCreators<L extends number = number, T = unknown> = {
  // assign(props: Partial<L>): LSAWithPayload<L, NumberCreatorKeys.ASSIGN>
}

export type NumberActions<K extends keyof NumberCreators, L extends number = number, T = unknown> = ReturnType<NumberCreators<L>[K]>