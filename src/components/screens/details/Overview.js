/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React from 'react';
import {View} from 'react-native';
import {Caption, withTheme, Text} from 'react-native-paper';

const Overview = props => {
  const colors = props.theme.colors;
  const detailsData = props.parentData;
  return (
    <View style={{marginTop: 10, paddingHorizontal: 5}}>
      <Caption style={{color: colors.primary, fontWeight: 'bold'}}>
        Overview:
      </Caption>
      <Caption>{detailsData.overview}</Caption>
    </View>
  );
};

export default withTheme(Overview);
