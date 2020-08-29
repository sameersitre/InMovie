/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { searchURL } from '../../../services/apiURL'
import MediaList from '../../common/MediaList'

class Search extends Component {
  state = {
    searchText: '',
    include_adult: this.props.user.switch_adult,
    childSearchText: ''
  };

  submitSearchText = () => {
    this.setState({ childSearchText: true })
  };

  render() {
    const { searchText, childSearchText } = this.state
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar barStyle="light-content" />
        <TextInput

          label="Search"
          // autoFocus={true}
          mode="outlined"
          autoCapitalize="none"
          style={{
            width: '95%', height: 40, margin: 5,
            borderColor: '#DC34B8', marginBottom: -50,
            elevation: 8, opacity: 0.8,
            zIndex: 1,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'black',
            shadowOpacity: 0.2,

          }}
          value={searchText}
          rounded={true}
          onChangeText={searchText => {
            this.setState({ searchText, childSearchText: false });
            //this.search(searchText);
          }}
          onEndEditing={this.submitSearchText}
          onSubmitEditing={Keyboard.dismiss}
        />

        {childSearchText ? <MediaList
          searchText={searchText}
          media_type="movie"
          adult={false}
          region="IN"
          apiURL={searchURL}
          routeTo={null}
          navigator={this.props.navigation}
        /> : null}

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Search);
