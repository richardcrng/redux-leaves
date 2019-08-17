import Dict from "..";

type NestedDict = Dict<DictOfNestedDicts | any>

interface DictOfNestedDicts {
  [key: string]: NestedDict
}

export default NestedDict