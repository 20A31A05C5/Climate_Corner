const inputCity=document.getElementById("inputCity");
const form =document.querySelector(".weatherform");
const apiKey="4697b3b8f7f7059c323ea32b20fa46fd";
const card=document.querySelector(".card");
form.addEventListener("submit",async  (event)=>{
         event.preventDefault();
         const city=inputCity.value;
         console.log(city);
         if(city){
            try{
                const weatherData=await getweatherData(city);
                displayWeatherData(weatherData);
            }
            catch(error){
                console.error(error);
                displayError(error);
            }
         }
         else{
            displayError("Plase Enter a City");
         }
});
async function getweatherData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiURL);
    if(!response.ok){
        throw new Error("Could not find City");
    }
    return await response.json()
}
async function displayWeatherData(data){
    const {name: city, 
          main: {temp, humidity}, 
          weather: [{description, id}]} = data;
    console.log(description);

    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1")
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const emojiDisplay=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273).toFixed(1)}°C­`;
    humidityDisplay.textContent=`Humidity : ${humidity}%`;
    descDisplay.textContent=description;
    emojiDisplay.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}
function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}
function displayError(name){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=name;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}
