import {
  homeContainerReducer,
  initialState,
  homeContainerTypes
} from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type GET_ITUNES_MUSIC is dispatched', () => {
    const name = 'Linkin Park';
    const expectedResult = state.set('name', name);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_ITUNES_MUSIC,
        name
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when GET_ITUNES_MUSIC_SUCCESS is dispatched', () => {
    const data = { name: 'Linkin Park' };
    const expectedResult = state.set('musicData', data);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_ITUNES_MUSIC,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_ITUNES_MUSIC_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = state.set('Error', error);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_ITUNES_MUSIC,
        error
      })
    ).toEqual(expectedResult);
  });
});
