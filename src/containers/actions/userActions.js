/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import {
  SET_THEME,SWITCH_ADULT, MOVIE_DATA, UPCOMING_MOVIE_DATA, DETAILS_DATA, BUFFER_ENABLE, SEARCH_TEXT_AVAILABLE,
  CREDIT_DETAILS_DATA, SEARCH_RESULTS
} from './types';
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../utils/Config';
import Reactotron from 'reactotron-react-native'

export const refreshDashboard = data => (dispatch) => {
  dispatch({
    type: SEARCH_TEXT_AVAILABLE,
    payload: data
  })
};

export const bufferEnableAction = data => (dispatch) => {
  dispatch({
    type: BUFFER_ENABLE,
    payload: data
  })
};
export const setThemeAction = data => (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: data
  })
};

export const switchAdultAction = data => (dispatch) => {
  dispatch({
    type: SWITCH_ADULT,
    payload: data
  })
};

export const trendingList = (data, prevData) => async (dispatch) => {
  dispatch({
    type: MOVIE_DATA,
    payload: prevData ? prevData.concat(data) : data
  })
};

export const searchResultData = data => async (dispatch) => {
      dispatch({
        type: SEARCH_RESULTS,
        payload: data
      });
};

export const upcomingMoviesData = (data, prevData) => async (dispatch) => {
  dispatch({
    type: UPCOMING_MOVIE_DATA,
    payload: prevData ? prevData.concat(data) : data
  });
};

export const testData = data => async (dispatch) => {
  console.log(data)
  await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a2d451cdbcf87912820b3b17b82514c3&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=true&page=6&primary_release_date.gte=2020-04-01`)
    .then(res => {
      dispatch({
        type: MOVIE_DATA,
        payload: res.data.results
      });
    })
    .catch(function (error) {
      console.log(error);
    })
};

export const filterMovieData = data => async (dispatch) => {
  let genreArray = [];
  for (let i = 0; i < data.length; i++) {
    genreArray.push(data[i].id)
  }
  let genreString = genreArray.join("%2C");
  let params = { genres: genreString }
  await axios.post(`${main_url}/filter`, params)
    .then(res => {
      dispatch({
        type: MOVIE_DATA,
        payload: res.data.results
      });
    })
    .catch(function (error) {
      console.log(error);
    })
};

export const getDetails = data => async (dispatch) => {
  dispatch({
    type: DETAILS_DATA,
    payload: []
  });
  dispatch({
    type: DETAILS_DATA,
    payload: data
  });
};

export const getCreditDetails = data => async (dispatch) => {
  dispatch({
    type: CREDIT_DETAILS_DATA,
    payload: []
  })
  dispatch({
    type: CREDIT_DETAILS_DATA,
    payload: data
  })

};