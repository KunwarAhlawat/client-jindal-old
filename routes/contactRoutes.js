const express = require('express');

const contactCtrl = require('../controller/contactController');

const router = express.Router();

router.get('/contacts',contactCtrl.getContacts);
router.post('/contacts',contactCtrl.postContacts);

module.exports = router;