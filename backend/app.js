
const { default: axios } = require('axios');
const express = require('express');
const notifier = require('node-notifier');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/find', (req, res) => {
  axios.get('https://www.vaccinespotter.org/api/v0/states/WA.json')
    .then(data => {
      let location = data.data.features;
      let availableLocation = location.filter(el => { 
        let place = el.properties;
        console.log(typeof(place.city))
        if (typeof(place.city) === String ) {
          place.city = place.city.toLowerCase();
        } else if (typeof(place.city) === Object) {
          place.city = place.city[place.city];
        }
        return (place.appointments_available === true &&
           (place.city === 'Bellevue' || place.city === 'Seattle' || place.city === 'SEATTLE' || place.city === 'lynnwood' || place.city === 'Bothell' || place.city === 'BOTHELL'))
      });
      console.log(availableLocation)
      res.send(availableLocation);
      notifier.notify('Message');
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})