import React, { Component } from "react";
import {
    Alert, Modal, StyleSheet, TouchableOpacity, View, FlatList, Image, ActivityIndicator
} from "react-native";
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    Colors, Chip, Dialog, Portal, Card
} from 'react-native-paper';
import { connect } from 'react-redux'

import Reactotron from 'reactotron-react-native'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json'
class SeasonEpisodesModal extends Component {
    state = {
        data: [],
        isAPICalled: false,
        loading: false,
        selectedSeason: 1
    }

    componentDidMount() {


    }

    getData = async () => {
        let params = {
            id: this.props.user.details_data.detailsData.id,
            seasonNumber:this.props.selectedSeason.season_number
        }
        this.setState({ isAPICalled: true, loading: true, data: [] })
        await axios.get(
            `https://api.themoviedb.org/3/tv/${params.id}/season/${params.seasonNumber}?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US`
        )
            .then(res => {
                this.setState({ data: res.data, loading: false })
            })
            .catch(function (error) {
                console.log(error);

            })
    }

    CastCard = (data) =>
        <TouchableOpacity
            elevation={0}
            style={{
                flex: 1,
                padding: 1, backgroundColor: 'transparent',
                flexDirection: 'row', marginBottom: 15
            }} >
            <Card style={{ width: "100%" }}>
                <Card.Cover
                    source={{ uri: `https://image.tmdb.org/t/p/w500${data.value.still_path}` }}
                />

                <View style={{ padding: 10 }}>
                    <Caption style={{ color: '#FFFFFF', }}>
                        Episode: {data.value.episode_number}:   {data.value.name}
                    </Caption>
                    <Caption style={[{}, styles.caption]}>
                        Ratings: {data.value.vote_average}
                    </Caption>
                    <Caption style={[{}, styles.caption]}>
                        {data.value.overview}
                    </Caption>

                </View>
            </Card>
        </TouchableOpacity>

    render() {
        (this.props.modalStatus && !this.state.isAPICalled) ? this.getData() : null
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalStatus}
            // onRequestClose={() => {
            //     Alert.alert("Modal has been closed.");
            // }} 
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View
                            style={{
                                alignSelf: 'center', padding: 10, width: '100%'
                            }}>
                            <Caption style={[{}, styles.caption]}>
                                {this.state.data.name}
                            </Caption>
                            <Caption style={{ color: '#FFFFFF', }}>
                                {this.state.data.overview}
                            </Caption>
                        </View>
                        {this.state.loading
                            ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                {/* <LoadingScreen /> */}
                                <ActivityIndicator size="large" color="#E33F05" />
                            </View>
                            :
                            <FlatList
                                contentContainerStyle={{}}
                                numColumns={1}
                                data={this.state.data && this.state.data.episodes}
                                extraData={this.state}
                                keyExtractor={item => item.id}
                                ref={ref => {
                                    this.flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                                }}
                                renderItem={({ item }) =>
                                    <this.CastCard
                                        value={item} />
                                }
                            />
                        }

                        <Button mode="outlined" color="#E33F05" style={{ margin: 5 }}
                            onPress={() => this.props.hideModal()} >Close
                            </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        width: '100%',
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        margin: 25,
        backgroundColor: "rgba(0,0,0,0.9)",

        height: "90%",
        top: 0,
        // bottom:"10%",
        width: '90%',

        borderRadius: 10,
        padding: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    caption: {
        color: '#757575'
    },
});
const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(withTheme(SeasonEpisodesModal));