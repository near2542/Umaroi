const express = require('express');
const router = express.Router();
const Order = require("./OrderModel");
const Food = require("../Food/FoodModel")
const cookie = require('cookie-parser')
// For fetching on customer/admin page
router.get("/",async (req,res)=>
{
  Food.find().exec((err,data,next) =>
{
    if(err) console.log('sad')
    else res.render('order.ejs',{foods:data})
})
})

router.post("/:_id",async (req,res)=>
{
  const newFood = new Food(req.body)
  newFood.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
})

router.get("/confirm/:object",async (req,res)=>{
  res.send('this was reached')
})

router.post("/pushlist",async (req,res)=>
{
  res.cookie("lists",list)
})





module.exports = router;