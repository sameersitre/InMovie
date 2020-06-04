/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {PureComponent} from 'react';
import {Card, withTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import ModalDisplay from '../commonComponents/ModalDisplay';
import {TMDB_IMAGE_URI} from '../../utils/Config';

class CardView extends PureComponent {
  state = {
    modalStatus: false,
  };
  _nav = () => {
    this.setState({modalStatus: true});
  };

  render() {
    const {parentData, navigator} = this.props;
    console.tron.log(`card render! `);
    return (
      <TouchableOpacity
        style={{width: '31.7%', margin: '0.8%'}}
        onPress={() => this.props.navigator.navigate('details', parentData)}
        onLongPress={this._nav}>
        <Card elevation={2}>
          {parentData && (
            <Card.Cover
              resizeMode="contain"
              source={{
                uri: `${TMDB_IMAGE_URI}/w342${parentData.poster_path}`,
              }}
            />
          )}
        </Card>
        <ModalDisplay
          hideModal={() => this.setState({modalStatus: false})}
          modalStatus={this.state.modalStatus}
          parentData={parentData}
          navigator={navigator}
        />
      </TouchableOpacity>
    );
  }
}

export default withTheme(CardView);
