/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import {
  SWITCH_THEME,
  SWITCH_ADULT,
  MOVIE_DATA,
  PRIMARY_COLOR,
} from '../actions/types';
import genres from '../../utils/Genres';

const initialState = {
  genres,
  switch_theme: true,
  switch_adult: false,
  primary_color: 1,
  color_palete: [
    {id: 1, color: '#E33F05'},
    {id: 2, color: '#6200EE'},
    {id: 3, color: '#3479F6'},
    {id: 4, color: '#78B857'},
    {id: 5, color: '#FF0266'},
  ],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SWITCH_THEME:
      return {
        ...state,
        switch_theme: action.payload,
      };
    case PRIMARY_COLOR:
      return {
        ...state,
        primary_color: action.payload,
      };
    case SWITCH_ADULT:
      return {
        ...state,
        switch_adult: action.payload,
      };
    case MOVIE_DATA:
      return {
        ...state,
        movie_data: action.payload,
      };

    default:
      return state;
  }
}
