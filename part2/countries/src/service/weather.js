import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const imageBaseUrl = 'https://openweathermap.org/img/wn'

const getWeather = (lat, long) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const url = `${baseUrl}?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily&appid=${apiKey}`

  const req = axios.get(url)
  return req.then(({ data }) => {
    data['iconUrl'] = `${imageBaseUrl}/${data.weather[0].icon}@2x.png`
    return data
  })
}

export default { getWeather }
