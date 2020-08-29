/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { Card, Caption, withTheme } from 'react-native-paper';

const Streams = props => {
  const parentData = props.parentData;
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <Caption
        style={[
          styles.caption,
          { color: props.theme.colors.primary, paddingHorizontal: 5 },
        ]}>
        Available Streams:
      </Caption>
      <Card
        style={{
          // paddingHorizontal: 5,
          // backgroundColor: '#272727',
        }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            maxHeight: 50,
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          {
            parentData.platforms.map((value, i) => (
              <TouchableOpacity
                key={i}
                style={{ margin: 10 }}
                onPress={() =>
                  Linking.canOpenURL(value.url).then(supported => {
                    if (supported) {
                      Linking.openURL(value.url);
                    } else {
                      console.log(
                        "Don't know how to open URI: " + value.url,
                      );
                    }
                  })
                }>
                <Image
                  source={{
                    uri: value.icon,
                  }}
                  alt=" "
                  style={{ width: 70, height: 30, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  caption: {
    fontWeight: 'bold',
  },
});

export default withTheme(Streams);
