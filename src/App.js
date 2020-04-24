import React, { Component } from "react";
import "./App.css";
import Moment, { parseZone } from "moment";
import "moment-timezone";

class App extends Component {
  state = {
  
  };

  getWeather = () => {
    const inputZip = document.getElementById("inputZip").value;
    console.log(typeof inputZip);

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" + inputZip + ",us&appid=" +
        process.env.REACT_APP_OW_API_KEY + "&units=imperial"
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          console.log(data);
          this.setState({
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            city: data.name,
            timezone: data.timezone,
          
          })
          console.log(this.state);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

      // this.getTime();
  }
  
  // getTime = () =>{
  //   var moment = Moment();
  //   var tz = this.state.timezone;
  //   var currentTime = moment.tz(tz).format('dddd, MMMM Do YYYY, h:mm:ss a');
  //   this.setState({
  //     time:currentTime,
  //   });
    // var current = Moment().utcOffset(tz).format('MMMM Do YYYY, h:mm:ss a');
    // //current = current.utcOffset(tz);
    // console.log(current)
    // this.setState({
    //   time: current,
    // })
  //}

  // handleClick(){
  //   let zipInput = document.getElementById("zipInput").value;
  //   this.setState({zip: zipInput});
  //   console.log(this.state.zip)
  //   //this.getWeather();
  // }

  render() {
    return (
      <>
      <div>
        <input type = "text" placeholder="Enter Zip Code..." id="inputZip"></input>
        <button onClick={this.getWeather}>Search</button>
      </div>
      <div>
        <h5 id="temp">{this.state.temp}</h5>
        <h5 id="city">{this.state.city}</h5>
        <h5>{this.state.time}</h5>
      </div>
      </>
    ); 
  }
}

export default App;





