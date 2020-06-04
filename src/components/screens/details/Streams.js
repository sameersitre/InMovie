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
import {Card,Caption, withTheme} from 'react-native-paper';
import {TMDB_IMAGE_URI} from '../../../utils/Config';

const Streams = props => {
  const detailsData = props.parentData;
  return detailsData.networks ? (
    <View style={{flex: 1, marginTop: 10}}>
      <Caption
        style={[
          styles.caption,
          {color: props.theme.colors.primary, paddingHorizontal: 5},
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
          {detailsData.networks &&
            detailsData.networks.map((value, i) => (
              <TouchableOpacity
                key={i}
                style={{margin: 10}}
                onPress={() =>
                  Linking.canOpenURL(detailsData.homepage).then(supported => {
                    if (supported) {
                      Linking.openURL(detailsData.homepage);
                    } else {
                      console.log(
                        "Don't know how to open URI: " + detailsData.homepage,
                      );
                    }
                  })
                }>
                <Image
                  source={{
                    uri: `${TMDB_IMAGE_URI}/w92${value.logo_path}`,
                  }}
                  alt=" "
                  style={{width: 70, height: 30, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Card>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  caption: {
    fontWeight: 'bold',
  },
});

export default withTheme(Streams);
