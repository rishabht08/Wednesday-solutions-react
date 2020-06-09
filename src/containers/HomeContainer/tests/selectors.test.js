import { fromJS } from 'immutable';
import {
  selectHomeContainer,
  selectMusicName,
  selectMusicData,
  selectMusicError
} from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let musicName;
  let musicData;
  let musicError;

  beforeEach(() => {
    musicName = 'divine';
    musicData = { totalCount: 1, results: [{ musicName }] };
    musicError = 'There was some error while fetching the songs details';

    mockedState = {
      homeContainer: fromJS({
        musicName,
        musicData,
        musicError
      })
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(
      mockedState.homeContainer.toJS()
    );
  });
  it('should select the musicName', () => {
    const musicSelector = selectMusicName();
    expect(musicSelector(mockedState)).toEqual(musicName);
  });

  it('should select musicData', () => {
    const musicDataSelector = selectMusicData();
    expect(musicDataSelector(mockedState)).toEqual(musicData);
  });

  it('should select the musicError', () => {
    const musicErrorSelector = selectMusicError();
    expect(musicErrorSelector(mockedState)).toEqual(musicError);
  });
});
