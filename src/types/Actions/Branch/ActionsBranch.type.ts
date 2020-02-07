import Dict from "../../Dict";
import LeafReducerDict from "../../Leaf/Reducer/Dict";
import LeafCreate from "../../Leaf/Creator";

type ActionsBranch<S extends Dict<any> = Dict<any>, D = LeafReducerDict> = S & { create: LeafCreate<D> }

export default ActionsBranch