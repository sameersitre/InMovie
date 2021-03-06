/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Title,
  Paragraph,
  Caption,
  withTheme,
  Button,
  Card,
} from 'react-native-paper';
import Genres from '../../utils/Genres';
import {TMDB_IMAGE_URI} from '../../utils/Config';

class ModalDisplay extends Component {
  state = {
    genreStrings: [],
  };

  componentDidMount() {
    this.getGenre();
  }

  openWebScreen = () => {
    this.props.navigator.navigate('webview', {
      routeData: `https://www.imdb.com/title/${this.state.movieData.imdb_id}`,
    });
  };
  getGenre = async () => {
    let allGenres = Genres.genres;
    let propGenres = this.props.parentData.genre_ids;
    let genreStrings = [];

    await propGenres.forEach(value => {
      for (let j = 0; j < allGenres.length; j++) {
        if (value === allGenres[j].id) {
          genreStrings.push(allGenres[j].name);
        }
      }
    });
    this.setState({genreStrings: genreStrings});
  };

  render() {
    const themeColor = this.props.theme.colors;
    return (
      <Modal
        style={styles.centeredView}
        animationType="fade"
        transparent={true}
        visible={this.props.modalStatus}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    width: '37%',
                    margin: '0.8%',
                    backgroundColor: 'transparent',
                  }}>
                  <Card style={{backgroundColor: 'transparent'}}>
                    {this.props.parentData && (
                      <Card.Cover
                        source={{
                          uri: `${TMDB_IMAGE_URI}/w500${
                            this.props.parentData.poster_path
                          }`,
                        }}
                      />
                    )}
                  </Card>
                </TouchableOpacity>

                <View style={{width: '66%', paddingHorizontal: 5}}>
                  <Title style={[styles.textShadow, {color: '#E5CA49'}]}>
                    {this.props.parentData.title || this.props.parentData.name}
                  </Title>
                  {this.props.parentData.title !==
                  this.props.parentData.original_title ? (
                    <Caption style={[styles.textShadow, {color: '#E5CA49'}]}>
                      ({this.props.parentData.original_title})
                    </Caption>
                  ) : null}

                  {this.props.parentData.name !==
                  this.props.parentData.original_name ? (
                    <Caption style={[styles.textShadow, {color: '#E5CA49'}]}>
                      ({this.props.parentData.original_name})
                    </Caption>
                  ) : null}

                  {this.props.parentData.tagline ? (
                    <Caption style={[styles.textShadow, {color: '#E5CA49'}]}>
                      {this.props.parentData.tagline}
                    </Caption>
                  ) : null}

                  <Caption style={[styles.textShadow, {color: '#FFFFFF'}]}>
                    {moment(
                      this.props.parentData.release_date ||
                        this.props.parentData.first_air_date,
                    ).format('ll')}{' '}
                    (USA)
                  </Caption>
                  {parseInt(this.props.parentData.vote_count) > 0 ? (
                    <TouchableOpacity style={{marginVertical: 5}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name="imdb" color={'yellow'} size={26} />
                        <Caption
                          style={[{color: '#FFFFFF'}, styles.textShadow]}>
                          &nbsp;&nbsp;{this.props.parentData.vote_average} (
                          {this.props.parentData.vote_count})
                        </Caption>
                      </View>
                    </TouchableOpacity>
                  ) : null}

                  {/*   **************        GENRES        *************  */}
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.state.genreStrings.map((value, i) => (
                      <View
                        key={i}
                        style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Caption
                          style={[{color: '#FFFFFF'}, styles.textShadow]}>
                          {value}&nbsp;&nbsp;
                        </Caption>
                        {i + 1 !== this.state.genreStrings.length ? (
                          <Caption style={styles.caption}>
                            |&nbsp;&nbsp;
                          </Caption>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              {/*   **************        OVERVIEW        *************  */}
              <View style={{padding: 10, marginTop: 5, height: 200}}>
                <Caption style={styles.caption}>Overview:</Caption>
                <ScrollView>
                  <Paragraph style={{color: '#FFFFFF'}}>
                    {this.props.parentData.overview}
                  </Paragraph>
                </ScrollView>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                mode="outlined"
                color="#E33F05"
                onPress={() => {
                  this.props.hideModal();
                  this.props.navigator.navigate('recommendations', {
                    routeData: this.props.parentData,
                  });
                }}>
                Recommendations
              </Button>

              <Button
                mode="outlined"
                color={themeColor.primary.toUpperCase().toString()}
                onPress={() => this.props.hideModal()}>
                Close
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 25,
    backgroundColor: 'rgba(0,0,0,0.9)',
    // backgroundColor: "grey",
    top: '10%',
    borderRadius: 10,
    padding: 10,
    // alignItems: "center",
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    color: '#757575',
  },
});

export default withTheme(ModalDisplay);
