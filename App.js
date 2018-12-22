import React, { Component } from 'react';
import InputBox from './Components/InputBox';
import OutputBox from './Components/OutputBox';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
      locationName: 'los angeles, usa',
      temp: '23C',
      summary: 'Clear',
      icon: 'clear-day'
    }
  sendReq = () => {
      let locationName = encodeURI(document.querySelector('input').value);
      let lat, lon;
      this.setState({locationName: '', temp: '', summary: '', icon: ''});
      axios.get('https://eu1.locationiq.com/v1/search.php?key=52237762255b7b&q='+locationName+'&format=json')
        .then(res => {
          lat = res.data[0].lat;
          lon = res.data[0].lon;
          this.setState({locationName:res.data[0].display_name});
          axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c4729d63a195e0e9e0b2f5e804e626f6/'+lat+','+lon)
            .then(res => {
              let temp = res.data.currently.apparentTemperature;
              temp = Math.floor((temp - 32) * 5/9);
              this.setState({temp:temp + '°C'})
              this.setState({summary:res.data.currently.summary});
              this.setState({icon:res.data.currently.icon});
              console.log(res.data.currently.icon);
              switch(this.state.icon) {
                case 'clear-day':
                  document.querySelector('#icon').className = "wi wi-day-sunny";
                  break;
                case 'clear-night':
                  document.querySelector('#icon').className = "wi wi-night-clear";
                  break;
                case 'rain':
                  document.querySelector('#icon').className = "wi wi-rain";
                  break;
                case 'snow':
                  document.querySelector('#icon').className = "wi wi-snow";
                  break;
                case 'sleet':
                  document.querySelector('#icon').className = "wi wi-sleet";
                  break;
                case 'wind':
                  document.querySelector('#icon').className = "wi wi-windy";
                  break;
                case 'fog':
                  document.querySelector('#icon').className = "wi wi-fog";
                  break;
                case 'cloudy':
                  document.querySelector('#icon').className = "wi wi-cloudy";
                  break;
                case 'partly-cloudy-day':
                  document.querySelector('#icon').className = "wi wi-day-cloudy";
                  break;
                case 'partly-cloudy-night':
                  document.querySelector('#icon').className = "wi wi-night-alt-cloudy";
                  break;
                case 'hail':
                  document.querySelector('#icon').className = "wi wi-hail";
                  break;
                case 'thunderstorm':
                  document.querySelector('#icon').className = "wi wi-thunderstorm";
                  break;
                default :
                  document.querySelector('#icon').className = "empty";
                  break;
              }
            })
        });
  }
  render() {
    return (
      <div className="App">
        <table align="center">
          <td>
            <InputBox sendReq={this.sendReq}/>
          </td>
          <td>
            <OutputBox locationName={this.state.locationName} temp={this.state.temp} summary={this.state.summary} icon={this.state.icon} />
          </td>
        </table>
      </div>
    );
  }
}

export default App;
