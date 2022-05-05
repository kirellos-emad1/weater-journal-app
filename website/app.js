/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1 + '.' + d.getDate() + '.' + d.getFullYear();
// Personal API Key for OpenWeatherMap API
const apiKey = ",&appid=8ecf8e9444dd49262191f429e1a13bb9&units=metric";
//baseURL for the API 
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
// local server 
const server = "http://127.0.0.1:4000";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);
// Event listener to add function to existing HTML DOM element
function performAction() {
    const newZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeather(baseURL, newZip, apiKey)
        .then(function (data) {
            console.log(data)
            postData(server + '/add', {
                date: newDate,
                temp: data.main.temp,
                content: feelings
            })
            updatingUI()
        })
}
//Function to GET Web API Data
const getWeather = async (baseURL, zip, key) => {
    try {
        const res = await fetch(baseURL + zip + key);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// Function to POST data
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(`You just saved`, newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};

//Function to GET Project Data
// and updating UI by this data
const updatingUI = async () => {
    const res = await fetch(server + "/all");
    try {
        const allData = await res.json();
        console.log(allData)
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("temp").innerHTML = Math.floor(allData.temp) + '&degC';
        document.getElementById("content").innerHTML = allData.content;
    } catch (error) {
        console.log(error);
    }
};