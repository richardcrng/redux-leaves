import FluxStandardActionCreator from "../../Creator";

type FluxStandardActionCreatorTypeAware<P = any, M = any> = FluxStandardActionCreator<P, M> & {
  type: string
}

export default FluxStandardActionCreatorTypeAware