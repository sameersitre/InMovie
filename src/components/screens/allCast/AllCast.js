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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Title, Caption, withTheme, Button, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import CastCard from './CastCard';

AllCast = props => {
  const {castList} = props.route.params;
  return (
    <View style={styles.centeredView}>
      <View
        style={{
          width: '100%',
          padding: 5,
          paddingTop: 50,
        }}>
        <Caption style={styles.caption}>CAST:</Caption>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            // justifyContent: 'center',
          }}>
          <Title style={{color: '#E5CA49'}}>{castList.title}</Title>
          <Caption style={styles.caption}>{castList.year}</Caption>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{}}
        numColumns={2}
        data={castList && castList.cast}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CastCard parentData={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
  },

  caption: {
    color: '#757575',
  },
});
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(withTheme(AllCast));
