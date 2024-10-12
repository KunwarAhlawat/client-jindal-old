const express = require('express');

const userCtrl = require('../controller/userController');

const router = express.Router();

router.get('/login',userCtrl.getLogin);

router.post('/login',userCtrl.postLogin);

router.get('/userDashboard',userCtrl.getUserDashboard);

router.get('/logout',userCtrl.getLogout);

router.get('/registeredUsers',userCtrl.getRegisteredUsers);

router.post('/registeredUsers',userCtrl.postRegisteredUsers);

router.get('/register',userCtrl.getRegister);

router.post('/register',userCtrl.postRegister);

router.get('/products',userCtrl.getProducts);

router.get('/distribution',userCtrl.getDistribution);

router.get('/vendors',userCtrl.getVendors);

router.get('/team',userCtrl.getTeam);

router.get('/coal',userCtrl.getCoal);

router.get('/coke',userCtrl.getCoke);

router.get('/charcoal',userCtrl.getCharcoal);

router.get('/coaldust',userCtrl.getCoaldust);

router.get('/pigiron',userCtrl.getPigiron);

router.get('/ferroalloys',userCtrl.getFerroalloys);


module.exports = router;