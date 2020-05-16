import React from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Animated, TouchableOpacity, Linking, Image } from 'react-native'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    ActivityIndicator, Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { connect } from 'react-redux'

import Reactotron from 'reactotron-react-native'

const Overview = (props) => {
    return (

        <View style={{ padding: 5, marginTop: 5, }} >
             <Caption style={{ color: '#FFFFFF', padding: 5 }} >
                {props.user.details_data.detailsData.overview}
            </Caption>
        </View>
    )
}


//export default Overview

const styles = StyleSheet.create({})
 


const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Overview)
