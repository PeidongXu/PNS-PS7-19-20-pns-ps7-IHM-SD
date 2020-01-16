const { Router } = require('express');
const TicketRouter = require('./tickets');
const SiteRouter = require('./sites');
const EventRouter = require('./events');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.get('/status', (req, res) => res.status(404).json('wtf'));
router.get('/', (req, res) => res.status(404).json('wtffffff'));
router.use('/tickets', TicketRouter);
router.use('/sites', SiteRouter);
router.use('/events', EventRouter);


module.exports = router;
