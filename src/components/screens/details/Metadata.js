/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Title,
  Paragraph,
  Caption,
  withTheme,
  Card,
} from 'react-native-paper';
import { TMDB_IMAGE_URI } from '../../../utils/Config';
const Metadata = props => {
  const detailsData = props.detailsData;
  const { switch_theme } = props.user;

  return (
    <ImageBackground
      style={{ width: '100%' }}
      source={{
        uri: `${TMDB_IMAGE_URI}/w780${detailsData.backdrop_path}`,
      }}>
      <View style={{ marginTop: 70 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Title style={styles.heading}>
            {detailsData.title || detailsData.name}&nbsp;
            </Title>

          {detailsData.title !== detailsData.original_title ? (
            <Caption style={styles.heading}>
              ({detailsData.original_title || detailsData.original_name}
                )&nbsp;
            </Caption>
          ) : null}

          {detailsData.name !== detailsData.original_name ? (
            <Caption style={styles.heading}>
              ({detailsData.original_name})&nbsp;
            </Caption>
          ) : null}

          {detailsData.tagline ? (
            <Caption style={styles.heading}>
              {detailsData.tagline}&nbsp;
            </Caption>
          ) : null}
        </View>

        <Card
          elevation={8}
          style={[
            { width: 130, margin: 10, marginBottom: -20 },
            styles.logincard,
          ]}>
          <Card.Cover
            source={{
              uri: `${TMDB_IMAGE_URI}/w342${detailsData.poster_path}`,
            }}
          />
        </Card>

        <View
          style={{
            width: '100%',
            padding: 5,
            paddingTop: 20,
            backgroundColor: switch_theme
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(192,192,192, 0.9)',
          }}
        >
          {parseInt(detailsData.vote_count) > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Paragraph>Ratings:</Paragraph>

              <TouchableOpacity
                onPress={() =>
                  props.navigator.navigate('webview', {
                    URL: `https://www.imdb.com/title/${detailsData.imdb_id}`,
                  })
                }>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="imdb" color={'yellow'} size={21} />
                  <Caption>
                    &nbsp;&nbsp;{detailsData.vote_average} (
                      {detailsData.vote_count})
                    </Caption>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Paragraph>Release Date:</Paragraph>
            <Caption>
              {moment(
                detailsData.release_date || detailsData.first_air_date,
              ).format('ll')}{' '}
                (USA)
              </Caption>
          </View>

          {detailsData.runtime ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Paragraph>Duration:</Paragraph>

              <Caption>{detailsData.runtime} mins</Caption>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Paragraph>Genres: </Paragraph>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {detailsData.genres &&
                detailsData.genres.map((value, i) => (
                  <View
                    key={i}
                    style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Caption>&nbsp;&nbsp;{value.name}</Caption>
                    {i + 1 !== detailsData.genres.length ? (
                      <Caption style={{ color: '#757575' }}>
                        &nbsp;&nbsp;|
                      </Caption>
                    ) : null}
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  heading: {
    color: '#E5CA49',
    textShadowColor: 'rgba(0, 0, 0, 3)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6,
  },
  logincard: {
    zIndex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 12,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(withTheme(Metadata));
