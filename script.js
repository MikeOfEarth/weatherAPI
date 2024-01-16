console.log('APIkey')
APIkey='a0e1ef37a4d623d8998d1d965ffafe27'

const zipForm = document.getElementById('zip-form')
zipForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  let zipcode=getZipcode()
  const locationData = await getLocation(zipcode)
  setHead(locationData)
  const weatherData = await grabWeather(locationData)
  console.log(weatherData)
  const weather=setStations(weatherData)
  displayBuild(weather)
})

function getZipcode(){
  const zipPull = document.getElementById('zipcode-field')
  return zipPull.value
}

async function getLocation(zipcode){
  const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${APIkey}`)
  if (res.ok){
    return await res.json()
  }  
}

function setHead(locationData){
  const cityHeader = document.getElementById('city-name')
  const cityHold = document.getElementById('city-header')
  const locationAdd = document.createElement('h3')
  locationAdd.innerText=`${locationData.zip}, ${locationData.name}`
  cityHold.remove()
  cityHeader.append(locationAdd)
  locationAdd.setAttribute('id','city-header')
}

async function grabWeather(data){
  let lat=data.lat
  let lon=data.lon
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
  if (res.ok){
    return await res.json()
  }
}

function setStations(data){
  let weather={}

  weather.condition=data.weather[0]['main']
  weather.temp=Math.round(data.main.temp)
  weather.high=Math.round(data.main.temp_max)
  weather.low=Math.round(data.main.temp_min)
  weather.feels=Math.round(data.main.feels_like)
  weather.humidity=`${data.main.humidity}%`
  weather.sunrise=epochConvert(data.sys.sunrise)
  weather.sunset=epochConvert(data.sys.sunset)
  
  return weather
}

function epochConvert(epoch){
  let time = new Date(epoch*1000)
  let splitTime=time.toString().split(' ').slice(4,6)
  return splitTime 
}

function displayBuild({condition,temp,high,low,feels,humidity,sunrise,sunset}){
  const displays=document.querySelectorAll(".displays")
  console.log(displays)
  for (section of displays){
    section.remove()
  }
  let tempDisplay=document.getElementById('temps')
  tempDisplay.innerHTML += 
  `<h1 class="displays" id="temp-header">Current Temps </h1>
  <div class="displays" id="temps-block">
      <div class="displays" id="actual-block"> 
          <h2 class="displays" class="temp-grid" id="actual-header">Actual</h2>
          <h2 class="displays" class="temp-grid" id="actual-temp">${temp}&#176; F</h2>
      </div>
      <div class="displays" id="feels-block"> 
          <h2 class="displays" class="temp-grid" id="feels-header">Feels-like</h2>
          <h2 class="displays" class="temp-grid" id="feels-temp">${feels}&#176; F</h2>
      </div>
  </div>
  <hr class="displays">
  <div class="displays" id="range-block">
      <div class="displays" id="high-block"> 
          <h2 class="displays" class="temp-grid" id="high-header">High</h2>
          <h2 class="displays" class="temp-grid" id="high-temp">${high}&#176; F</h2>
      </div>
      <div class="displays" id="low-block"> 
          <h2 class="displays" class="temp-grid" id="low-header">Low</h2>
          <h2 class="displays" class="temp-grid" id="low-temp">${low}&#176; F</h2>
      </div>
  </div>`
  let sunDisplay=document.getElementById('conditions')
  sunDisplay.innerHTML +=`<h1 class="displays" id="condition-header">Current Conditions </h1>
  <div class="displays" id="condition-block"> 
      <div class="displays" id="weather">
          <h2 class="displays" id="cond-header">Weather</h2>
          <h2 class="displays" id="cond">${condition}</h2>
      </div>
      <div class="displays" id="humid"> 
          <h2 class="displays" id="humitdity-header">Humidity</h2>
          <h2 class="displays" id="humidity">${humidity}</h2>
      </div>
  </div>
  <hr class="displays">
  <div class="displays" id="sun-block">
      <div class="sun" id="rise"> 
          <h2 class="displays" id="rise-header">Sunrise</h2>
          <h2 class="displays" id="rise-time">${sunrise[0]}</h2>
          <h3 class="displays" id="rise-time">${sunrise[1]}</h3>
      </div>
      <div class="sun" id="set"> 
          <h2 class="displays" id="set-header">Sunset</h2>
          <h2 class="displays" id="set-time">${sunset[0]}</h2>
          <h3 class="displays" id="set-time">${sunset[1]}</h3>
      </div>
  </div>`
}

// findWeather=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

// zipcode=`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${APIkey}`

'http://api.openweathermap.org/geo/1.0/zip?zip=12198,1&appid=${APIkey}'

