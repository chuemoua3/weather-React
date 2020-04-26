import React, { Component } from "react";
import "./App.css";
import Moment from "moment";
import "moment-timezone";
//import tz from "zipcode-to-timezone";

class App extends Component {
  state = {};

  //function to get Weather data
  getWeather = () => {
    let inputZip = document.getElementById("inputZip").value;
    //console.log(typeof inputZip);
    //fetch function
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        inputZip +
        ",us&appid=" +
        process.env.REACT_APP_OW_API_KEY +
        "&units=imperial"
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "NOT A VALID ZIPCODE! TRY AGAIN. Status Code: " + response.status
          );
          return;
        }
        //callback function for the data
        // Examine the text in the response
        response.json().then((data) => {
          //console.log(data);
          this.setState({
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            city: data.name,
            timezone: data.timezone,
            description: data.weather[0].description,
          });
          console.log(this.state);
        });
      })
      .catch(function (err) {
        console.log("NOT A VALID ZIPCODE!", err);
      });

    this.getTime();
  };
  //Timezone converting to Current time function
  getTime = () => {
    setInterval(() => {
      let current = Moment()
        .utcOffset(this.state.timezone / 60)
        .format("MMMM Do YYYY, h:mm a");
      this.setState({
        time: current,
      });
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <h3>What is your weather looking like?</h3>
          <div className="container2">
            <input
              type="text"
              placeholder="Enter Zip Code here..."
              id="inputZip"
            ></input>
            <button onClick={this.getWeather}>Search</button>
            <p>{this.state.time}</p>
            <p>{this.state.city}</p>
            <p>{this.state.temp}</p>
            <p>{this.state.description}</p>
          </div>
        </div>
      </>
    );
  }
}

export default App;
