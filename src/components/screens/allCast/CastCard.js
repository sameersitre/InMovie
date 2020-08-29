/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Caption, Card, withTheme } from 'react-native-paper';
import { TMDB_IMAGE_URI } from '../../../utils/Config';
class CastCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personDetails: null,
    };
  }

  render() {
    const { parentData } = this.props;
    return (
      <TouchableOpacity
        style={{ flex: 1, marginHorizontal: 5, marginBottom: 15, width: '100%' }}>
        <Card>
          <Card.Cover
            source={{
              uri: `${TMDB_IMAGE_URI}/h632${parentData.profile_path}`,
            }}
          />
          <Caption style={[{ fontWeight: 'bold' }, styles.caption]}>
            {parentData.actor}
          </Caption>

          <Caption style={[{ textAlign: 'center' }, styles.caption]}>
            {parentData.character || parentData.job}
          </Caption>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  caption: {
    color: '#757575',
    textAlign: 'center',
    padding: 3,
  },
});

export default withTheme(CastCard);
