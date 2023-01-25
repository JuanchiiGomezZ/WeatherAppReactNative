import { GET_CITYWEATHER, GET_CURRENTWEATHER, GET_FIVEDAYSWEATHER } from "../types";

export default function (state, action) {
    const {payload, type} = action
    switch(type){
        case GET_CURRENTWEATHER:
            return{
                ...state,
                currentWeather: payload
            }
            case GET_FIVEDAYSWEATHER:
            return{
                ...state,
                fiveDaysWeather: payload
            }
            case GET_CITYWEATHER:
            return{
                ...state,
                cityWeather: payload
            }
    }
}
