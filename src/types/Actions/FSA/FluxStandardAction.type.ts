type FluxStandardAction<P = any, M = any> = {
  type: string
  payload?: P
  meta?: M
}

export default FluxStandardAction