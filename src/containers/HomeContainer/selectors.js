import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state =>
  (state.homeContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectMusicData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'musicData', null)
  );

export const selectMusicError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'Error', null)
  );

export const selectMusicName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'name', null)
  );

export default selectHomeContainer;
