/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React from 'react';
import {View, FlatList} from 'react-native';
import {Caption, withTheme, Button} from 'react-native-paper';
import CastCard from './CastCard';

const Cast = props => {
  const themeColors = props.theme.colors;
  const {castList, navigator} = props.parentData;
  _renderFooter = () => {
    return castList ? (
      <View
        style={{
          flex: 1,
          width: 130,
          height: 130,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => navigator.navigate('allcast',props.parentData)}
          mode="contained"
          color={themeColors.primary}>
          View All
        </Button>
      </View>
    ) : null;
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Caption
        style={{
          color: props.theme.colors.primary,
          fontWeight: 'bold',
          paddingHorizontal: 5,
        }}>
        Cast:
      </Caption>
      <FlatList
        horizontal={true}
        data={castList && castList.cast.slice(0, 5)}
        keyExtractor={item => item.id}
        ListFooterComponent={_renderFooter}
        renderItem={({item}) => <CastCard parentData={item} />}
      />
    </View>
  );
};

export default withTheme(Cast);
