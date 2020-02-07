import LeafReducerDict from "../../Leaf/Reducer/Dict";
import LeafCreate from "../../Leaf/Creator";

type ProxiedActions<S, D = LeafReducerDict> =
  S extends Array<infer E> ? { create: LeafCreate<D> }
  : S extends object ? { create: LeafCreate<D> } & { [K in keyof S]: ProxiedActions<S[K], D> }
  : { create: LeafCreate<D> }

export default ProxiedActions