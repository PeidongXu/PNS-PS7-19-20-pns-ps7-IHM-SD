const { Router } = require('express');
const { Favorite, Event } = require('../../models');
const  moment = require('moment');

const router = new Router();

function getFavEvents(){
  let favorites = Favorite.get()
  let favEvents=[]
  favorites.forEach((element)=>{
    favEvents.push(Event.getById(element.EventId))
  });

  favEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );

  let data = []
  data = data.concat({"title": "Favorites Events", "data": favEvents})

  return data

}
router.get('/', (req, res) => res.status(200).json(getFavEvents()));

router.post('/', (req, res) => {
  try {
    const fav = Favorite.create(req.body);
    res.status(201).json(fav);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
