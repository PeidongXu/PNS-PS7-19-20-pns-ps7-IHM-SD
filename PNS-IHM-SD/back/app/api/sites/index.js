const { Router } = require('express');
const { Site } = require('../../models');

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Site.get()));

router.post('/', (req, res) => {
  try {
    const site = Site.create(req.body);
    res.status(201).json(site);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
