import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, FlatList, ImageBackground, Animated, TouchableOpacity, Linking, Image } from 'react-native'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    ActivityIndicator, Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { connect } from 'react-redux'
import { getDetails, getCreditDetails } from '../../../containers/actions/userActions';

import Reactotron from 'reactotron-react-native'
import CastCard from './CastCard'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
import LottieAnim from '../../commonComponents/LottieAnim'
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json';
import CastModal from './CastModal'

class Cast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditDetails: [],
            loading: false,
            modalStatus: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user.credit_details_data !== prevState.creditDetails) {
            return {
                creditDetails: nextProps.user.credit_details_data,
            }
        }
        return null
    }

    componentDidMount() {
        this.props.getCreditDetails([])
        this._getData({
            "id": this.props.user.details_data.detailsData.id,
            "media_type": this.props.user.details_data.detailsData.media_type
        })
    }

    _getData = async (data) => {
        this.setState({ loading: true })
        await axios.post(`${main_url}/getCastDetailsMobile`, data)
            .then(res => {
                this.props.getCreditDetails(res.data)
                this.setState({ loading: false })
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ loading: false })
            })
    }


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
                    {this.state.modalStatus ?
                        <CastModal
                            hideModal={() => this.setState({ modalStatus: false })}
                            modalStatus={this.state.modalStatus}
                        />
                        : null}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                        <Caption style={{ color: '#757575' }}>Cast:</Caption>
                        <TouchableOpacity onPress={() => this.setState({ modalStatus: true })} >
                            <Caption style={{ color: '#E33F05' }}>View All</Caption>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <FlatList
                            horizontal={true}
                            data={this.props.user.credit_details_data && this.props.user.credit_details_data.cast}
                            extraData={this.state}
                            keyExtractor={item => item.id}
                            ref={ref => {
                                this.flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                            }}
                            renderItem={({ item }) =>
                                <CastCard
                                    parentData={item} />
                            }
                        />
                    </View>
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

export default connect(mapStateToProps, { getCreditDetails })(withTheme(Cast))
