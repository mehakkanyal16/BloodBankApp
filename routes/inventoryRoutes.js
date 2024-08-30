const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/authMiddleware');
const{createInventoryController}=require('../controllers/inventoryController')
router.post('/create-inventory',authMiddleware,createInventoryController)

module.exports=router;