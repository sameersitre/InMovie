/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Menu, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { setUserInfo, setUserRegion } from '../../../containers/actions/userActions'
import userInfo from '../../../services/userInfo'
import apiCall from '../../../services/apiCall';
import { trendingURL, getInfo } from '../../../services/apiURL'
import MediaList from '../../common/MediaList'
export class Dashboard extends Component {
  state = {
    menuOpen: false,
    menuSelected: 1,
    menuItems: [
      { menuid: 1, name: 'All', media_type: 'all' },
      { menuid: 2, name: 'Movies', media_type: 'movie' },
      { menuid: 3, name: 'TV Shows', media_type: 'tv' },
    ],
  };
  async componentDidMount() {
    let user_info = await userInfo()
    this.props.setUserRegion(user_info.region)
    this.props.setUserInfo(user_info)
    await apiCall(getInfo, user_info)
  }
  _getList = value => {
    this.setState({ menuOpen: false, menuSelected: value.menuid });
  };

  render() {
    const colors = this.props.theme.colors;
    const { menuItems, menuOpen, menuSelected } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', }}>
        <StatusBar barStyle="light-content" />

        <View style={{
          position: 'absolute',
          //  top: 20,
          right: 10,
          zIndex: 10,
          // alignSelf: 'flex-end',
          // backgroundColor: 'pink'
        }}>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 17,
              flexDirection: 'row',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <Menu
              visible={menuOpen}
              onDismiss={() => this.setState({ menuOpen: false })}
              anchor={
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => this.setState({ menuOpen: true })}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {menuItems[menuSelected - 1].name}
                      &nbsp;&nbsp;
                    </Text>
                  <Ionicons
                    style={{ color: colors.primary, marginTop: 2 }}
                    name="ios-arrow-down"
                    color="#E33F05"
                    size={22}
                  />
                </TouchableOpacity>
              }>
              {menuItems.map((value, i) => (
                <Menu.Item
                  key={i}
                  onPress={() => this._getList(value)}
                  title={value.name}
                />
              ))}
            </Menu>
          </View>
        </View>

        <MediaList
          media_type={menuItems[menuSelected - 1].media_type}
          adult={false}
          //  region={this.props.user.user_info.region}
          apiURL={trendingURL}
          routeTo={null}
          navigator={this.props.navigation}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textShadow: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 13,
  },
});

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps, { setUserInfo, setUserRegion })(withTheme(Dashboard));

// export default withTheme(Dashboard);