/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Caption, withTheme, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {TMDB_IMAGE_URI} from '../../../utils/Config';

RecommendList = props => {
  const themeColors = props.theme.colors;
  const {id, media_type, recommends, navigator} = props.parentData;

  _renderFooter = () => {
    return recommends.length > 4 ? (
      <View
        style={{
          flex: 1,
          width: 130,
          height: 130,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          mode="contained"
          color={themeColors.primary}
          onPress={() =>
            navigator.navigate('recommendations', {
              routeData: props.parentData,
            })
          }>
          View All
        </Button>
      </View>
    ) : null;
  };

  return recommends.length > 0 ? (
    <View style={{flex: 1}}>
      <Caption
        style={[
          styles.caption,
          {color: themeColors.primary, paddingHorizontal: 5},
        ]}>
        More like this:
      </Caption>
      <FlatList
        horizontal={true}
        data={recommends && recommends.slice(0, 5)}
        extraData={this.state}
        keyExtractor={item => item.id}
        ref={ref => {
          this.flatList_Ref = ref; // <------ ADD Ref for the Flatlist
        }}
        ListFooterComponent={this._renderFooter}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigator.navigate('details', item)}
            style={{
              marginHorizontal: 4,
              marginBottom: 15,
              backgroundColor: 'transparent',
            }}>
            <Image
              style={{
                width: 110,
                height: 170,
                borderRadius: 2,
                backgroundColor: 'transparent',
              }}
              source={{
                uri: `${TMDB_IMAGE_URI}/w185${item.poster_path}`,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  caption: {
    fontWeight: 'bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10
  },
});
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withTheme(RecommendList));
