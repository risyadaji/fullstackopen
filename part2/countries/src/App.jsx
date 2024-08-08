import { useEffect, useState } from 'react'

import countriesService from './service/countries'
import weatherService from './service/weather'

import Countries from './components/Countries'

function App() {
  const [findCountry, setFindCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  const onShowCountry = (name) => {
    countriesService.getByName(name).then((c) => {
      setCountries([].concat(c))
      setFindCountry(name)
    })
  }

  useEffect(() => {
    if (findCountry !== '') {
      countriesService.getAll().then((countries) => {
        const filteredCountries = countries.filter((item) =>
          item.name.common.toLowerCase().includes(findCountry.toLowerCase())
        )

        console.log(filteredCountries)
        setCountries(filteredCountries)
      })
    }
  }, [findCountry])

  useEffect(() => {
    if (countries.length === 1) {
      const { latlng } = countries[0]

      weatherService.getWeather(latlng[0], latlng[1]).then((weather) => {
        console.log(weather)
        setWeather(weather)
      })
    }
  }, [countries])

  return (
    <>
      <div>
        find countries{' '}
        <input
          value={findCountry}
          onChange={(e) => setFindCountry(e.target.value)}
        />
      </div>
      <Countries
        countries={countries}
        weather={weather}
        onShow={onShowCountry}
      />
    </>
  )
}

export default App
