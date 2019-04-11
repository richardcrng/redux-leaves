import _ from 'lodash';
import { vanillaReducerLeaf } from './vanilla';
import { withActions } from '../../actions/set/actionSet';
import { pathJoin } from '../../utils';

export const reducerLeaf = ({ prefix = "app", route, initialState }) => {
  const reducer = vanillaReducerLeaf({ prefix, route, initialState })
  return withActions(reducer, pathJoin([prefix, route]))
}