/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import {
  SWITCH_THEME,
  SWITCH_ADULT,
  PRIMARY_COLOR,
  MOVIE_DATA,
} from './types';
import axios from 'axios';
import {main_url} from '../../utils/Config';

export const setThemeAction = data => dispatch => {
  dispatch({type: SWITCH_THEME, payload: data});
};

export const setColorAction = data => dispatch => {
  dispatch({type: PRIMARY_COLOR, payload: data});
};

export const switchAdultAction = data => dispatch => {
  dispatch({type: SWITCH_ADULT, payload: data});
};

export const filterMovieData = data => async dispatch => {
  let genreArray = [];
  for (let i = 0; i < data.length; i++) {
    genreArray.push(data[i].id);
  }
  let genreString = genreArray.join('%2C');
  let params = {genres: genreString};
  await axios
    .post(`${main_url}/filter`, params)
    .then(res => {
      dispatch({
        type: MOVIE_DATA,
        payload: res.data.results,
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};
