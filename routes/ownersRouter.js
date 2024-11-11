const express= require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');


// router.get('/', (req,res)=>{
//     console.log("hello");
//     console.log("Current NODE_ENV:", process.env.NODE_ENV);
// });

    if(process.env.NODE_ENV==="development")
        {
            router.post('/create',async (req,res)=>{
             let owners =await ownerModel.find();
             if(owners.length>0)
             {
                res.status(503)
                .send("You dont have permission to create another owner!");
             }
             
             let{fullname, email, password}= req.body;

             let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,

             })
             res.status(201).send(createdOwner);
            })      
}

router.get("/admin", (req,res)=>{
   let success = req.flash("success");
   res.render("createproducts" ,{success});
})


module.exports = router;