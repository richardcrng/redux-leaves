import LeafCreatorAPI from "./API";
import { Dictionary } from "ramda";
import LeafReducerConfig from "../Reducer/Config";

export type LeafCreateFunction<T extends Dictionary<LeafReducerConfig> = Dictionary<LeafReducerConfig>> = (actionType?: string) => LeafCreatorAPI<T>

