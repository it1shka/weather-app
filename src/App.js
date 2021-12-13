import React from 'react'
import Weather from './Weather'

const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY

function makeRequest(lat, lon) {
  const REQUEST = `${API_URL}/weather/?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  return REQUEST
}


export default class App extends React.Component {
  state = { avaliable: false }

  constructor(props) {
    super(props)
    this.fetchWeatherData = this.fetchWeatherData.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  async fetchWeatherData() {
    try {
      const request = makeRequest(this.state.lat, this.state.lon)
      const apiData = await fetch(request)
      const data = await apiData.json()
      this.setState(prev => ({
        ...prev,
        avaliable: true,
        data
      }))
      console.log(data)
    } catch {
      this.setState(prev => ({
        ...prev,
        avaliable: false
      }))
    }
  }

  refresh() {
    this.setState(prev => ({
      ...prev,
      avaliable: false
    }))

    this.fetchWeatherData()
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      try {
        const {latitude, longitude} = position.coords
        this.setState(prev => ({
          ...prev,
          lat: latitude,
          lon: longitude
        }))
        this.fetchWeatherData()
      } catch {}
    })
  }

  render() {
    if(!this.state.avaliable)
      return <UnableBanner />

    return <Weather data={this.state.data} refresh={this.refresh}/>
  }
}

function UnableBanner() {
  return (
    <div>
      <h1 className='title-header'>Unable to fetch weather info</h1>
      <h3 className='subtitle-header'>Refresh the page</h3>
    </div>
  )
}