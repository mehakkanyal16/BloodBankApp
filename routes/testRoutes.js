const express=require('express')
const { testControllers } = require('../controllers/testController')
// router object
const router=express.Router()
router.get('/',testControllers)
// export
module.exports=router;
