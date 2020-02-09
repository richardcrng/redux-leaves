import Dict from "../types/Dict"

function objectMap<KIn extends any = string, VIn = string, KOut extends any = string, VOut = any>(
  callback: ([key, val]: [string, VIn]) => [KOut, VOut],
  object: Dict<VIn, KIn>
): Dict<VOut, KOut> {
  const entries = Object.entries<VIn>(object)
  const newEntries = entries.map(callback)
  return Object.fromEntries(newEntries)
}

export default objectMap