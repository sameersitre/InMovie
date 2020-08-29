/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { Caption, Card, withTheme } from 'react-native-paper';
import { TMDB_IMAGE_URI } from '../../../utils/Config';
class CastCard extends Component {

  render() {
    const { parentData } = this.props;
    return (
      <TouchableOpacity
        style={{ width: 110, marginHorizontal: 5, marginBottom: 15 }}
        elevation={0}>
        <Image
          style={{ width: 110, height: 170, borderRadius: 2 }}
          source={{
            uri: `${TMDB_IMAGE_URI}/w185${parentData.profile_path}`,
          }}
        />

        <Caption style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {parentData.actor}
        </Caption>

        <Caption style={[{ textAlign: 'center' }, styles.caption]}>
          {parentData.character || parentData.job}
        </Caption>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  caption: {
    color: '#757575',
  },
});

export default withTheme(CastCard);
