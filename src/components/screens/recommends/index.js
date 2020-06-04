/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Provider, Title, Caption, withTheme} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
// import {main_url, TMDB_URI, TMDB_API_KEY} from '../../../utils/Config';
import Card from '../../commonComponents/Card';
export class Recommends extends Component {
  state = {
    page: 1,
    refresh: true,
    footerLoading: false,
    dataList: [],
    routeData: null,
  };

  componentDidMount() {
    let data = this.props.route.params.routeData;
    this.setState({routeData: data});
    this._getData({
      id: data.id,
      media_type: data.media_type,
      page: 1,
    });
  }

  componentDidUpdate() {
    if (this.state.routeData !== this.props.route.params.routeData) {
      this.flatList_Ref.scrollToIndex({animated: true, index: 0});
      let data = this.props.route.params.routeData;
      this.setState({routeData: data});
      this._getData({
        id: data.id,
        media_type: data.media_type,
        page: 1,
      });
    }
  }

  _getData = async (data, prevData) => {
    this.setState({footerLoading: true});
    await axios
      .get(
        `https://api.themoviedb.org/3/${data.media_type}/${
          data.id
        }/recommendations?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US&page=${
          data.page
        }`,
      )
      .then(res => {
        let resData = res.data.results;
        let addObject = resData.map(item => {
          return {...item, media_type: data.media_type};
        });
        this.setState({
          dataList: prevData ? prevData.concat(addObject) : addObject,
          footerLoading: false,
        });
      })
      .catch(function(error) {
        console.log(error);
        this.setState({footerLoading: false});
      });
  };

  _addNewList = async () => {
    let newPage = this.state.page + 1;
    this.setState({page: newPage});
    let data = this.props.route.params.routeData;
    let prevData = this.state.dataList;
    this._getData(
      {
        id: data.id,
        media_type: data.media_type,
        page: newPage,
      },
      prevData,
    );
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
        <ActivityIndicator size="small" color="#E33F05" />
      </View>
    );
  };

  render() {
    const {routeData, dataList} = this.state;
    if (dataList === [])
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#E33F05" />
        </View>
      );
    else if (routeData !== null)
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerStyle}>
            <Caption>MORE LIKE THIS:</Caption>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
              }}>
              <Title style={{color: '#E5CA49'}}>
                {routeData.original_name || routeData.title || routeData.name}
                &nbsp;
              </Title>
              <Caption>
                {moment(
                  routeData.release_date && routeData.release_date,
                ).format('YYYY')}
              </Caption>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{paddingBottom: 70, marginTop: 5}}
            numColumns={3}
            data={dataList && dataList}
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
              />
            )}
          />
        </View>
      );
    else return null;
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    // position: 'absolute',
    padding: 5,
    paddingTop: 60,
    // zIndex: 1,
  },
  textShadow: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 13,
  },
});

export default withTheme(Recommends);
