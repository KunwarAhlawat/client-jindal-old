const express = require('express');

const customerCtrl = require('../controller/customerController');
  
const router = express.Router();
  

router.get('/masterFirm',customerCtrl.getmasterFirm);
router.get('/masterFirmApi',customerCtrl.getmasterFirmApi);
router.post('/masterFirm',customerCtrl.postmasterFirm);

router.get('/customerContact',customerCtrl.getCustomerContact);
router.post('/customerContact',customerCtrl.postCustomerContact);

router.get('/customerCategory',customerCtrl.getCustomerCategory);
router.post('/customerCategory',customerCtrl.postCustomerCategory);

router.get('/customerFirm',customerCtrl.getCustomerFirm);
router.post('/customerFirm',customerCtrl.postCustomerFirm);

router.get('/customerProduct',customerCtrl.getCustomerProduct);
router.post('/customerProduct',customerCtrl.postCustomerProduct);


module.exports = router;