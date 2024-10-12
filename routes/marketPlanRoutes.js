const express = require('express');

const marketPlanController = require('../controller/marketPlanController');

const router = express.Router();

router.get('',)

// router.get('/marketPlanPigIron',marketPlanController.getMarketPlanPigIron);
router.post('/marketPlanPigIron',marketPlanController.postMarketPlanPigIron);

router.get('/marketPlanPigIron',marketPlanController.getMasterCustomerApi);
router.post('/marketPlanPigIronApi',marketPlanController.postMarketPlanPigIron);
         

router.get('/marketPlanQuantityLedger',marketPlanController.getMarketPlanQuantityLedger);
router.post('/marketPlanQuantityLedger',marketPlanController.postMarketPlanQuantityLedger);
router.get('/marketPlanAllotment',marketPlanController.getMarketPlanAllotment);
router.post('/marketPlanAllotment',marketPlanController.postMarketPlanAllotment);
 

// get all data from selected data 
router.post('/allotmentlist',marketPlanController.getAllCustomerApi);
// router.post('/allotmentlist',marketPlanController.getAllCustomerApi);
router.get('/marketPlanAllotment/:id',marketPlanController.getAllotmentUser);       // for allotment page view with id


// user view page allotment page
router.get('/marketplanUser',marketPlanController.getAllCustomerUser);

// create allotment 
router.post('/createAllotment',marketPlanController.postAllotment);


// create report
router.post('/createreport',marketPlanController.createReport);

// get report
router.get('/getreport/:id',marketPlanController.getReportDetails); 
// update meeting status 
router.put('/updateReport',marketPlanController.updateReport); 

// ////////////////////////////////////// user employee 

// get report
router.get('/marketPlanAllotmentUser',marketPlanController.getAllotmentemployee); 

module.exports = router;