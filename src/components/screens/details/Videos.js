import React from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Animated, TouchableOpacity, Linking, Image } from 'react-native'
import {
    Title, Subheading, Paragraph, Caption, Text, withTheme, TouchableRipple, Button,
    ActivityIndicator, Colors, Chip, Dialog, Portal
} from 'react-native-paper';
import { connect } from 'react-redux'

import Reactotron from 'reactotron-react-native'

const Videos = (props) => {
    return (

        <View style={{  }} >
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                  <Caption style={styles.caption}>Trailers / Videos:</Caption>

            </View>
           
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    maxHeight: 85, flexWrap: 'wrap',
                    flexDirection: 'column',
                }}  >
                { props.user.details_data.videoData.map((value, i) =>
                    <Button
                        key={i}
                        color="#FFFFFF"
                        compact={true}
                        style={[styles.textShadow, { backgroundColor: 'rgba(0, 0, 0, 0.6)', margin: 2, alignSelf: 'baseline' }]}
                        onPress={() =>
                            Linking.openURL(`vnd.youtube://www.youtube.com/embed/${value.key}`)
                        }>
                        {`${i + 1}.${value.type}`}
                    </Button>
                )}
            </ScrollView>
        </View>
    )
}


//export default Videos

const styles = StyleSheet.create({})



const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Videos)
