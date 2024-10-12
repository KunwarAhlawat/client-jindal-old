const express = require('express');

const vendorCtrl = require('../controller/vendorController');

const router = express.Router();

router.get('/vendorContacts',vendorCtrl.getVendorContacts);
router.post('/vendorContacts',vendorCtrl.postVendorContacts);

router.get('/vendorFirm',vendorCtrl.getVendorFirm);
router.post('/vendorFirm',vendorCtrl.postVendorFirm);

router.get('/vendorProduct',vendorCtrl.getVendorProduct);
router.post('/vendorProduct',vendorCtrl.postVendorProduct);

module.exports = router;