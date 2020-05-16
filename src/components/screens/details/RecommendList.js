import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, FlatList, ImageBackground, Animated, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button, Card,
    Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { connect } from 'react-redux'
import { getDetails, getCreditDetails } from '../../../containers/actions/userActions';

import Reactotron from 'reactotron-react-native'
// import Card from '../../commonComponents/Card'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json';
import CastModal from './CastModal'

class RecommendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditDetails: [],
            loading: false,
            modalStatus: false,
            dataList: [],
        }
    }

    componentDidMount() {
        let data = this.props.parentData
        // Reactotron.log(data)
        this._getData({
            id: data.id,
            media_type: data.media_type
        })
    }

    _getData = async (data) => {
        this.setState({ loading: true })
        await axios.get(`https://api.themoviedb.org/3/${data.media_type}/${data.id}/recommendations?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US&page=1`)
            .then(res => {
                this.setState({ dataList: res.data.results, loading: false, })
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ loading: false })
            })
    }

    _renderFooter = () => {
        return (
            this.state.dataList.length > 4 ?
                <View style={{ flex: 1, width: 130, height: 130, alignItems: 'center', justifyContent: 'center' }}>
                    <Button mode="contained" color="#E33F05"
                        onPress={() =>
                            this.props.navigator.navigate("recommendations", { routeData: this.props.parentData })}
                    >View All
            </Button>
                </View>
                : null
        );
    };

    render() {
        if (this.state.loading)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} >
                    {/* <LottieAnim JSONAnimation={JSONAnimation} /> */}
                    <ActivityIndicator size="small" color="#E33F05" />
                </View>
            )
        return (
            this.props.user.credit_details_data && this.props.user.credit_details_data.id !== "tt7694880" ?
                <View style={{ flex: 1, padding: 5, }} >

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                        <Caption style={{ color: '#757575' }}>Recommendations:</Caption>
                    </View>

                    <FlatList
                        horizontal={true}
                        data={this.state.dataList && this.state.dataList.slice(0, 5)}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                        ref={ref => {
                            this.flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                        }}
                        ListFooterComponent={this._renderFooter}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                // onPress={()=>this.props.navigator.navigate("details",item)}
                                style={{ width: 130, margin: 5, backgroundColor: 'transparent' }}

                            >
                                <Card
                                    style={{ backgroundColor: 'transparent' }}
                                    elevation={2} >
                                    <Card.Cover
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                    />
                                </Card>
                            </TouchableOpacity>
                        }
                    />
                </View>
                : <View style={{ flex: 1, padding: 5, height: 100, backgroundColor: "#000000", alignItems: 'center', justifyContent: 'center' }}>
                    <Subheading>No data available.</Subheading>
                </View>
        )
    }
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { getCreditDetails })(withTheme(RecommendList))
