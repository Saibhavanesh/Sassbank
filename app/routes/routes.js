const express = require('express');
const {loginController, 
  registerController,
   getUserDataController, 
   getAccountDataController,
  transferController,
  getTransactionsController,
  getActiveUsersController,
  getAllUsersController } = require('../controller/controller');

const router = express.Router();

router.post('/Login', loginController);
router.post('/Register', registerController);
router.get('/getUserData', getUserDataController);
router.get('/getAccountData', getAccountDataController);
router.post('/transfer', transferController);
router.get('/getTransactions', getTransactionsController);
router.get('/getAllUsers', getAllUsersController);
router.patch('/updateUserActiveStatus',getActiveUsersController);

module.exports = router;