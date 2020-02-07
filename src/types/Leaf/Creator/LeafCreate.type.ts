import LeafCreatorAPI from "./API";
import LeafReducerDict from "../Reducer/Dict";

export type LeafCreateFunction<D = LeafReducerDict> = (actionType?: string) => LeafCreatorAPI<D>

type LeafCreate<D> = LeafCreateFunction<D> & LeafCreatorAPI<D>

export default LeafCreate