import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, StatusBar, StyleSheet, Title, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { Colors, Button, Paragraph, Menu, Divider, Provider, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Reactotron from 'reactotron-react-native'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';

import LoadingScreen from '../../commonComponents/LoadingScreen'
import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json'
import Card from '../../commonComponents/Card'
import { trendingList, bufferEnableAction } from '../../../containers/actions/userActions';
export class Dashboard extends Component {

    state = {
        page: 1,
        movieData: [],
        menuOpen: false,
        menuSelected: 1,
        menuItems: [
            { menuid: 1, name: "All", type: "all" },
            { menuid: 2, name: "Movies", type: "movie" },
            { menuid: 3, name: "TV Shows", type: "tv" }
        ],
        refresh: true,
        footerLoading: false,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user) {
            return {
                movieData: nextProps.user.movie_data,
            }
        }
        return null
    }

    componentDidMount() {
        let data = { "page": 1, "type": "all" }
        this._getData(data, null)
        // this.props.trendingList(data)
     }

    _getData = async (data, prevData) => {
        this.setState({ footerLoading: true })
        await axios.post(`${main_url}/trending`, data)
            .then(res => {
                this.props.trendingList(res.data.results, prevData)
                this.setState({ footerLoading: false })
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ footerLoading: false })
            })
    }

    _getList = (value) => {
        this.flatList_Ref.scrollToIndex({ animated: true, index: 0 })
        this.setState({ menuOpen: false, menuSelected: value.menuid })
        let data = { "page": 1, "type": value.type }
        setTimeout(() => { this._getData(data, null) }, 1500);
    }

    _addNewList = async () => {
        let newPage = this.state.page + 1
        this.setState({ page: newPage, })
        let data = { "page": newPage, "type": this.state.menuItems[this.state.menuSelected - 1].type }
        let prevData = this.state.movieData
        this._getData(data, prevData)
    }

    _renderFooter = () => {
        if (!this.state.footerLoading) return <View style={{ height: 90 }} />
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height: 90 }} >
                {/* <LottieAnim JSONAnimation={JSONAnimation} /> */}
                <ActivityIndicator size="small" color="#E33F05" />
            </View>
        );
    };

    render() {

        if (this.state.movieData === undefined)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    {/* <LoadingScreen /> */}
                    <ActivityIndicator size="large" color="#E33F05" />
                </View>
            )
        else
            return (
                <Provider style={{ flex: 1, alignItems: 'center', }}>
                    <StatusBar barStyle="light-content" />
                    <View
                        style={{ position: 'absolute', top: 30, zIndex: 5 }} >
                        <View
                            style={{
                                paddingTop: 20,
                                paddingLeft: 17,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                color: '#FFFFFF'
                            }}>
                            <Menu
                                visible={this.state.menuOpen}
                                onDismiss={() => this.setState({ menuOpen: false })}
                                anchor={
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        onPress={() => this.setState({ menuOpen: true })}
                                    >
                                        <Text
                                         style={{ color: '#E33F05',fontWeight:'bold',fontSize:18 } } >
                                            {this.state.menuItems[this.state.menuSelected - 1].name}&nbsp;&nbsp;
                                        </Text>
                                        <Ionicons
                                            style={[{ color: '#E33F05', marginTop: 2 } ]}
                                            name="ios-arrow-down" color="#E33F05" size={21} />
                                    </TouchableOpacity>
                                }>
                                {this.state.menuItems.map((value, i) =>
                                    <Menu.Item key={i} onPress={() => this._getList(value)}
                                        title={value.name} />
                                )}
                            </Menu>
                        </View>
                    </View>
                    <FlatList

                        contentContainerStyle={{ paddingBottom: 70, marginTop: 70, }}
                        numColumns={3}
                        data={this.state.movieData && this.state.movieData}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => this._addNewList()}
                        ListFooterComponent={this._renderFooter}
                        ref={ref => {
                            this.flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                        }}
                        renderItem={({ item }) =>
                            <Card
                                currentRoute="dashboard"
                                navigator={this.props.navigation}
                                parentData={item}
                            />
                        }
                    />
                </Provider>
            )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const styles = StyleSheet.create({
    textShadow: {
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 13
    },
})

export default connect(mapStateToProps, { trendingList, bufferEnableAction })(withTheme(Dashboard));