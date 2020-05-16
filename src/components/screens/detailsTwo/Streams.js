import React from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Animated, TouchableOpacity, Linking, Image } from 'react-native'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    ActivityIndicator, Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { connect } from 'react-redux'

import Reactotron from 'reactotron-react-native'

const Streams = (props) => {
    return (

        <View style={{}} >
            <Caption style={styles.caption}>Available Streams:</Caption>
            <View style={{ padding: 5, backgroundColor: 'rgba(192,192,192, 0.2)', }}>

                <ScrollView
                    //  horizontal={true}
                    contentContainerStyle={{
                        maxHeight: 50,
                        flexDirection: 'row',
                        alignItems: 'baseline',

                    }}  >
                    {props.user.details_data.detailsData.networks.map((value, i) =>
                        <TouchableOpacity key={i} style={{ margin: 10, }}
                            onPress={() =>
                                this.openWebScreen(this.state.movieData.homepage)}
                        // this.props.navigation.navigate("webview",
                        //     { routeData: this.state.movieData.homepage })}
                        >
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${value.logo_path}` }} alt=" "
                                style={{ width: 65, height: 30, resizeMode: 'contain' }} />

                            {/* <Caption style={{ fontSize: 14, color: '#FFFFFF' }}>
                                                    {value.name} {value.origin_country.toUpperCase()}
                                                </Caption> */}
                        </TouchableOpacity>

                    )}
                    {props.user.details_data.streams.map((value, i) =>
                        value.display_name !== 'AtomTicketsIVAUS' && value.country[0] === 'us' || value.country[0] === 'in'
                            ?
                            <TouchableOpacity key={i} style={{ margin: 10, }}
                                onPress={() =>
                                    this.props.navigation.navigate("webview",
                                        { routeData: value.url })}
                            >
                                <Caption style={{ fontSize: 14, color: '#FFFFFF' }}>
                                    {value.display_name} {value.country[0].toUpperCase()}
                                </Caption>
                            </TouchableOpacity>
                            : <Caption style={{ fontSize: 14, color: '#FFFFFF' }}>not available</Caption>
                    )}
                </ScrollView>

            </View>

        </View>
    )
}


//export default Overview

const styles = StyleSheet.create({})



const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Streams)
