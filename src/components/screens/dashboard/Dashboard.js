/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Menu, Provider, withTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {main_url} from '../../../utils/Config';
import Card from '../../commonComponents/Card';

export class Dashboard extends Component {
  state = {
    page: 1,
    dashboardData: null,
    menuOpen: false,
    menuSelected: 1,
    menuItems: [
      {menuid: 1, name: 'All', type: 'all'},
      {menuid: 2, name: 'Movies', type: 'movie'},
      {menuid: 3, name: 'TV Shows', type: 'tv'},
    ],
    refresh: true,
    footerLoading: false,
  };

  componentDidMount() {
    let data = {page: 1, type: 'all'};
    this._getData(data, null);
  }

  _getData = async (params, prevData) => {
    const CancelToken = axios.CancelToken;
    this.setState({footerLoading: true});

    try {
      const {data} = await axios.post(`${main_url}/trending`, params, {
        canceltoken: new CancelToken(function executor(c) {
          this.cancelRequest = c;
        }),
      });
      this.setState({
        footerLoading: false,
        dashboardData: prevData ? prevData.concat(data.results) : data.results,
      });
    } catch (err) {
      if (axios.isCancel(thrown)) {
        console.log(thrown.message);
      }
      console.log(err.message);
    }
  };

  cancelCalling = () => {
    this.cancelRequest && this.cancelRequest();
  };

  _getList = value => {
    this.flatList_Ref.scrollToIndex({animated: true, index: 0});
    this.setState({menuOpen: false, menuSelected: value.menuid});
    let data = {page: 1, type: value.type};
    setTimeout(() => {
      this._getData(data, null);
    }, 1500);
  };

  _addNewList = async () => {
    let newPage = this.state.page + 1;
    this.setState({page: newPage});
    let data = {
      page: newPage,
      type: this.state.menuItems[this.state.menuSelected - 1].type,
    };
    let prevData = this.state.dashboardData;
    this._getData(data, prevData);
  };

  _renderFooter = () => {
    if (!this.state.footerLoading) return <View style={{height: 90}} />;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 90,
        }}>
        <ActivityIndicator
          size="small"
          color={this.props.theme.colors.primary}
        />
      </View>
    );
  };

  render() {
    const colors = this.props.theme.colors;
    const {dashboardData, menuItems, menuOpen, menuSelected} = this.state;
    if (dashboardData === null)
      return (
        <ActivityIndicator
          style={{flex: 1, alignSelf: 'center'}}
          size="large"
          color="#E33F05"
        />
      );
    else
      return (
        <Provider style={{flex: 1, alignItems: 'center'}}>
          <StatusBar barStyle="light-content" />
         { console.tron.log('Sweet Freedom!')}

          <View style={{position: 'absolute', top: 30, zIndex: 5}}>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: 17,
                flexDirection: 'row',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}>
              <Menu
                visible={menuOpen}
                onDismiss={() => this.setState({menuOpen: false})}
                anchor={
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => this.setState({menuOpen: true})}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {menuItems[menuSelected - 1].name}
                      &nbsp;&nbsp;
                    </Text>
                    <Ionicons
                      style={{color: colors.primary, marginTop: 2}}
                      name="ios-arrow-down"
                      color="#E33F05"
                      size={22}
                    />
                  </TouchableOpacity>
                }>
                {menuItems.map((value, i) => (
                  <Menu.Item
                    key={i}
                    onPress={() => this._getList(value)}
                    title={value.name}
                  />
                ))}
              </Menu>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{paddingBottom: 70, marginTop: 70}}
            numColumns={3}
            data={dashboardData && dashboardData}
            extraData={this.state}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={() => this._addNewList()}
            ListFooterComponent={this._renderFooter}
            ref={ref => {
              this.flatList_Ref = ref; // <------ ADD Ref for the Flatlist
            }}
            renderItem={({item}) => (
              <Card
                currentRoute="dashboard"
                navigator={this.props.navigation}
                parentData={item}
                cancelCalling={this.cancelCalling()}
              />
            )}
          />
        </Provider>
      );
  }
}

const styles = StyleSheet.create({
  textShadow: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 13,
  },
});

export default withTheme(Dashboard);
