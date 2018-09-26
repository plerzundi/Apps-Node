const axios = require('axios');


const getLugarLatLng = async(direccion) =>{

    //variables
let econdedUrl =encodeURI(direccion);
const KEY = 'API_KEY';

// Hace las consultas de las coordenadas del país
let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${econdedUrl}&key=${KEY}`)

if(resp.data.status === 'ZERO_RESULTS'){
    throw new Error(`No hay resultados para la ciudad ${direccion}`);
}

    let location = resp.data.results[0];
    let coor = location.geometry.location;

    return{
        direccion: location.formatted_address,
        lat: coor.lat,
        lng: coor.lng
    }

}

module.exports = {
    getLugarLatLng
}


