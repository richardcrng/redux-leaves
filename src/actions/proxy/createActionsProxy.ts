import ActionsProxy from "./ActionsProxy.class";

function createActionsProxy(path: (string | number | symbol)[] = []): ActionsProxy {
  return new ActionsProxy({}, path)
}

export default createActionsProxy