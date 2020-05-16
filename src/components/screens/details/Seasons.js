import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { Caption, Card, Button, withTheme } from 'react-native-paper';
import { getDetails } from '../../../containers/actions/userActions';
import SeasonEpisodesModal from './SeasonEpisodesModal'
class Seasons extends Component {
    state = {
        modalStatus: false,
        selectedSeason: null,
    }

    submit = (value) => {
        this.setState({ modalStatus: true, selectedSeason: value })
        console.log("object")

    }
    render() {
        return (
            <View style={{ flex: 1, padding: 5 }} >
                {this.state.modalStatus ?
                    <SeasonEpisodesModal
                        hideModal={() => this.setState({ modalStatus: false })}
                        modalStatus={this.state.modalStatus}
                        parentData={this.props.parentData}
                        selectedSeason={this.state.selectedSeason}
                    />
                    : null}
                <Caption style={styles.caption}>Seasons:</Caption>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        // flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}  >
                    {this.props.parentData && this.props.parentData.map((value, i) =>
                        <TouchableOpacity
                            key={i}
                            style={{ width: 120, marginRight: 10, backgroundColor: 'transparent' }}
                            onPress={() => this.submit(value)}
                        >

                            <Card
                                elevation={5} >
                                <Card.Cover
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${value.poster_path}` }} />
                            </Card>
                            <Caption style={styles.caption}>{value.name}</Caption>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    caption: {
        color: '#757575'
    },
})

const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps, { getDetails })(withTheme(Seasons))
