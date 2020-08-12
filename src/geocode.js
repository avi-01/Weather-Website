const axios = require("axios");

const token = process.env.MapBoxApiToken;

const getCoordinates = (address) => {

    // console.log(token)

    return new Promise((resolve, reject) => {
        
        var mapUrl = encodeURI("https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?limit=1&access_token="+token);
    

        axios.get(mapUrl).then( (response) => {
            
            var res = response.data;
            
            if (res.features.length === 0) {
                return reject('Unable to find location. Try another search.');
            }
            else {
                
                var locationDetail = {
                    latitude: res.features[0].center[1],
                    longitude: res.features[0].center[0],
                    location: res.features[0].place_name
                }
    
                // console.log(locationDetail)
                
                return resolve(locationDetail);
            }
        }).catch ((e) => {
            console.log("E" + e)
            return reject("Error Occurred");
        }) ;
    })

}


module.exports = { getCoordinates }