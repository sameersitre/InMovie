/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
class WebViewScreen extends Component {
  render() {
    return (
      <WebView
        style={{marginTop: 70}}
        javaScriptEnabled={true}
        source={{uri: this.props.route.params.URL}}
      />
    );
  }
}
export default WebViewScreen;
