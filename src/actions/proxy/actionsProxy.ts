import Dict from "../../types/Dict";

function createActionsProxy(path: (string | number | symbol)[] = []): Dict<any> {
  return new Proxy({}, {
    get: (obj, prop) => {
      if (prop === '_path' ) {
        return path
      } else if (prop === 'create') {
        // return create API
      } else {
        return createActionsProxy([...path, prop])
      }
    }
  })
}

export default createActionsProxy