/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Title, Caption, withTheme, Card } from 'react-native-paper';

import apiCall from '../../../services/apiCall'
import { getSeasonsURL } from '../../../services/apiURL';
import { TMDB_IMAGE_URI } from '../../../utils/Config';
class SeasonEpisodes extends Component {
  state = {
    data: [],
    loading: false,
    selectedSeason: 1,
  };

  async componentDidMount() {
    this.setState({ loading: true, data: [] });
    let params = {
      id: this.props.route.params.id,
      seasonNumber: this.props.route.params.seasonNumber,
    };
    let apiData = await apiCall(getSeasonsURL, params)
    this.setState({ data: apiData, loading: false });
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
      <Caption style={[styles.caption, { padding: 8 }]}>
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
    const { name } = this.props.route.params;
    const { data, loading } = this.state
    if (loading)
      return (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: 'center' }}
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
            <Title style={{ color: '#E5CA49' }}>{name}&nbsp;</Title>
            <Caption style={styles.caption}>{data.name}</Caption>
          </View>
        </View>

        <FlatList
          contentContainerStyle={{}}
          numColumns={1}
          data={data.episodes}
          extraData={this.state}
          keyExtractor={item => item.id}
          ref={ref => {
            this.flatList_Ref = ref; // <------ ADD Ref for the Flatlist
          }}
          renderItem={({ item }) => <this.SeasonCard value={item} />}
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
