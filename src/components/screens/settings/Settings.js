import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

import { setThemeAction, switchAdultAction } from '../../../containers/actions/userActions';

import {
    Title, Subheading, Divider, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    ActivityIndicator, Colors, Chip, Dialog, Portal, Switch
} from 'react-native-paper';
class Settings extends Component {
    state = {
        isDarkSwitchOn: true,
        isAdultSwitchOn: false,
        isSigninInProgress: false,
        userInfo: null,
        error: null,
    };

    async  componentDidMount() {
        this.setState({
            isDarkSwitchOn: this.props.user.set_theme,
            isAdultSwitchOn: this.props.user.switch_adult
        })
        this._configureGoogleSignIn();
        await this._getCurrentUser();
    }

    _onToggleAdultSwitch = () => {
        let changer = this.state.isAdultSwitchOn
        this.setState({ isAdultSwitchOn: !this.state.isAdultSwitchOn })
        this.props.switchAdultAction(!changer)
    }

    _onToggleDarkSwitch = () => {
        let changer = this.state.isDarkSwitchOn
        this.setState({ isDarkSwitchOn: !changer })
        this.props.setThemeAction(!changer)
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: false,
        });
    }

    async _getCurrentUser() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo, error: null });
        } catch (error) {
            const errorMessage =
                error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
            this.setState({
                error: new Error(errorMessage),
            });
        }
    }



    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo, error: null });
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    // sign in was cancelled
                    Alert.alert('cancelled');
                    break;
                case statusCodes.IN_PROGRESS:
                    // operation (eg. sign in) already in progress
                    Alert.alert('in progress');
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    // android only
                    Alert.alert('play services not available or outdated');
                    break;
                default:
                    Alert.alert('Something went wrong', error.toString());
                    this.setState({
                        error,
                    });
            }
        }
    };

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            this.setState({ userInfo: null, error: null });
        } catch (error) {
            this.setState({
                error,
            });
        }
    };
    renderIsSignedIn() {
        return (
            <Button
                onPress={async () => {
                    const isSignedIn = await GoogleSignin.isSignedIn();
                    Alert.alert(String(isSignedIn));
                }}
                title="is user signed in?"
            />
        );
    }

    renderGetCurrentUser() {
        return (
            <Button
                onPress={async () => {
                    const userInfo = await GoogleSignin.getCurrentUser();
                    Alert.alert('current user', userInfo ? JSON.stringify(userInfo.user) : 'null');
                }}
                title="get current user"
            />
        );
    }

    renderGetTokens() {
        return (
            <Button
                onPress={async () => {
                    const isSignedIn = await GoogleSignin.getTokens();
                    Alert.alert('tokens', JSON.stringify(isSignedIn));
                }}
                title="get tokens"
            />
        );
    }

    renderUserInfo(userInfo) {
        return (
            <View style={styles.container}>
                <Text style={styles.userInfo}>Welcome {userInfo.user.name}</Text>
                <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>
                <TokenClearingView userInfo={userInfo} />

                <Button onPress={this._signOut} title="Log out" />
                {this.renderError()}
            </View>
        );
    }

    renderSignInButton() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Auto}
                    onPress={this._signIn}
                />
                {this.renderError()}
            </View>
        );
    }

    renderError() {
        const { error } = this.state;
        if (!error) {
            return null;
        }
        const text = `${error.toString()} ${error.code ? error.code : ''}`;
        return <Text>{text}</Text>;
    }

    render() {
        const { isAdultSwitchOn, isDarkSwitchOn } = this.state;
        const darkTheme = this.props.user.set_theme;
        const { userInfo } = this.state;

        const body = userInfo ? this.renderUserInfo(userInfo) : this.renderSignInButton();
        return (
            <ScrollView style={{ flex: 1, padding: 15, paddingTop: 90 }}>
                <StatusBar barStyle="light-content" />
                <Divider />
                <View style={styles.bar}>
                    <View>
                        <Subheading>Dark Theme</Subheading>
                        <Caption>Current theme : {darkTheme ? "Dark" : "Light"}</Caption>
                    </View>
                    <View>
                        <Switch
                            value={isDarkSwitchOn}
                            onValueChange={this._onToggleDarkSwitch}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.bar}>
                    <View>
                        <Subheading>View Adult Content on Search</Subheading>
                        <Caption>Gets disabled when the app is closed.</Caption>
                    </View>
                    <View>
                        <Switch
                            value={isAdultSwitchOn}
                            onValueChange={this._onToggleAdultSwitch}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.bar}>
                    <View>
                        <Subheading>Account</Subheading>
                        <Caption>Sign In</Caption>
                    </View>
                    <View>
                        <Button mode="outlined"
                            onPress={() => console.log('Pressed')}>Login
                            </Button>



                    </View>
                </View>

                <Divider />
                {/* <View style={styles.bar}>
                    <View>
                        <Subheading>Account</Subheading>
                        <Caption>Sign In</Caption>
                    </View>

                    <View >
                        {this.renderIsSignedIn()}
                        {this.renderGetCurrentUser()}
                        {this.renderGetTokens()}
                        {body}
                    </View>
                </View> */}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = {

}
const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 75
    }
})

export default connect(mapStateToProps, { setThemeAction, switchAdultAction })(Settings)
