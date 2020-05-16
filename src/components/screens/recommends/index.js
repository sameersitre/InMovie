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
export class Recommends extends Component {

    state = {
        page: 1,
        menuOpen: false,
        menuSelected: 1,
        menuItems: [
            { menuid: 1, name: "All", type: "all" },
            { menuid: 2, name: "Movies", type: "movie" },
            { menuid: 3, name: "TV Shows", type: "tv" }
        ],
        refresh: true,
        footerLoading: false,
        dataList: []
    }

    componentDidMount() {
        let data = this.props.route.params.routeData
        this.setState({ routeData: data })
        Reactotron.log(data)
        this._getData({
            id: data.id,
            media_type: data.media_type,
            page: 1
        })
    }

    componentDidUpdate() {
        if (this.state.routeData !== this.props.route.params.routeData) {
            this.flatList_Ref.scrollToIndex({ animated: true, index: 0 })
            let data = this.props.route.params.routeData
            this.setState({ routeData: data })
            this._getData({
                id: data.id,
                media_type: data.media_type,
                page: 1
            })
        }
    }

    _getData = async (data, prevData) => {
        this.setState({ footerLoading: true })
        await axios.get(`https://api.themoviedb.org/3/${data.media_type}/${data.id}/recommendations?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US&page=${data.page}`)
            .then(res => {
                let resData = res.data.results
                let addObject = resData.map((item) => { return { ...item, media_type: this.state.routeData.media_type } })
                this.setState({
                    dataList: prevData ? prevData.concat(addObject) : addObject,
                    footerLoading: false
                })
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ footerLoading: false })
            })
    }


    _addNewList = async () => {
        let newPage = this.state.page + 1
        this.setState({ page: newPage })
        let data = this.props.route.params.routeData
        let prevData = this.state.dataList
        this._getData({
            id: data.id,
            media_type: data.media_type,
            page: newPage
        },
            prevData)
    }

    _renderFooter = () => {
        if (!this.state.footerLoading) return <View style={{ height: 90 }} />
        return (
            <View style={{
                flex: 1, justifyContent: 'center',
                alignItems: 'center', height: 90
            }} >
                {/* <LottieAnim JSONAnimation={JSONAnimation} /> */}
                <ActivityIndicator size="small" color="#E33F05" />
            </View>
        );
    };

    render() {

        if (this.state.dataList === [])
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
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 70, marginTop: 70, }}
                        numColumns={3}
                        data={this.state.dataList && this.state.dataList}
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

export default connect(mapStateToProps, { trendingList, bufferEnableAction })(withTheme(Recommends));