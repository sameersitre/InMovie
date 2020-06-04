/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React, {Component} from 'react';
import axios from 'axios';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {Caption, Card, withTheme} from 'react-native-paper';
import {TMDB_URI, TMDB_API_KEY, TMDB_IMAGE_URI} from '../../../utils/Config';
class CastCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personDetails: null,
    };
  }

  componentDidMount() {
    this.setState({personDetails: null});
    this._getData();
  }

  _getData = async () => {
    await axios
      .get(
        `${TMDB_URI}/find/${
          this.props.parentData.actor_id
        }?api_key=${TMDB_API_KEY}&language=en-US&external_source=imdb_id`,
      )
      .then(res => {
        this.setState({personDetails: res.data.person_results[0]});
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const {parentData} = this.props;
    return (
      <TouchableOpacity
        style={{flex: 1, marginHorizontal: 5, marginBottom: 15, width: '100%'}}>
        <Card>
          <Card.Cover
            source={{
              uri: `${TMDB_IMAGE_URI}/h632${this.state.personDetails &&
                this.state.personDetails.profile_path}`,
            }}
          />
          <Caption style={[{fontWeight: 'bold'}, styles.caption]}>
            {parentData.actor}
          </Caption>

          <Caption style={[{textAlign: 'center'}, styles.caption]}>
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
