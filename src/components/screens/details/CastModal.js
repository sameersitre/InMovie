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
class CastModal extends Component {
    state = {
        genreStrings: [],
        data: [],
        isAPICalled: false,
        loading: false,
    }

    componentDidMount() {
    }

    getData = async () => {
        this.setState({ isAPICalled: true, loading: true, data: [] })
         await axios.get(`https://imdb-api.com/en/API/FullCast/k_PyBnSmN8/${this.props.user.credit_details_data.id}`)
            .then(res => {
                this.setState({ data: res.data.actors, loading: false })
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
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 15
            }} >
            <Card style={{ width: "95%", borderRadius: 40, alignSelf: 'center' }}>
                <Card.Cover
                    source={{ uri: data.value.image }}
                />
            </Card>
            <Caption style={{ color: '#FFFFFF', textAlign: 'center', }}>
                {data.value.asCharacter}
            </Caption>
            <Caption style={[{ textAlign: 'center' }, styles.caption]}>
                {data.value.name}
            </Caption>
        </TouchableOpacity>

    render() {
        (this.props.modalStatus && !this.state.isAPICalled) ? this.getData() : null
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalStatus}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Caption
                            style={{ color: '#E5CA49', alignSelf: "center" }} >
                            {this.props.user.details_data.detailsData.title || this.props.user.details_data.detailsData.name}
                        </Caption>
                        <Caption
                            style={{ color: '#757575' }} >
                            Characters:
                        </Caption>

                        {this.state.loading
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                {/* <LoadingScreen /> */}
                                <ActivityIndicator size="large" color="#E33F05" />
                            </View>
                            : <FlatList
                                contentContainerStyle={{}}
                                numColumns={2}
                                data={this.state.data && this.state.data}
                                extraData={this.state}
                                keyExtractor={item => item.id}
                                ref={ref => {
                                    this.flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                                }}
                                renderItem={({ item }) =>
                                    <this.CastCard
                                        value={item} />
                                }
                            />}

                        <Button mode="outlined" color="#E33F05"
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
export default connect(mapStateToProps)(withTheme(CastModal));