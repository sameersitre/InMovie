/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import Card from '../../commonComponents/Card';
import {ActivityIndicator, Colors} from 'react-native-paper';
import axios from 'axios';
export class Temporary extends Component {
  state = {
    movieData: [],
  };

  async componentDidMount() {
    let url =
      'https://api.themoviedb.org/3/discover/movie?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US&region=US%7CIN&sort_by=primary_release_date.desc&include_adult=false&include_video=true&page=2&primary_release_date.lte=2020-05-01&with_original_language=en%7Chi';
    await axios
      .get(url)
      .then(res => {
        this.setState({movieData: res.data.results});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.movieData === [])
      return (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          style={{flex: 1, alignSelf: 'center'}}
        />
      );
    else
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          <FlatList
            numColumns={3}
            data={this.state.movieData && this.state.movieData}
            keyExtractor={value => value}
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
  }
}

export default Temporary;
