/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 * variable: routeData is to compare the data iin state and coming from ruote to decide whether to  call api or not .
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  InteractionManager,
  ScrollView,
  Animated, 
} from 'react-native';
import { withTheme } from 'react-native-paper';
import apiCall from '../../../services/apiCall'
import { getDetailsURL, getCastDetailsURL, getOTTPlatformsURL, getRecommendationsURL, getVideosURL } from '../../../services/apiURL';
import Metadata from './Metadata';
import Overview from './Overview';
import Seasons from './Seasons';
import Videos from './Videos';
import Streams from './Streams';
import Cast from './Cast';
import RecommendList from './RecommendList';
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: null,
      fadeAnim: new Animated.Value(0),
      visible: false,
      loading: true,
      loadingCast: false,
      selectedimdbID: '',
      detailsData: [],
      videoData: [],
      ottStreams: [],
      recommends: [],
      castDetails: [],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ routeData: this.props.route.params, loading: true });
      this._getData(this.props.route.params);
    });
  }

  componentDidUpdate() {
    if (this.state.routeData !== this.props.route.params) {
      this.setState({ routeData: this.props.route.params });
      this._getData(this.props.route.params);
    }
  }

  _getData = async data => {
    const { id, media_type, original_title, original_name, name, release_date, title, adult } = data
    let params = { id, media_type, adult, page: 1 }

    this.setState({ loading: true });
    this.setState({
      detailsData: await apiCall(getDetailsURL, params),
      loading: false,
      videoData: await apiCall(getVideosURL, params),
      ottStreams: await apiCall(getOTTPlatformsURL, params),

      castDetails: {
        ...params, original_title, title, release_date,
        ... await apiCall(getCastDetailsURL, params),

      },

      recommends: {
        ...params, original_title, title, original_name, name, release_date,
        ... await apiCall(getRecommendationsURL, params)
      },
    })
    this.fadeIn();
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true, // <-- Add this
    }).start();
  };

  openWebScreen = value => {
    this.props.navigation.navigate('webview', { URL: value });
  };

  render() {
    const themeColors = this.props.theme.colors;
    const { loading, detailsData, videoData,
      recommends, castDetails, ottStreams } = this.state;
    if (loading)
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </View>
      );
    return (
      <View style={styles.container}>
        <ScrollView>

          <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim, }}>
            <Metadata detailsData={detailsData} navigator={this.props.navigation} />
          </Animated.View>

          {ottStreams.platforms &&
            <Streams parentData={ottStreams} navigator={this.props.navigation} />}

          <Overview parentData={detailsData} />

          {detailsData.seasons && <Seasons parentData={detailsData} navigator={this.props.navigation} />}

          {videoData.results.length > 0 &&
            <Videos parentData={videoData.results} />}

          {castDetails.cast.length > 0 &&
            <Cast castList={castDetails} navigator={this.props.navigation} />}

          {recommends.total_results !== 0 &&
            <RecommendList recommends={recommends} navigator={this.props.navigation} />}

          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default withTheme(Details);
