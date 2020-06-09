import React, { useEffect, memo, useState } from "react";
import { connect } from "react-redux";
import { homeContainerCreators } from "./reducer";
import { Card, Skeleton, Input, Space , Avatar } from "antd";
import isEmpty from "lodash/isEmpty";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import TextField from "../../components/Text/index";
import styled from "styled-components";
import MusicCards from "../../components/card/index";
import get from 'lodash/get';
import {
  selectHomeContainer,
  selectMusicData,
  selectMusicError,
  selectMusicName,
} from "./selectors";

const { Search } = Input;
const { Meta } = Card;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }
`;

const GridContainer = styled.div`
  && {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    grid-gap: 10px;

    padding: 10px;
  }
`;

export function HomeContainer({
  dispatchClearItunesMusic,
  dispatchItunesMusic,
  musicData,
  name,
}) {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loaded = get(musicData, "results", null) || [];
    if (loading && loaded) {
      setLoading(false);
    }
  }, [musicData]);

  const handleOnChange = (name) => {
    if (!isEmpty(name)) {
      dispatchItunesMusic(name);
      // setLoading(true);
    } else {
      dispatchClearItunesMusic();
    }
  };

  return (
    <Container>
      <Space direction="vertical">
        <Search
          data-testid="search-bar"
          placeholder="Some Music"
          defaultValue={name}
          type="text"
          onChange={(evt) => handleOnChange(evt.target.value)}
          onSearch={(searchText) => handleOnChange(searchText)}
        />
        <TextField value={name} />
        <GridContainer>
 
          {musicData &&
            musicData.results.map((item) => (
              <MusicCards
                trackName={item.trackName}
                artistName={item.artistName}
                artworkUrl={item.artworkUrl100}
                previewUrl={item.previewUrl}
              />
            ))}
        </GridContainer>
      </Space>
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItunesMusic: PropTypes.func,
  dispatchClearItunesMusic: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  musicData: selectMusicData(),
  musicError: selectMusicError(),
  name: selectMusicName(),
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesMusic, clearItunesMusic } = homeContainerCreators;
  return {
    dispatchItunesMusic: (name) => dispatch(requestGetItunesMusic(name)),
    dispatchClearItunesMusic: () => dispatch(clearItunesMusic()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

// export const HomeContainerTest = compose(injectIntl)(HomeContainer);
