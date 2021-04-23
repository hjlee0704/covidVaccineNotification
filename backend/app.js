
const { default: axios } = require('axios')
const express = require('express')
const app = express()
const port = 3000

//const vaccineAvailable = ()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/find', (req, res) => {
  //let availableLocation = [];
  axios.get('https://www.vaccinespotter.org/api/v0/states/WA.json')
    .then(data => {
      let location = data.data.features;
      //console.log(location[1].properties.appointments_available);
      let availableLocation = location.filter(el => { 
        let place = el.properties;
        // console.log(typeof(place.city))
        // if (typeof(place.city) === String ) {
        //   place.city = place.city.toLowerCase();
        // } else if (typeof(place.city) === Object) {
        //   console.log(place.city)
        // }
        return (place.appointments_available === true &&
           (place.city === 'Bellevue' || place.city === 'Seattle' || place.city === 'SEATTLE' || place.city === 'lynnwood' || place.city === 'Bothell' || place.city === 'BOTHELL'))
      });
      console.log(availableLocation)
      res.send(availableLocation);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})