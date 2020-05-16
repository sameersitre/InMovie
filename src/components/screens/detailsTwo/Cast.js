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
import JSONAnimation from '../../../assets/animations/lf30_editor_w6gE0g.json'
class Cast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditDetails: []
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
         this._getData({
            "id": this.props.user.details_data.detailsData.id,
            "media_type": this.props.user.details_data.detailsData.media_type
        })
     }

    _getData = async (data) => {
        await axios.post(`${main_url}/getCastDetailsMobile`, data)
            .then(res => {
                this.props.getCreditDetails(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        if (!this.props.user.credit_details_data)
            return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <LottieAnim JSONAnimation={JSONAnimation}
                />
            </View>

            )
        return (
            <View style={{ padding: 5, }} >

                <View >
                    <FlatList
                        horizontal={true}
                      //  contentContainerStyle={{ paddingBottom: 70, }}
                        //numColumns={3}
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


                {/* <View>
                    <Caption style={styles.caption}>Crews:</Caption>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            minHeight: 150,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}  >
                        {this.props.user.credit_details_data.crew.map((value, i) =>
                            <TouchableOpacity key={i} style={{}}  >
                                <Credits
                                    parentData={value} />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({})



const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { getCreditDetails })(withTheme(Cast))
