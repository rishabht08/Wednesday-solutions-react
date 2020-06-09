import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_ITUNES_MUSIC', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_ITUNES_MUSIC,
      name: 'name'
    };
    expect(homeContainerCreators.requestGetItunesMusic('name')).toEqual(
      expected
    );
  });
});
