import LeafCreatorAPI from "./API";
import LeafReducerDict from "../Reducer/Dict";

export type LeafCreateFunction<T = LeafReducerDict> = (actionType?: string) => LeafCreatorAPI<T>

