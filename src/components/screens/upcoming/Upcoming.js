/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { Component } from 'react'; 
import { upcomingURL } from '../../../services/apiURL' 
import MediaList from '../../common/MediaList'
class Upcoming extends Component {

  render() {
    return (
      <MediaList
        media_type="movie"
        adult={false}
        region="IN"
        apiURL={upcomingURL}
        routeTo={null}
        navigator={this.props.navigation}
      />
    );
  }
}

export default Upcoming;
