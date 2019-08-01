import FluxStandardActionCreator from "../../Creator";

type FluxStandardActionCreatorTypeAware = FluxStandardActionCreator & {
  type: string
}

export default FluxStandardActionCreatorTypeAware