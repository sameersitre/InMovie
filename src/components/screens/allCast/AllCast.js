/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { PureComponent } from 'react';
import { 
  StyleSheet, 
  InteractionManager,

  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Title, Caption, withTheme, Button, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import CastCard from './CastCard';
import moment from 'moment';

class AllCast extends PureComponent {
  state = {
    loading: true
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }
  render() {
    const themeColors = this.props.theme.colors;
    const { cast, name, title, year, first_air_date, } = this.props.route.params
    if (this.state.loading)
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </View>
      );
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
            <Title style={{ color: '#E5CA49' }}>{title || name} &nbsp;</Title>
            <Caption style={styles.caption}>
              {moment(year || first_air_date).format('YYYY')}</Caption>
          </View>
        </View>

        <FlatList
          contentContainerStyle={{}}
          numColumns={3}
          data={cast}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CastCard parentData={item} />}
        />
      </View>
    );
  }
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
