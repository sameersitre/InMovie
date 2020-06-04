/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {FlatList, StatusBar, SafeAreaView, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import Card from '../../commonComponents/Card';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import {main_url} from '../../../utils/Config';
class Search extends Component {
  state = {
    searchText: '',
    include_adult: this.props.user.switch_adult,
    searchResult: [],
  };

  _getData = async searchText => {
    const CancelToken = axios.CancelToken;
    try {
      let params = {
        searchText: searchText,
        include_adult: this.props.user.switch_adult,
      };
      const {data} = await axios.post(`${main_url}/search`, params, {
        canceltoken: new CancelToken(function executor(c) {
          this.cancelRequest = c;
        }),
      });
      this.setState({searchResult: data.results});
    } catch (err) {
      if (axios.isCancel(thrown)) {
        console.log(thrown.message);
      }
      console.log(err.message);
    }
  };

  search = searchText => {
    if (this.state.searchText.length > 1) {
      this.cancelRequest && this.cancelRequest();
      this._getData(searchText);
    } else null;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <StatusBar barStyle="light-content" />
        <TextInput
          label="Search"
          // autoFocus={true}
          mode="outlined"
          autoCapitalize="none"
          style={{width: '95%', height: 40, margin: 5, borderColor: '#DC34B8'}}
          // placeholder="Search"
          value={this.state.searchText}
          rounded={true}
          onChangeText={searchText => {
            this.setState({searchText});
            this.search(searchText);
          }}
          onSubmitEditing={Keyboard.dismiss}
        />

        <FlatList
          contentContainerStyle={{paddingBottom: 70}}
          numColumns={3}
          data={this.state.searchResult && this.state.searchResult}
          keyExtractor={item => item.id}
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Search);
