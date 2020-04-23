import React from 'react';

const API_KEY = "5354b50c1d9aa695a926bb4fc5de683b";

//Remaking a new file because i deleted some files on here by accident
getWeather = async (e) => {
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
const data = await api_call.json();
if (city && country) {
  this.setState({

  });

function App() {
  return(
    <div className = "app">
      <main>
        <div className = "search-box">
          <input type="text" id="search"className="search-bar"placeholder="Enter Zip Code..."></input>
        </div>
        <div className = "location-box">
          <div className = "location">Test Location, Location</div>
          <div className = "date">Test Date, Date</div>
        </div>
      </main>
    </div>
  )
   
}
export default App;
​

