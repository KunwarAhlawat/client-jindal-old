const express = require('express');

const masterCtrl = require('../controller/masterController');

const router = express.Router();



router.get('/masterArea',masterCtrl.getMasterArea);
router.post('/masterArea',masterCtrl.postMasterArea);

router.get('/masterCategories',masterCtrl.getMasterCategories);
router.post('/masterCategories',masterCtrl.postMasterCategories);


// =========================================== master customer routes ==========================================================
router.get('/masterCustomer',masterCtrl.getMasterCustomer);
router.post('/masterCustomer',masterCtrl.postMasterCustomer);
// router.put('/masterCustomerUpdate',masterCtrl.updateMasterCustomer);



//  api for contact and customer data
router.post("/masterContactCust" , masterCtrl.customerContactApi)
// customer addres api
router.post("/masterAddressCust" , masterCtrl.customerAddressApi)


// download csv file 
router.get('/download-csv',masterCtrl.downloadCSV);

 
 
// upload csv file 
// router.post('/upload-csv',masterCtrl.importCsv);


// =========================================== End master customer routes ==========================================================

router.get('/masterEmployee',masterCtrl.getMasterEmployee);
router.post('/masterEmployee',masterCtrl.postMasterEmployee);
    
router.get('/masterGrade',masterCtrl.getMasterGrade);
router.post('/masterGrade',masterCtrl.postMasterGrade);

router.get('/masterProducts',masterCtrl.getMasterProducts);
router.post('/masterProducts',masterCtrl.postMasterProducts);

router.get('/masterProductGroup',masterCtrl.getMasterProductGroup);
router.post('/masterProductGroup',masterCtrl.postMasterProductGroup);

router.get('/masterTeams',masterCtrl.getMasterTeams);
router.post('/masterTeams',masterCtrl.postMasterTeams);

router.get('/masterVendors',masterCtrl.getMasterVendors);
router.post('/masterVendors',masterCtrl.postMasterVendors);


module.exports = router;