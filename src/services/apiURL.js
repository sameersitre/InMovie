
import { API_URL, API_URL_DEV } from '../utils/Config'

let URL = API_URL
// if (!__DEV__) {
//     URL = API_URL_DEV
// } else {
//     URL = API_URL
// }
// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", __DEV__)

export const testURL = `${URL}/test`
export const trendingURL = `${URL}/trending`
export const searchURL = `${URL}/search`
export const filterURL = `${URL}/filter`
export const upcomingURL = `${URL}/upcoming`
export const getDetailsURL = `${URL}/getDetails`
export const getVideosURL = `${URL}/getVideos`
export const getRecommendationsURL = `${URL}/getRecommendations`
export const getOTTPlatformsURL = `${URL}/getOTTPlatforms`
export const getCastDetailsURL = `${URL}/getCastDetails`
export const getSeasonsURL = `${URL}/getSeasons`
export const getInfo = `${URL}/info`
export const getFeedback = `${URL}/feedback`

