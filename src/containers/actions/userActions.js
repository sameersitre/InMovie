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
  MOVIE_DATA, USER_INFO, USER_REGION
} from './types';
import { filterURL } from '../../services/apiURL';
import apiCall from '../../services/apiCall';

export const setThemeAction = data => dispatch => {
  dispatch({ type: SWITCH_THEME, payload: data });
};

export const setColorAction = data => dispatch => {
  dispatch({ type: PRIMARY_COLOR, payload: data });
};

export const switchAdultAction = data => dispatch => {
  dispatch({ type: SWITCH_ADULT, payload: data });
};

export const setUserInfo = data => dispatch => {
  dispatch({ type: USER_INFO, payload: data });
};

export const setUserRegion = data => dispatch => {
  dispatch({ type: USER_REGION, payload: data });
};

export const filterMovieData = data => async dispatch => {
  let genreArray = [];
  for (let i = 0; i < data.length; i++) {
    genreArray.push(data[i].id);
  }
  let genreString = genreArray.join('%2C');
  let params = { genres: genreString };

  let resData = await apiCall(filterURL, params)
  dispatch({
    type: MOVIE_DATA,
    payload: resData.results,
  });
};
