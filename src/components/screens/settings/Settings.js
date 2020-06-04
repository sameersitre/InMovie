/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  Subheading,
  Divider,
  Caption,
  withTheme,
  Button,
  Switch,
} from 'react-native-paper';
import {
  setThemeAction,
  switchAdultAction,
} from '../../../containers/actions/userActions';
import ColorSelect from './ColorsSelect';
import SignIn from './SignIn'
class Settings extends Component {
  state = {
    isDarkSwitchOn: true,
    isAdultSwitchOn: false,
    showAdultToogle: false,
  };

  async componentDidMount() {
    this.setState({
      isDarkSwitchOn: this.props.user.switch_theme,
      isAdultSwitchOn: this.props.user.switch_adult,
    });
  }

  _onToggleAdultSwitch = () => {
    let changer = this.state.isAdultSwitchOn;
    this.setState({isAdultSwitchOn: !this.state.isAdultSwitchOn});
    this.props.switchAdultAction(!changer);
  };

  _onToggleDarkSwitch = () => {
    let changer = this.state.isDarkSwitchOn;
    this.setState({isDarkSwitchOn: !changer});
    this.props.setThemeAction(!changer);
  };

  render() {
    const {isAdultSwitchOn, isDarkSwitchOn, showAdultToogle} = this.state;
    const colors = this.props.theme.colors;
    const darkTheme = this.props.user.switch_theme;
    return (
      <ScrollView style={{flex: 1, padding: 15, paddingTop: 90}}>
        <StatusBar barStyle="light-content" />
        <Divider />
        <View style={styles.bar}>
          <View>
            <Subheading>Dark Theme</Subheading>
            <Caption>Current theme : {darkTheme ? 'Dark' : 'Light'}</Caption>
          </View>
          <View>
            <Switch
              trackColor={{true: colors.primary}}
              value={isDarkSwitchOn}
              onValueChange={this._onToggleDarkSwitch}
            />
          </View>
        </View>

        <Divider />

        <ColorSelect />

        <Divider />
        {showAdultToogle ? (
          <View style={styles.bar}>
            <View>
              <Subheading>Include Adult Content on Search</Subheading>
              <Caption>Gets disabled when the app is closed.</Caption>
            </View>
            <View>
              <Switch
                trackColor={{true: colors.primary}}
                value={isAdultSwitchOn}
                onValueChange={this._onToggleAdultSwitch}
              />
            </View>
          </View>
        ) : null}
        <Divider />
        <View style={styles.bar}>
          <View>
            <Subheading>Account</Subheading>
            <Caption
              onPress={() =>
                this.setState({showAdultToogle: !showAdultToogle})
              }>
              Sign In
            </Caption>
          </View>
          <View>
            <Button mode="outlined" onPress={() => console.log('object')}>
              Login
            </Button>
          </View>
        </View>

        <Divider />
        {/* <SignIn/> */}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 75,
  },
});

export default connect(
  mapStateToProps,
  {setThemeAction, switchAdultAction},
)(withTheme(Settings));
