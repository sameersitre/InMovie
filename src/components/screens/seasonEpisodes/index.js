/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {Title, Caption, withTheme, Card} from 'react-native-paper';
import axios from 'axios';
import {
  main_url,
  TMDB_API_KEY,
  TMDB_URI,
  TMDB_IMAGE_URI,
} from '../../../utils/Config';
class SeasonEpisodes extends Component {
  state = {
    data: [],
    loading: false,
    selectedSeason: 1,
  };

  componentDidMount() {
    let params = {
      id: this.props.route.params.id,
      seasonNumber: this.props.route.params.seasonNumber,
    };
    this.setState({loading: true, data: []});
    axios
      .get(
        `${TMDB_URI}/tv/${params.id}/season/${
          params.seasonNumber
        }?api_key=${TMDB_API_KEY}&language=en-US`,
      )
      .then(res => {
        this.setState({data: res.data, loading: false});
      })
      .catch(function(error) {
        console.log(error);
        this.setState({loading: false});
      });
  }

  SeasonCard = data => (
    <Card
      style={{
        flex: 1,
        alignSelf: 'center',
        marginTop: 15,
        width: '97%',
      }}>
      <Card.Cover
        source={{
          uri: `${TMDB_IMAGE_URI}/w780${data.value.still_path}`,
        }}
      />
      <Caption style={[styles.caption, {padding: 8}]}>
        Episode: {data.value.episode_number}: {data.value.name}
        {'\n'}
        Ratings: {data.value.vote_average}
        {'\n'}
        Air Date: {data.value.air_date}
        {'\n'}
        {'\n'}
        {data.value.overview}
      </Caption>
    </Card>
  );

  render() {
    const themeColors = this.props.theme.colors;
    const {name, episodeCount} = this.props.route.params;

    if (this.state.loading)
      return (
        <ActivityIndicator
          style={{flex: 1, alignSelf: 'center'}}
          size="large"
          color={themeColors.primary}
        />
      );
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            padding: 5,
            paddingTop: 60,
          }}>
          <Caption style={styles.caption}>EPISODES:</Caption>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Title style={{color: '#E5CA49'}}>{name}&nbsp;</Title>
            <Caption style={styles.caption}>{this.state.data.name}</Caption>
          </View>
        </View>

        {/* <View style={{ padding: 50}}>
            <Title
              style={[styles.caption, { color: '#E5CA49'}]}>
              {name}
            </Title>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Caption style={styles.caption}>{this.state.data.name}</Caption>
              <Caption style={styles.caption}>Episodes: {episodeCount}</Caption>
            </View>
          </View> */}

        <FlatList
          contentContainerStyle={{}}
          numColumns={1}
          data={this.state.data && this.state.data.episodes}
          extraData={this.state}
          keyExtractor={item => item.id}
          ref={ref => {
            this.flatList_Ref = ref; // <------ ADD Ref for the Flatlist
          }}
          renderItem={({item}) => <this.SeasonCard value={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  caption: {
    color: '#757575',
  },
});

export default withTheme(SeasonEpisodes);
