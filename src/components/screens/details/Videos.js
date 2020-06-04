/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React from 'react';
import {View, StyleSheet, ScrollView, Linking} from 'react-native';
import {Caption, withTheme, Button} from 'react-native-paper';

const Videos = props => {
  const detailsData = props.parentData;
  return detailsData.length > 0 ? (
    <View style={{flex: 1, marginTop: 10}}>
      <Caption
        style={[
          styles.caption,
          {color: props.theme.colors.primary, paddingHorizontal: 5},
        ]}>
        Trailers/ Videos:
      </Caption>

      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          maxHeight: 85,
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}>
        {detailsData.map((value, i) => (
          <Button
            key={i}
            mode="text"
            onPress={() =>
              Linking.openURL(
                `vnd.youtube://www.youtube.com/embed/${value.key}`,
              )
            }>
            <Caption>{`${i + 1}.${value.type}`}</Caption>
          </Button>
        ))}
      </ScrollView>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  caption: {
    fontWeight: 'bold',
  },
});

export default withTheme(Videos);
