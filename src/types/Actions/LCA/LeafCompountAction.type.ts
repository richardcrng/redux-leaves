import FluxStandardAction from '../FSA';
import LeafStandardAction from '../LSA';

type LeafCompoundAction = FluxStandardAction & {
  leaf: {
    compound: true,
    bundled: string[]
  },
  payload: (LeafStandardAction | LeafCompoundAction)[]
}

export default LeafCompoundAction