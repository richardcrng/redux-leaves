import LeafCreatorCondition from "../../Creator/Condition";

type LeafActionData = {
  path: string[]
  creatorKey: string
  CREATOR_KEY: string
  condition?: LeafCreatorCondition
  custom?: boolean
}

export default LeafActionData