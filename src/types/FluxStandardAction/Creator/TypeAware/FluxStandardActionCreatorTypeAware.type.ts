import FluxStandardActionCreator from "..";

type FluxStandardActionCreatorTypeAware = FluxStandardActionCreator & {
  type: string
}

export default FluxStandardActionCreatorTypeAware