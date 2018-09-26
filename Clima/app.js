const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


let getInfo= async(direccion) =>{

    try {
        let coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);
        return `El clima en ${coors.direccion} es de ${temp} grados`;

    } catch (error) {
        return `No se puedo determinar el clima en ${direccion}`;
    }

}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err));





// Codigos para here maps
//const CODE = '1lf0nAhnzFTHwADz7gXAJg';
//const ID_APP ='jvFRpDr8Xc2TCeGSkcJ7';

/**
axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${ID_APP}&app_code=${CODE}&searchtext=${econdedUrl}`)
    .then( resp =>{
            let location =resp.data.results[0];
            console.log('Dreccion:',location.address);
            console.log('lat:');
            console.log('lng:');

        //console.log(JSON.stringify(resp.data,undefined,2));
        //console.log(resp.status);
    })
    .catch(e => console.log('ERROR!!!',e))
    **/

