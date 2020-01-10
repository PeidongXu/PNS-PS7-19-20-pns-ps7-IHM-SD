const { Router } = require('express');
const {Event } = require('../../models');

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Event.get()));

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
