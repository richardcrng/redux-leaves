import { Dict } from "../types/util.type";

const fromEntries = require('object.fromentries')

if (!Object.fromEntries) {
  fromEntries.shim();
}

function objectMap<KIn extends any = string, VIn = any, KOut extends any = string, VOut = any>(
  callback: ([key, val]: [string, VIn]) => [KOut, VOut],
  object: Dict<VIn, KIn>
): Dict<VOut, KOut> {
  const entries = Object.entries<VIn>(object)
  const newEntries = entries.map(callback)
  return Object.fromEntries(newEntries)
}

export default objectMap