/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Title, Caption, withTheme } from 'react-native-paper';
import moment from 'moment';

import { getRecommendationsURL } from '../../../services/apiURL'
import MediaList from '../../common/MediaList'
export class Recommends extends Component {
  state = {
    page: 1,
    refresh: true,
    footerLoading: false,
    dataList: [],
    routeData: [],
    loading: true,
  };

  render() {
    const { routeData, dataList } = this.state;
    const { id, media_type, adult, page,
      original_name, original_title, title, name, release_date } = this.props.route.params.routeData

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerStyle}>
          <Caption>MORE LIKE THIS:</Caption>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Title style={{ color: '#E5CA49' }}>
              {original_name || original_title || title || name}
                &nbsp;
              </Title>
            <Caption>
              {moment(release_date && release_date).format('YYYY')}
            </Caption>
          </View>
        </View>

        <MediaList
          id={id}
          media_type={media_type}
          adult={adult}
          region="IN"
          apiURL={getRecommendationsURL}
          routeTo={null}
          navigator={this.props.navigation}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    elevation: 8,
    backgroundColor: 'rgba(0.8, 0.8, 0.8, 0.8)',
    padding: 5,
    paddingTop: 50,
    marginBottom: -50,
    // zIndex: 1,
  },
  textShadow: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 13,
  },
});

export default withTheme(Recommends);
