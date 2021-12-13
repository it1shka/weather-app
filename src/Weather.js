import React from 'react'

export default class Weather extends React.Component {
  render() {
    const data = this.props.data

    const city = data.name
    const country = data.sys.country

    const temp = data.main.temp 
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')
    const desc = data.weather[0].main
    const humidity = data.main.humidity

    return (
      <div>
        <h1 className='title-header'>Weather</h1>
        <h3 className='subtitle-header'>City: {data.name}, Country: {data.sys?.country}</h3>
        <div className='card'>
          <ul>
            <li>
              <p>Temperature: </p>
              <p className='right'>{temp} &deg;C</p>
            </li>
            <li>
              <p>Sunrise: </p>
              <p className='right'>{sunrise}</p>
            </li>
            <li>
              <p>Sunset: </p>
              <p className='right'>{sunset}</p>
            </li>
            <li>
              <p>Description: </p>
              <p className='right'>{desc}</p>
            </li>
            <li>
              <p>Humidity: </p>
              <p className='right'>{humidity} %</p>
            </li>
          </ul>

          <button onClick={this.props.refresh}>Refresh</button>
        </div>
      </div>
    )
  }
}