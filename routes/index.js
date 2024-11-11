const express= require('express');
const isLoggedin = require('../middlewares/isLoggedin');
const router= express.Router();
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
 
router.get("/", (req,res)=>{
    let error = req.flash("error");
    res.render("index", {error});

});
router.get("/shop",isLoggedin, async (req,res)=>{
    let products = await productModel.find();
    let success =  req.flash("success");
    res.render("shop", {products,success});
});

//**********adding items into the cart*******//

router.get("/addtocart/:productid",isLoggedin, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    console.log(req.user)
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Product added to cart");
    res.redirect("/shop");
});

//**********displaying cart*******//
router.get("/cart", isLoggedin , async (req,res)=>{

    let user = await userModel.findOne({email:req.user.email}).populate("cart");
    res.render("cart", {user});
})

//****************Profile page code*************//
router.get("/account", isLoggedin, async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    console.log(user);
    res.render("account", {user});
})


module.exports=router;