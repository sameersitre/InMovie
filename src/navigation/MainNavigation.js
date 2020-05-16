
import React, { Component } from 'react';
import { connect } from 'react-redux'

import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperLightTheme, Provider as PaperProvider, } from 'react-native-paper';
import BottomNavigation from './BottomNavigation'

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  
  ...NavigationDarkTheme,
  colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors, primary: '#E33F05', },
};
const CombinedLightTheme = {
  ...PaperLightTheme,
  ...NavigationDefaultTheme,
  colors: { ...PaperLightTheme.colors, ...NavigationDefaultTheme.colors },
};

class MainNavigation extends Component {
  render() {
    const darkTheme = this.props.user.set_theme
    return (
      <PaperProvider theme={darkTheme ? CombinedDarkTheme : CombinedLightTheme}>
        <NavigationContainer theme={darkTheme ? CombinedDarkTheme : CombinedLightTheme}>
          <BottomNavigation />
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(MainNavigation);