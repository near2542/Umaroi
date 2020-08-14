const express = require('express');
const router = express.Router();
const Food = require("./FoodModel");


// For fetching on customer/admin page
router.get("/",async (req,res)=>
{
  Food.find().exec((err,data) =>
{
    if(err) return res.status(400).send(err)
    
    else {
      res.render('menu.ejs',{foods : data})}
 
})
})

router.get("/menu/:_id",async (req,res)=>
{
    Food.findById(params._id).exec((err,data) =>
    {
        if(err) return res.status(400).send(err)
        res.status(200).send(data);
    })
})







module.exports = router;