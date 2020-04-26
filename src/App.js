import React, { Component } from "react";
import "./App.css";
import Moment from "moment";
import "moment-timezone";
//import tz from "zipcode-to-timezone";
import { Jumbotron } from "reactstrap";

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
            temp: Math.floor(data.main.temp) + '° ',
            city: data.name,
            timezone: data.timezone,
            description: data.weather[0].description,
            weatherPic: data.weather[0].main,
            iconURL:
              "http://openweathermap.org/img/w/" +
              data.weather[0].icon +
              ".png",
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

  //enter key function
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.getWeather();
    }
  };

  render() {
    return (
      <>
        <div className="container col-sm-12 cold-md-12 col-xs-12">
            <h1>What is your weather looking like?</h1>

          <div className="container2 col-sm-12 cold-md-12 col-xs-12">
            <input
              type="text"
              onKeyPress={this.handleKeyPress}
              placeholder="Enter Zip Code here..."
              id="inputZip"
            ></input>
            <button onClick={this.getWeather}>Search</button>
            <p id="time">{this.state.time}</p>
            <p id="city">{this.state.city}</p>
            <p id="temp">{this.state.temp}</p>
            <img className="weatherIcon" src={this.state.iconURL} alt=""></img>
            <p id="desc">{this.state.description}</p>
          </div>
        </div>
      </>
    );
  }
}

export default App;
