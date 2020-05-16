import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { Caption, Card, Button, withTheme } from 'react-native-paper';
import { getDetails } from '../../../containers/actions/userActions';

class Seasons extends Component {

    submit = (value) => {

        console.log("object")
      
    }
    render() {


        return (
            <View style={{ flex: 1, padding: 5 }} >

                <Caption style={styles.caption}>Seasons:</Caption>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        // flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}  >
                    { this.props.user.details_data.detailsData.seasons.map((value, i) =>
                        <TouchableOpacity
                            key={i}
                            style={{ width: 120, marginRight: 10, backgroundColor: 'transparent' }}
                            onPress={() => this.submit(value)}
                        >
                            <Card
                                elevation={5}
                                >
                                <Card.Cover style={{ backgroundColor: '#000000'}}
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
