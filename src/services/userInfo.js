import axios from "axios"
import { Platform } from "react-native"
const userInfo = async function () {
    let abc = {}
    await axios.get(`https://www.cloudflare.com/cdn-cgi/trace`)
        .then(async (res) => {
            let ip = res.data.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)[0]
            let region = res.data.match(/loc=(.*?)\n/s)
            let colo = res.data.match(/colo=(.*?)\n/s)

            abc = {
                ...abc,
                ip: ip,
                region: region[1],
                colocation: colo[1],
                platform: JSON.stringify(Platform)
            }
        }
        ).catch(function (error) {
            return error
        })
    return abc
}
export default userInfo