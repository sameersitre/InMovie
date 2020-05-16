import React, { Component } from 'react'
import axios from 'axios'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Caption, Card, withTheme } from 'react-native-paper';
class CastCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personDetails: null
        }
    }



    componentDidMount() {
        this.setState({ personDetails: null })
        this._getData()

    }
    _getData = async () => {
        await axios.get(`https://api.themoviedb.org/3/search/person?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US&query=${this.props.parentData.actor}&page=1&include_adult=false`)
            .then(res => {
                this.setState({ personDetails: res.data.results[0] })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <TouchableOpacity
                elevation={0}
                style={{ width: 130, margin: 5, backgroundColor: 'transparent' }} >
                <Card style={{  }}>
                    <Card.Cover
                     style={{ backgroundColor: '#000000'}}
                        source={{ uri: `https://image.tmdb.org/t/p/w500${this.state.personDetails && this.state.personDetails.profile_path}` }}
                    />
                   
                </Card>
                <Caption style={{ color: '#FFFFFF', textAlign: 'center', }}>
                    {this.props.parentData.character || this.props.parentData.job}
                </Caption>
                <Caption style={[{ textAlign: 'center' }, styles.caption]}>
                    {this.props.parentData.actor}
                </Caption>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({

    caption: {
        color: '#757575'
    },
})

export default withTheme(CastCard)

