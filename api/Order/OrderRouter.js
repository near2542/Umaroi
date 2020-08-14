const express = require('express');
const router = express.Router();
const Order = require("./OrderModel");
const Food = require("../Food/FoodModel")

// For fetching on customer/admin page
router.get("/",async (req,res)=>
{
  Food.find().exec((err,data,next) =>
{
    if(err) console.log('sad')
    else res.render('order.ejs',{foods:data})
 
})
})

router.get("/all",async (req,res)=>
{
    
})
// For using on admin page only
router.get("/:_id",async (req,res)=>
{
    Food.findById(params._id).exec((err,data) =>
    {
        if(err) return res.status(400).send(err)
        res.status(200).send(data);
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

router.put("/:_id",async (req,res)=>
{
    Food.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
      });
})

router.delete("/:_id",async (req,res)=>
{
    Food.findByIdAndDelete(req.params._id, (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("ลบข้อมูลเรียบร้อย");
      });
})

module.exports = router;