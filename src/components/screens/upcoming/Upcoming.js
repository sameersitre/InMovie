/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {View, StatusBar, FlatList, ActivityIndicator} from 'react-native';
import Card from '../../commonComponents/Card';
import axios from 'axios';
import {main_url} from '../../../utils/Config';
export class Upcoming extends Component {
  state = {
    upcomingList: null,
    footerLoading: false,
    page: 1,
  };

  componentDidMount() {
    let data = {page: 1, media_type: 'movie', adult: 'false'};
    this._getData(data, null);
  }

  _getData = async (data, prevData) => {
    this.setState({footerLoading: true});
    await axios
      .post(`${main_url}/upcoming`, data)
      .then(res => {
        this.setState({
          upcomingList: prevData
            ? prevData.concat(res.data.results)
            : res.data.results,
          footerLoading: false,
        });
      })
      .catch(function(error) {
        console.log(error);
        this.setState({footerLoading: false});
      });
  };

  addNewList = () => {
    let newPage = this.state.page + 1;
    this.setState({page: newPage});
    let data = {page: newPage, media_type: 'movie', adult: 'false'};
    let prevData = this.state.upcomingList;
    this._getData(data, prevData);
  };

  _renderFooter = () => {
    if (!this.state.footerLoading) return <View style={{height: 90}} />;
    return (
      <ActivityIndicator
        style={{flex: 1, alignSelf: 'center', height: 90}}
        size="small"
        color="#E33F05"
      />
    );
  };

  render() {
    if (!this.state.upcomingList)
      return (
        <ActivityIndicator
          style={{flex: 1, alignSelf: 'center'}}
          size="large"
          color="#E33F05"
        />
      );
    else
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <StatusBar barStyle="light-content" />
          <FlatList
            contentContainerStyle={{paddingBottom: 100, marginTop: 70}}
            numColumns={3}
            data={this.state.upcomingList && this.state.upcomingList}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.addNewList()}
            ListFooterComponent={this._renderFooter}
            renderItem={({item}) => (
              <Card
                currentRoute="Upcoming"
                navigator={this.props.navigation}
                parentData={{...item, media_type: 'movie'}}
              />
            )}
          />
        </View>
      );
  }
}

export default Upcoming;
