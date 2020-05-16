import React, { Component } from 'react';
import { Card, withTheme } from 'react-native-paper';
import { TouchableOpacity, Alert } from 'react-native'
import ModalDisplay from '../commonComponents/ModalDisplay'
class CardView extends Component {
    state = {
        modalStatus: false,
    }
    render() {
        return (
            <TouchableOpacity
                style={{ width: "31.7%", margin: '0.8%', backgroundColor: 'transparent' }}
                onPress={() => this.props.currentRoute !== 'Details' && this.props.navigator.navigate("Details", this.props.parentData)}
                onLongPress={() => this.props.currentRoute !== 'Details' && this.setState({ modalStatus: true })}
            >
                <Card
                 style={{  backgroundColor: 'transparent' }}
                    elevation={2} >
                    {this.props.parentData &&
                        <Card.Cover
                            source={{ uri: `https://image.tmdb.org/t/p/w500${this.props.parentData.poster_path}` }}
                        />}
                </Card>
                <ModalDisplay
                    hideModal={() => this.setState({ modalStatus: false })}
                    modalStatus={this.state.modalStatus}
                    parentData={this.props.parentData}
                    navigator={this.props.navigator}
                />
            </TouchableOpacity>
        )
    }
}

export default withTheme(CardView);