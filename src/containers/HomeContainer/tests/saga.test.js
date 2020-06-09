/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '../../../services/songsApi';
import { apiResponseGenerator } from '../../../utils/testUtils';
import homeContainerSaga, { getItunesMusic } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const name = 'divine';
  let getItunesMusicGenerator = getItunesMusic({ name });

  it('should start task to watch for REQUEST_GET_ITUNES_MUSIC action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(homeContainerTypes.REQUEST_GET_ITUNES_MUSIC, getItunesMusic)
    );
  });

  it('should ensure that the action FAILURE_GET_ITUNES_MUSIC is dispatched when the api call fails', () => {
    const res = getItunesMusicGenerator.next().value;
    expect(res).toEqual(call(getSongs, name));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(
      getItunesMusicGenerator.next(apiResponseGenerator(false, errorResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ITUNES_MUSIC,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_MUSIC is dispatched when the api call succeeds', () => {
    getItunesMusicGenerator = getItunesMusic({ name });
    const res = getItunesMusicGenerator.next().value;
    expect(res).toEqual(call(getSongs, name));
    const musicResponse = {
      totalCount: 1,
      results: [{ artistName: name }]
    };
    expect(
      getItunesMusicGenerator.next(apiResponseGenerator(true, musicResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ITUNES_MUSIC,
        data: musicResponse
      })
    );
  });
});
