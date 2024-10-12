const express = require('express');

const transportCtrl = require('../controller/transportController');

const router = express.Router();

router.get('/transportDetails',transportCtrl.getTransportDetails);
router.post('/transportDetails',transportCtrl.postTransportDetails);

router.get('/transportContacts',transportCtrl.getTransportContacts);
router.post('/transportContacts',transportCtrl.postTransportContacts);

router.get('/transportStations',transportCtrl.getTransportStations);
router.post('/transportStations',transportCtrl.postTransportStations);

router.get('/transportTrucks',transportCtrl.getTransportTrucks);
router.post('/transportTrucks',transportCtrl.postTransportTrucks);

module.exports = router;