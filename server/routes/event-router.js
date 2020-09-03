const express = require('express')

const EventCtrl = require('../controllers/event-ctrl')

const router = express.Router()

router.post('/event', EventCtrl.createEvent)
router.delete('/event/:id', EventCtrl.deleteEvent)
router.get('/events', EventCtrl.getEvents)
router.get('/lastEvents', EventCtrl.getLast)
router.get('/number', EventCtrl.getNumber)
router.post('/search', EventCtrl.searchEvents)

module.exports = router