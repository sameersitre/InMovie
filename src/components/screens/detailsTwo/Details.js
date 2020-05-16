import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Animated, TouchableOpacity, Linking, Image } from 'react-native'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    ActivityIndicator, Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import Reactotron from 'reactotron-react-native'
import moment from 'moment'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
import { getDetails, getCreditDetails } from '../../../containers/actions/userActions';
import Card from '../../commonComponents/Card'
import Seasons from './Seasons'
import Tabs from './Tabs'

import Overview from './Overview'
import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json'
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeData: this.props.route.params,
            fadeAnim: new Animated.Value(0),
            visible: false,
            bufferEnabled: false,
            selectedimdbID: '',
            creditDetails: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user.details_data !== prevState.movieData) {
            return {
                movieData: nextProps.user.details_data.detailsData,
                videoData: nextProps.user.details_data.videoData,
                streamAvailablity: nextProps.user.details_data.streams,
                creditDetails: nextProps.user.credit_details_data,
                isDarkTheme: nextProps.user.set_theme,
            }
        }
        return null
    }

    componentDidMount() {
        this.props.getCreditDetails([])
        this._getData(this.state.routeData)
     }

    _getData = async (data) => {
        await axios.post(`${main_url}/getDetailsMobile`, data)
            .then(res => {
                this.props.getDetails(res.data)
            })
            .catch(function (error) {
                console.log(error);
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
        if (!this.state.movieData)
            return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <LottieAnim JSONAnimation={JSONAnimation}
                />
            </View>

            )
        else
            return (
                <View style={{ flex: 1, backgroundColor: "#000000", height: "100%" }}>
                    {this.fadeIn()}

                    <ImageBackground
                        source={{ uri: this.state.movieData && `https://image.tmdb.org/t/p/w500${this.state.movieData.backdrop_path}` }}
                        style={styles.image}>
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
                                            ({this.state.movieData.original_title})
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
                                                this.openWebScreen(`https://www.imdb.com/title/${this.state.movieData.imdb_id}`)}
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


                            <View >
                                <Tabs />
                            </View>



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


export default connect(mapStateToProps, { getDetails , getCreditDetails})(withTheme(Details))
