/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import BottomNavigation from './BottomNavigation';

class MainNavigation extends Component {
  render() {
    const darkTheme = this.props.user.switch_theme;
    const colorSelected = this.props.user.color_palete[
      this.props.user.primary_color - 1
    ].color;

    const CombinedDarkTheme = {
      ...PaperDarkTheme,
      ...NavigationDarkTheme,
      colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: colorSelected,
      },
    };

    const CombinedLightTheme = {
      ...PaperLightTheme,
      ...NavigationDefaultTheme,
      colors: {
        ...PaperLightTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: colorSelected,
      },
    };

    return (
      <PaperProvider theme={darkTheme ? CombinedDarkTheme : CombinedLightTheme}>
        <NavigationContainer
          theme={darkTheme ? CombinedDarkTheme : CombinedLightTheme}>
          <BottomNavigation />
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MainNavigation);
