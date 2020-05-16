
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View } from 'react-native';
export class WebViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imdb: this.props.route.params.imdbId
        }
    }
    componentDidMount() {
        console.log("checkURL: ", this.props.route.params.URL)
    }
    render() {
        return (
            <WebView
                javaScriptEnabled={true}
                style={{ flex: 1, marginTop: 90 }}
                source={{ uri: this.props.route.params.URL }} />

        )
    }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen)