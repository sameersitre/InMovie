import React, { Component } from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Reactotron from 'reactotron-react-native'
import LottieView from 'lottie-react-native';
// import JSONAnimation from '../../assets/animations/PinJump.json'
// import JSONAnimation from '../../assets/animations/9squares-AlBoardman.json'
// import JSONAnimation from '../../assets/animations/3961-motion.json'
import JSONAnimation from '../../assets/animations/lf30_editor_HjKfh2.json'

// import JSONAnimation from '../../assets/animations/6476-liquid-loading-amin-edalatipour.json'

// import JSONAnimation from '../../assets/animations/4781-search-box.json'
// import JSONAnimation from '../../assets/animations/7547-loading.json'
// import JSONAnimation from '../../assets/animations/7556-loader-blu.json'

class ModalDisplay extends Component {
    state = {
        genreStrings: [],
        visible: true,
    }

    render() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }} >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* ****************************** */}
                            <View>
                                <LottieView
                                    // ref={this.setAnim}
                                    autoPlay={true}
                                    style={{ width: 300 }}
                                    source={JSONAnimation}
                                    loop={true}
                                    enableMergePathsAndroidForKitKatAndAbove
                                />
                            </View>
                            {/* ****************************** */}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 25,
        backgroundColor: "rgba(0,0,0,0.7)",
        // backgroundColor: "grey",
        top: "10%",
        borderRadius: 10,
        padding: 10,
        // alignItems: "center",
    },
});

export default ModalDisplay;