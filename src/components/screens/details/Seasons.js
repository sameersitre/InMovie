/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Caption, Card, withTheme } from 'react-native-paper';
import { TMDB_IMAGE_URI } from '../../../utils/Config';

const Seasons = props => {
  const detailsData = props.parentData;

  submit = item => {
    let routeData = {
      id: detailsData.id,
      name: detailsData.name,
      seasonNumber: item.season_number,
      episodeCount: item.episode_count
    };
    props.navigator.navigate('episodes', routeData);
  };

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <Caption
        style={[
          styles.caption,
          { color: props.theme.colors.primary, paddingHorizontal: 5 },
        ]}>
        Seasons:
      </Caption>

      <FlatList
        horizontal={true}
        data={detailsData.seasons}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: 120, marginHorizontal: 5 }}
            onPress={() => submit(item)}>
            <Card elevation={5}>
              <Card.Cover
                source={{
                  uri: `${TMDB_IMAGE_URI}/w342${item.poster_path}`,
                }}
              />
            </Card>
            <Caption style={styles.caption}>{item.name}</Caption>
          </TouchableOpacity>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  caption: {
    fontWeight: 'bold',
  },
});

export default withTheme(Seasons);
