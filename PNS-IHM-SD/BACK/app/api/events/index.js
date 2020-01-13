const { Router } = require('express');
const {Event, Site } = require('../../models');

const router = new Router();

function addCoordinate(){
  let events = Event.get();

  events.forEach((element) =>{
    const tmpsite = Site.getById(element.siteID);
    element['latitude'] = tmpsite.latitude;
    element['longitude'] = tmpsite.longitude;
  });

  return events;
}
//router.get('/', (req, res) => res.status(200).json(Event.get()));

router.get('/', (req, res) => {
  try {
    res.status(200).json(addCoordinate());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const event = Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
