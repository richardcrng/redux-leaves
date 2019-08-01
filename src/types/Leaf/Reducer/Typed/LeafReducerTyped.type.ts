import LeafStandardAction from '../../../Actions/LSA';
import Dict from '../../../Dict';
import LeafReducerConfig from '../Config';

type LeafReducerTyped<T = any> = (leafState: T, action: LeafStandardAction, wholeState?: any, reducersDict?: Dict<LeafReducerConfig>) => T

export default LeafReducerTyped