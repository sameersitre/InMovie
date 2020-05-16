import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Animated, TouchableOpacity, Linking, Image, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { getDetails, getCreditDetails } from '../../../containers/actions/userActions';
import Card from '../../commonComponents/Card'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Reactotron from 'reactotron-react-native'
import moment from 'moment'
import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json'
import Overview from './Overview'
import Seasons from './Seasons'
import Videos from './Videos'
import Cast from './Cast'
import Streams from './Streams'
import CastModal from './CastModal'
import RecommendList from './RecommendList'
import LoadingScreen from '../../commonComponents/LoadingScreen'
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeData: null,
            fadeAnim: new Animated.Value(0),
            visible: false,
            loading: false,
            selectedimdbID: '',
            creditDetails: [],
            modalStatus: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user.details_data !== prevState.movieData) {
            return {
                movieData: nextProps.user.details_data.detailsData,
                creditDetails: nextProps.user.credit_details_data,
                isDarkTheme: nextProps.user.set_theme,
            }
        }
        return null
    }

    componentDidMount() {
        this.setState({ routeData: this.props.route.params })
        this._getData(this.props.route.params)
     }

    componentDidUpdate() {
        if (this.state.routeData !== this.props.route.params) {
            this.setState({ routeData: this.props.route.params })
            this._getData(this.props.route.params)
        }
    }

    _getData = async (data) => {
        this.setState({ loading: true })
        await axios.post(`${main_url}/getDetailsMobile`, data)
            .then(res => {
                if (res.data.detailsData !== null) {
                    this.props.getDetails(res.data)
                }
                else {
                    Alert.alert("Item not available.")
                    this.props.navigation.goBack()
                }
                this.setState({ loading: false })
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ loading: false })
            })
    }
    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true, // <-- Add this
        }).start();
    };

    openWebScreen = (value) => {
        this.props.navigation.navigate("webview",
            { URL: value.toString() })
    }

    render() {
        if (this.state.loading || !this.state.movieData)
            return (

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    {/* <LoadingScreen /> */}
                    {/* <LottieAnim JSONAnimation={JSONAnimation} /> */}
                    <ActivityIndicator size="large" color="#E33F05" />
                </View>
            )
        return (
            <View style={{ flex: 1, }}>
                {this.fadeIn()}
                <ImageBackground
                    source={{ uri: this.state.movieData && `https://image.tmdb.org/t/p/w500${this.state.movieData.backdrop_path}` }}
                    style={styles.image}>
                    <CastModal
                        hideModal={() => this.setState({ modalStatus: false })}
                        modalStatus={this.state.modalStatus}
                    />
                    <ScrollView
                        style={{ backgroundColor: this.state.isDarkTheme ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)' }} >
                        <Animated.View style={{ flexDirection: 'row', marginTop: 90, opacity: this.state.fadeAnim }}>
                            <Card
                                currentRoute="Details"
                                parentData={this.state.movieData} />

                            {/*   **************        METADATA        *************  */}

                            <View style={{ width: '66%', padding: 5 }} >
                                <Title
                                    style={[styles.textShadow, { color: '#E5CA49', }]} >
                                    {this.state.movieData.title || this.state.movieData.name}
                                </Title>
                                {(this.state.movieData.title !== this.state.movieData.original_title) ?
                                    <Caption
                                        style={[styles.textShadow, { color: '#E5CA49', }]} >
                                        ({this.state.movieData.original_title || this.state.movieData.original_name})
                                        </Caption>
                                    : null}
                                {(this.state.movieData.name !== this.state.movieData.original_name) ?
                                    <Caption
                                        style={[styles.textShadow, { color: '#E5CA49', }]} >
                                        ({this.state.movieData.original_name})
                                        </Caption>
                                    : null}

                                {this.state.movieData.tagline ? <Caption
                                    style={[styles.textShadow, { color: '#E5CA49', }]} >
                                    {this.state.movieData.tagline}
                                </Caption> : null}

                                <Caption style={[styles.textShadow, { color: '#FFFFFF', }]} >
                                    {moment(this.state.movieData.release_date
                                        ||
                                        this.state.movieData.first_air_date).format('ll')
                                    } (USA)
                                    </Caption>
                                {parseInt(this.state.movieData.vote_count) > 0 ?
                                    <TouchableOpacity
                                        style={{ marginVertical: 5 }}
                                        onPress={() =>
                                            this.openWebScreen(`https://www.imdb.com/title/${this.props.user.credit_details_data.id}`)}
                                    >

                                        <View
                                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome name="imdb" color={'yellow'} size={26}
                                            />
                                            <Caption
                                                style={[{ color: '#FFFFFF', }, styles.textShadow]} >
                                                &nbsp;&nbsp;{this.state.movieData.vote_average} ({this.state.movieData.vote_count})
                                            </Caption>
                                        </View>

                                    </TouchableOpacity> : null}
                                {this.state.movieData.runtime ?
                                    <Caption
                                        style={[{ color: '#FFFFFF', }, styles.textShadow]} >
                                        {this.state.movieData.runtime} mins
                                        </Caption> : null}

                                {/*   **************        GENRES        *************  */}

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                                    {this.state.movieData.genres && this.state.movieData.genres.map((value, i) =>
                                        <View key={i} style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                            <Caption
                                                style={[{ color: '#FFFFFF', }, styles.textShadow]} >
                                                {value.name}&nbsp;&nbsp;
                                                </Caption>
                                            {i + 1 !== this.state.movieData.genres.length ?
                                                <Caption style={styles.caption}>
                                                    |&nbsp;&nbsp;
                                                    </Caption>
                                                : null}
                                        </View>
                                    )}
                                </View>
                            </View>
                        </Animated.View>

                        <Overview />

                        {/*   **************        SEASONS        *************  */}
                        {this.state.movieData.seasons ?
                            <View style={{ padding: 5 }}>
                                <Seasons
                                    currentRoute="Details"
                                    navigator={this.props.navigation}
                                    parentData={this.state.movieData.seasons}
                                />
                            </View> : null}


                        {this.props.user.details_data.videoData ?
                            <Videos />
                            : null}


                        {this.props.user.details_data.streams.length > 0 ||
                            this.props.user.details_data.detailsData.networks
                            ? <Streams navigator={this.props.navigation} /> : null}


                        <Cast
                            navigator={this.props.navigation}
                        />
                        <RecommendList
                            navigator={this.props.navigation}
                            parentData={this.props.route.params}
                        />
                        {/* {this.state.creditDetails ?
                            <View style={{ padding: 5 }} >

                                {this.state.creditDetails > 0 ?
                                    <View>
                                        <Caption style={styles.caption}>Casts:</Caption>
                                        <ScrollView
                                            horizontal={true}
                                            contentContainerStyle={{
                                                minHeight: 150,
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                            }}  >
                                            {this.state.creditDetails.map((value, i) =>
                                                <TouchableOpacity key={i} style={{}}  >
                                                    <Credits
                                                        parentData={value} />
                                                </TouchableOpacity>
                                            )}
                                        </ScrollView>
                                    </View>
                                    : null}
                            </View> : null
                        } */}
                        <View style={{ height: 20 }} />
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    caption: {
        color: '#757575'
    },
    image: {
        // position:'relative',
        // height: '80%',
        // width: '100%',
        backgroundColor: '#000000'
    },
    tinyLogo: {
        width: 50,

    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    }
});


const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps, { getDetails, getCreditDetails })(withTheme(Details))
