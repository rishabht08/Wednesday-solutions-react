/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: homeContainerTypes,
  Creators: homeContainerCreators
} = createActions({
  requestGetItunesMusic: ['name'],
  successGetItunesMusic: ['data'],
  failureGetItunesMusic: ['error'],
  clearItunesMusic: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_ITUNES_MUSIC:
        return initialState.set('name', action.name);
      case homeContainerTypes.CLEAR_ITUNES_MUSIC:
        return initialState.set('name', null).set('musicData', null);
      case homeContainerTypes.SUCCESS_GET_ITUNES_MUSIC:
        return state.set('musicData', action.data);
      case homeContainerTypes.FAILURE_GET_ITUNES_MUSIC:
        return state.set(
          'Error',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default homeContainerReducer;
