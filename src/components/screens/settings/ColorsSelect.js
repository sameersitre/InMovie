/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Subheading, Caption} from 'react-native-paper';
import {setColorAction} from '../../../containers/actions/userActions';

ColorSelect = props => {
  select = value => {
    props.setColorAction(value.id);
  };
  return (
    <View style={styles.bar}>
      <View>
        <Subheading>Theme Colors</Subheading>
        <Caption>Select Theme color. </Caption>
      </View>
      <View style={{flexDirection: 'row'}}>
        {props.user.color_palete.map((value, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => this.select(value)}
            style={{
              borderColor:
                value.id === props.user.primary_color
                  ? '#64D7C6'
                  : 'transparent',
              padding: 0,
              margin: 2,
              borderWidth: 3,
              borderRadius: 3,
            }}>
            <View
              style={{
                width: 22,
                height: 22,
                margin: 0,
                backgroundColor: value.color,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 75,
  },
});
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {setColorAction},
)(ColorSelect);
