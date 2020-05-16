import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Caption, Card } from 'react-native-paper';
const Credits = (props) => {
    return (
        <View
            elevation={0}
            style={{
                // backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backgroundColor: 'transparent',
                padding: 1,
                width: 100, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }} >
            <Card style={{ width: 80, height: 80, borderRadius: 40, alignSelf: 'center' }}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${props.parentData.profile_path}` }}
                    alt="Smiley face"
                    style={{ width: 80, height: 80, borderRadius: 40, zIndex: 1, top: 0, alignSelf: 'center' }} />
            </Card>
            <Caption style={{ color: '#FFFFFF', textAlign: 'center', }}>
                {props.parentData.character || props.parentData.job}
            </Caption>
            <Caption style={[{ textAlign: 'center' }, styles.caption]}>
                {props.parentData.name}
            </Caption>
        </View>
    )
}
const styles = StyleSheet.create({

    caption: {
        color: '#757575'
    },
})

export default Credits

