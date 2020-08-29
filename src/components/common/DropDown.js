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
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Menu, Provider, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
export class DropDown extends Component {
    state = {
        page: 1,
        dashboardData: null,
        menuOpen: false,
        menuSelected: 1,
        menuItems: [
            { menuid: 1, name: 'All', media_type: 'all' },
            { menuid: 2, name: 'Movies', media_type: 'movie' },
            { menuid: 3, name: 'TV Shows', media_type: 'tv' },
        ],
        refresh: true,
        footerLoading: false,
    };

    _getList = value => {
        this.setState({ menuOpen: false, menuSelected: value.menuid });
        let data = { page: 1, media_type: value.media_type };
    };

    _addNewList = async () => {
        let newPage = this.state.page + 1;
        this.setState({ page: newPage });
        let data = {
            page: newPage,
            media_type: this.state.menuItems[this.state.menuSelected - 1].media_type,
        };
        let prevData = this.state.dashboardData;
        this._getData(data, prevData);
    };

    render() {
        const colors = this.props.theme.colors;
        const { menuItems, menuOpen, menuSelected } = this.state;

        return (
            <Provider style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        paddingTop: 30,
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
                                        fontSize: 18,
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
            </Provider>
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

export default withTheme(DropDown);