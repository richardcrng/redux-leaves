class ActionsProxy {
  // private path: (string | number | symbol)[]

  constructor(_path: (string | number | symbol)[] = []) {
    // this.path = path

    return new Proxy({ _path }, {
      get: (obj, prop) => {
        if (prop === 'create') {
          // return create API
        } else {
          return new ActionsProxy([ ..._path, prop ])
        }
      }
    })
  }
}

export default ActionsProxy