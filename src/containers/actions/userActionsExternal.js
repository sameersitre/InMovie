import {
    MOVIE_DATA, DETAILS_DATA, BUFFER_ENABLE, SEARCH_TEXT_AVAILABLE
} from './types';
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../utils/Config';

export const getDetails = data => async (dispatch) => {
    console.log('REQUEST BODY: ????????????????????????????????\n', data)
    let params = data
    let movieDetails = null;
    let videos = null;
    let streamAvailablity = null;
    let combinedData = null;
    let mediaTypeSelected = null

    // json field 'media_type' is unavailable in filtered response json
    if (params.media_type) {
        mediaTypeSelected = params.media_type
    }
    else if (params.title) {
        mediaTypeSelected = 'movie'
    }
    else if (params.name) {
        mediaTypeSelected = 'tv'
    }

    //GET MOVIE DETAILS
    await axios.get(`${main_url}/${mediaTypeSelected}/${params.id}?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(res => {
            movieDetails = res.data
        })
        .catch(function (error) {
            console.log(error);
        })

    // GET LIST OF VIDEOS
    await axios.get(`${main_url}/${mediaTypeSelected}/${params.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
        .then(res => {
            videos = res.data

        })
        .catch(function (error) {
            console.log(error);
        })

    // GET AVAILABLE STREAMING SERVICES
    /* https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=338762&source=tmdb */
    await axios({
        "method": "GET",
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": RAPID_API_KEY
        }, "params": {
            "source_id": params.id,
            "source": "tmdb"
        }
    })
        .then(res => {
            streamAvailablity = res.data.collection.locations
        })
        .catch((error) => {
            console.log(error)
        })

    combinedData = [movieDetails, videos, streamAvailablity]
    response.send(combinedData)
}
