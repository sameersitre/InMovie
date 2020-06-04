/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 * variable: routeData is to compare the data iin state and coming from ruote to decide whether to  call api or not .
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  InteractionManager,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import axios from 'axios';
import {main_url} from '../../../utils/Config';

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
      detailsData: null,
      videoData: null,
      recommends: null,
      creditDetails: null,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({routeData: this.props.route.params, loading: true});
      this._getData(this.props.route.params);
      this._getCastData(this.props.route.params);
    });
  }

  componentDidUpdate() {
    if (this.state.routeData !== this.props.route.params) {
      this.setState({routeData: this.props.route.params});
      this._getData(this.props.route.params);
      this._getCastData(this.props.route.params);
    }
  }

  _getData = async data => {
    this.setState({loading: true});
    await axios
      .post(`${main_url}/getDetailsMobile`, data)
      .then(res => {
        if (res.data.detailsData !== null) {
          this.setState({
            detailsData: res.data.detailsData,
            videoData: res.data.videoData,
            recommends: res.data.recommends,
          });
          this.fadeIn();
        } else {
          Alert.alert('Item details not available.');
          this.props.navigation.goBack();
        }
        this.setState({loading: false});
      })
      .catch(function(error) {
        console.log(error);
        this.setState({loading: false});
      });
  };

  _getCastData = async data => {
    await axios
      .post(`${main_url}/getCastDetailsMobile`, data)
      .then(res => {
        if (res.data) {
          this.setState({
            creditDetails: res.data,
          });
        } else if (res.message) {
          Alert.alert(res.message);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true, // <-- Add this
    }).start();
  };

  openWebScreen = value => {
    this.props.navigation.navigate('webview', {URL: value});
  };

  render() {
    const themeColors = this.props.theme.colors;
    const {detailsData, videoData, recommends, creditDetails} = this.state;
    if (this.state.loading)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </View>
      );
    return (
      <View style={styles.container}>
        <ScrollView>
          <Animated.View style={{opacity: this.state.fadeAnim, flex: 1}}>
            <Metadata
              parentData={{
                detailsData: detailsData,
                imdbid: creditDetails && creditDetails.id,
                navigator: this.props.navigation,
              }}
            />
          </Animated.View>

          <Overview parentData={detailsData} />

          <Seasons parentData={detailsData} navigator={this.props.navigation} />

          <Videos parentData={videoData} />

          <Streams parentData={detailsData} navigator={this.props.navigation} />

          <Cast
            parentData={{
              castList: creditDetails,
              name: detailsData.name,
              navigator: this.props.navigation,
            }}
          />

          <RecommendList
            parentData={{
              id: detailsData.id,
              media_type: detailsData.media_type,
              title: detailsData.title,
              name: detailsData.name,
              release_date: detailsData.release_date,
              poster_path: detailsData.poster_path,
              recommends: recommends,
              navigator: this.props.navigation,
            }}
          />

          <View style={{height: 20}} />
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
