const express = require("express");
// const cors = require("cors");
const geocode = require("./geocode");
const weather_detail = require("./weather_detail");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('../Public'))
app.use(express.json());
// app.use(cors());

app.get("/weather/geocode", (req,res) => {

    const address = req.query.address;

    // console.log(address)

    geocode.getCoordinates(address).then((locationDetail) => {
        
        // console.log(locationDetail)
        
        return res.status(200).send(locationDetail);

    }).catch((e) => {

        // console.log(e);
        
        return res.status(500).send(e);

    })

})

app.get("/weather/detail", (req,res) => {

    const lat = req.query.lat;
    const long = req.query.long;

    // console.log(lat,long)

    weather_detail.getWeather(lat,long).then( (weatherDetail) => {
        
        // console.log(weatherDetail)

        return res.status(200).send(weatherDetail);

    }).catch((e) => {
        
        return res.status(500).send(e);

    })

})

app.listen(PORT, () => {
    console.log("Server running on the port", PORT);
})