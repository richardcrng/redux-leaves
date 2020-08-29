import { LSAwP, LSA } from "../types"

export type CustomCreators<
  LeafT = unknown,
  TreeT = unknown
> = {

}

export type CustomActions<
  KeyT extends keyof CustomCreators<LeafT, TreeT>,
  LeafT = unknown,
  TreeT = unknown
> = ReturnType<CustomCreators<LeafT, TreeT>[KeyT]>
