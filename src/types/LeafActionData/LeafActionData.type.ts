import LeafCreatorCondition from '../LeafCreatorCondition';

type LeafActionData = {
  path: string[]
  creatorKey: string
  CREATOR_KEY: string
  condition?: LeafCreatorCondition
  custom?: boolean
}

export default LeafActionData