const express= require("express")
const router= express.Router()


const userRouter= require("./userRouter")
const customerRouter= require("./customerRouter")

router.use("/user",userRouter)
router.use("/customer",customerRouter)




module.exports=router