import React, { Component } from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Reactotron from 'reactotron-react-native'
import LottieView from 'lottie-react-native';

const LottieAnim = (props) => {
    return (
        <View style={{ }}>
            <LottieView
            autoPlay={true}
            style={styles.lottie}
            source={props.JSONAnimation}
            loop={true}
            enableMergePathsAndroidForKitKatAndAbove
        />
        </View>
        
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 150
    }
})


export default LottieAnim

