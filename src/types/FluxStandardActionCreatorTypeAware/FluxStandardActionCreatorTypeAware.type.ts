import FluxStandardActionCreator from '../FluxStandardActionCreator';

type FluxStandardActionCreatorTypeAware = FluxStandardActionCreator & {
  type: string
}

export default FluxStandardActionCreatorTypeAware