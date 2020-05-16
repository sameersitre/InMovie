import React, { Component } from 'react'
import { View, Text, ScrollView, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '../../commonComponents/Card'
import { upcomingMoviesData } from '../../../containers/actions/userActions';
import { Colors } from 'react-native-paper';
import Reactotron from 'reactotron-react-native'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
import LoadingScreen from '../../commonComponents/LoadingScreen'

import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json'
export class Upcoming extends Component {
    static propTypes = {
        prop: PropTypes
    }
    state = {
        footerLoading: false,
        page: 1,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user) {
            return {
                movieData: nextProps.user.upcoming_movie_data
            }
        }
        return null
    }

    componentDidMount() {
        let data = { "page": 1, "media_type": "movie", "adult": "false" }
        this._getData(data, null)
    }

    _getData = async (data, prevData) => {
        this.setState({ footerLoading: true })
        await axios.post(`${main_url}/upcoming`, data)
            .then(res => {
                this.props.upcomingMoviesData(res.data.results, prevData)
                this.setState({ footerLoading: false })
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ footerLoading: false })
            })
    }


    addNewList = () => {
        let newPage = this.state.page + 1
        this.setState({ page: newPage })
        let data = { "page": newPage, "media_type": "movie", "adult": "false" }
        let prevData = this.state.movieData
        this._getData(data, prevData)
    }

    _renderFooter = () => {
        if (!this.state.footerLoading) return <View style={{ height: 90 }} />
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 90 }} >
                {/* <LottieAnim JSONAnimation={JSONAnimation} /> */}
                <ActivityIndicator size="small" color="#E33F05" />
            </View>
        );
    };
    render() {

        if (!this.state.movieData)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    {/* <LoadingScreen /> */}
                    <ActivityIndicator size="large" color="#E33F05" />
                </View>
            )
        else
            return (
                <View style={{ flex: 1, alignItems: 'center', }}>
                    <StatusBar barStyle="light-content" />
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 100, marginTop: 70, }}
                        numColumns={3}
                        data={this.state.movieData && this.state.movieData}
                        extraData={this.state}
                        keyExtractor={(item, index) => item.id}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => this.addNewList()}
                        ListFooterComponent={this._renderFooter}
                        renderItem={({ item }) =>
                            <Card
                                currentRoute="Upcoming"
                                navigator={this.props.navigation}
                                parentData={{ ...item, media_type: "movie" }} />
                        }
                    />
                </View>
            )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { upcomingMoviesData })(Upcoming);