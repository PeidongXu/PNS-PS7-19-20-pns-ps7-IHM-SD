const { Router } = require('express');
const TicketRouter = require('./tickets');
const SiteRouter = require('./sites');
const EventRouter = require('./events');
const FavoriteRouter = require('./favorites')

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.get('/status', (req, res) => res.status(404).json('404 - status'));
router.get('/', (req, res) => res.status(404).json('404 - root'));
router.use('/tickets', TicketRouter);
router.use('/sites', SiteRouter);
router.use('/events', EventRouter);
router.use('/favorites', FavoriteRouter);


module.exports = router;
