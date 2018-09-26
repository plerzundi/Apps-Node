const axios = require('axios');


const getClima = async(lat,lng) =>{

    let KEY = 'API_KEY';
    let medida = 'metric'

    let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${medida}&appid=${KEY}`);
    return resp.data.main.temp;
}


module.exports ={
    getClima
}