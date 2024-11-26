// importing axios for the api call
import axios from 'axios'
// importing state and effect
import { useState, useEffect } from 'react'
//imports the css file, although most of my styling is coming from the tailwind css framework "daisyui"
import './App.css';


function App() {


  // react hook to add a my state variable to the component, sets the initial state to an empty array
  // that way when it loads the data upon refreshing it can fill that empty array
  const [racers, updateRacers] = useState([]);
  

  // i declare the effect here of the state which is fetch data, when that data is asynchronously retrieved from the fetch data
  // function it takes that info and fills the state array
  useEffect(() => {
    fetchData()
  }, [])

// async function to fetch the data with the api from the source file
// uses axios which is a JS library used to make http requests to apis

  const fetchData = async async => {
    const {data} = await axios.get(`https://api.openf1.org/v1/drivers?`) //link is my api

    updateRacers(data);
  }


  //declaring variables so I can use the date in which I am retrieving this data
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // my function to onClick call to in order to refresh data, button is located in the return

  const refreshPage = () => {
    window.location.reload();
  }
  

  return (
    <div data-theme="luxury" className="p-3 bg-neutral-content min-h-screen">
      <div>
        <h1 card-title 
          className='text-2xl bg-primary rounded-box text-error text-center p-3 m-2'>
            {year} Formula One Driver Lineups
        </h1>
      </div>
      <div className='text-center'>
        {/* my button to refresh the api call/date info was retrieved */}
        <button className='bg-secondary rounded-box p-2' 
          onClick={refreshPage}>
            Refresh Lineups
        </button>
      </div>
      <header>

      <div className='rounded-box p-3 m-2 bg-secondary'>
        {/* slices out a new array from the existing on provided by the api */}]
        {/* maps through that function to display based on my calls below in the h5 element tag */}
        {/* repeats line after line until it meets my requirements */}
        {
          racers.slice(0,16).map(racer => (
            <div className='bg-accent m-1 p-1 text-center rounded-box' key={racer.driver_number}>
                <h5>{racer.driver_number}- {racer.full_name} races for {racer.team_name}</h5>
            </div>
          ))
        }
      </div>
      
      <p className='text-center text-error'>All lineups up to date as of {month}/{day}/{year}</p>

      </header>
    </div>
  );
}

export default App;
