const { Router } = require('express');
const { Ticket } = require('../../models');

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Ticket.get()));
router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
